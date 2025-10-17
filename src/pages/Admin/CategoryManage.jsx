import { useState, useEffect } from "react";
import Adminheader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import useMessage from "../../components/useMessage";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";

function CategoryManagement() {
    const {
        showMessageError,
        showMessageSuccess,
        showMessageConfirmDelete,
        showMessageConfirmProcess,
    } = useMessage();

    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isEditMode, setIsEditMode] = useState(false);

    const [form, setForm] = useState({
        categoryId: "",
        categoryName: "",
        categoryPriority: "",
        categoryProductPath: "",
        imageFile: null,
        preview: null,
    });

    // ✅ โหลดข้อมูลหมวดหมู่
    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:8080/category/list", {
                withCredentials: true,
            });
            setCategories(res.data.categories || []);
        } catch (e) {
            showMessageError(e);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // ✅ ค้นหา category
    const filteredCategories = categories.filter((c) =>
        c.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ✅ เลือกรูป
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({
                ...prev,
                imageFile: file,
                preview: URL.createObjectURL(file),
            }));
        }
    };

    // ✅ กด Edit
    const handleEdit = (cat) => {
        setIsEditMode(true);
        setForm({
            categoryId: cat.categoryId,
            categoryName: cat.categoryName,
            categoryPriority: cat.categoryPriority,
            categoryProductPath: cat.categoryProductPath,
            imageFile: null,
            preview: `http://localhost:8080${cat.categoryImgPath}`,
        });
    };

    // ✅ กด Delete
    const handleDelete = async (categoryId, categoryName) => {
        const result = await showMessageConfirmDelete(categoryName);
        if (!result.isConfirmed) return;
        try {
            const res = await axios.post(
                "http://localhost:8080/category/delete",
                { categoryId },
                { withCredentials: true }
            );
            if (res.data?.message?.includes("success")) {
                showMessageSuccess(`Deleted category "${categoryName}" successfully`);
                fetchCategories();
            } else {
                showMessageError("Delete failed, please try again.");
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ กด Save (create/update)
    const handleSave = async () => {
        const confirm = await showMessageConfirmProcess(
            "Are you sure to save this category?"
        );
        if (!confirm.isConfirmed) return;

        try {
            const categoryData = {
                categoryId: form.categoryId || null,
                categoryName: form.categoryName,
                categoryPriority: Number(form.categoryPriority),
                categoryProductPath: form.categoryProductPath,
            };

            const formData = new FormData();
            formData.append(
                "category",
                new Blob([JSON.stringify(categoryData)], { type: "application/json" })
            );
            if (form.imageFile) {
                formData.append("image", form.imageFile);
            }

            const url = isEditMode
                ? "http://localhost:8080/category/update"
                : "http://localhost:8080/category/create";

            const res = await axios.post(url, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.data?.message?.includes("success")) {
                showMessageSuccess(
                    isEditMode ? "Category updated successfully" : "Category created successfully"
                );
                document.getElementById("modalCategory_btnClose").click();
                fetchCategories();
            } else {
                showMessageError("Save failed, please try again.");
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    return (
        <div className="app-layout">
            <Adminheader />
            <main className="main-content">
                {/* Header */}
                <div className="product-header d-flex align-items-center gap-3 mb-4 pt-4 ps-4">
                    <input
                        className="product-search-box"
                        type="text"
                        placeholder="Search by name"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        className="product-btn-add"
                        data-bs-toggle="modal"
                        data-bs-target="#modalCategory"
                        onClick={() => {
                            setIsEditMode(false);
                            setForm({
                                categoryId: "",
                                categoryName: "",
                                categoryPriority: "",
                                categoryProductPath: "",
                                imageFile: null,
                                preview: null,
                            });
                        }}
                    >
                        Add Category <i className="bi bi-plus-lg"></i>
                    </button>
                </div>

                {/* Table */}
                <div className="product-table">
                    <table className="table table-borderless align-middle product-management-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Category ID</th>
                                <th>Name</th>
                                <th>Priority</th>
                                <th>Product Path</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCategories.map((c) => (
                                <tr key={c.categoryId}>
                                    <td>
                                        <img
                                            src={`http://localhost:8080${c.categoryImgPath}`}
                                            alt={c.categoryName}
                                            className="product-thumb"
                                        />
                                    </td>
                                    <td>{c.categoryId}</td>
                                    <td className="text-capitalize">{c.categoryName}</td>
                                    <td>{c.categoryPriority}</td>
                                    <td>{c.categoryProductPath}</td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalCategory"
                                            onClick={() => handleEdit(c)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(c.categoryId, c.categoryName)}
                                        >
                                            <i className="bi bi-trash-fill"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal */}
                <Modal
                    id="modalCategory"
                    icon="bi bi-tags-fill"
                    title={isEditMode ? "Edit Category" : "Add Category"}
                >
                    <div className="product-modal">
                        <div
                            className="upload-box"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            {form.preview ? (
                                <>
                                    <img src={form.preview} alt="Preview" className="preview-img" />
                                    <span className="upload-edit-icon">
                                        <i className="bi bi-pencil-fill"></i>
                                    </span>
                                </>
                            ) : (
                                <i className="bi bi-plus-lg upload-icon"></i>
                            )}
                            <input
                                id="fileInput"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                hidden
                            />
                        </div>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                className="form-control"
                                type="text"
                                value={form.categoryName}
                                onChange={(e) => setForm({ ...form, categoryName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Priority</label>
                            <input
                                className="form-control"
                                type="number"
                                value={form.categoryPriority}
                                onChange={(e) => setForm({ ...form, categoryPriority: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Product Path</label>
                            <input
                                className="form-control"
                                type="text"
                                value={form.categoryProductPath}
                                onChange={(e) =>
                                    setForm({ ...form, categoryProductPath: e.target.value })
                                }
                            />
                        </div>

                        <div className="text-end mt-3">
                            <button className="btn btn-save" onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    </div>
                </Modal>
            </main>
            <Footer />
        </div>
    );
}

export default CategoryManagement;
