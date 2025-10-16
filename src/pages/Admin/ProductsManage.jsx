import { useState, useEffect } from "react";
import Adminheader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import Modal from "../../components/Modal";
import useMessage from "../../components/useMessage";
import axios from "axios";

axios.defaults.withCredentials = true; // ✅ ส่ง cookie ทุก request
axios.defaults.headers.common["Accept"] = "application/json";

function ProductsManage() {
    const {
        showMessageError,
        showMessageSuccess,
        showMessageNotSuccess,
        showMessageConfirmDelete,
        showMessageConfirmProcess,
    } = useMessage();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [recommended, setRecommended] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [username, setUsername] = useState(""); // ✅ เก็บชื่อผู้ใช้จาก profile/me

    const [form, setForm] = useState({
        productId: "",
        productName: "",
        productPrice: "",
        productDetail: "",
        productStock: "",
        categoryId: "",
        categoryName: "",
        imageFile: null,
        preview: null,
    });

    // ✅ ดึง username จาก /profile/me
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile/me", {
                    withCredentials: true,
                });
                if (res.data?.username) {
                    setUsername(res.data.username);
                    console.log("✅ Username from cookie:", res.data.username);
                }
            } catch (e) {
                console.error("❌ Failed to fetch profile:", e);
            }
        };
        fetchProfile();
    }, []);

    // ✅ ดึงข้อมูลสินค้า (เรียกแยกจาก profile)
    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ ฟังก์ชันดึง product ทั้งหมด
    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/product/list", {
                withCredentials: true,
            });
            setProducts(res.data.products || []);
            setRecommended(res.data.recommendProductId || []);
            setCategories(res.data.categoriesDropdown || []);
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ toggle recommend
    const handleRecommend = async (recommendedID, productId, checked) => {
        try {
            if (checked && recommended.length >= 3) {
                showMessageNotSuccess({
                    message: "You can recommend up to 3 products only",
                });
                return;
            }

            if (checked) {
                await axios.post("http://localhost:8080/recommend/create", { productId }, { withCredentials: true });
            } else {
                const target = recommended.find((r) => r.productId === productId);
                if (!target) {
                    showMessageError("Recommended ID not found for this product");
                    return;
                }
                await axios.post(
                    "http://localhost:8080/recommend/delete",
                    { recommendedId: target.recommendedId },
                    { withCredentials: true }
                );
            }

            await fetchProducts();
            showMessageSuccess("Recommendation updated successfully");
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ Preview รูป
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

    // ✅ Edit product
    const handleEdit = (item) => {
        setIsEditMode(true);
        setForm({
            productId: item.productId,
            productName: item.productName,
            productPrice: item.productPrice,
            productDetail: item.productDetail,
            productStock: item.productStock,
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            preview: item.productImgPath
                ? `http://localhost:8080${item.productImgPath}`
                : null,
            imageFile: null,
        });
    };

    // ✅ Toggle visibility (isActive)
    const handleToggleVisibility = async (product) => {
        try {
            const updatedActive = product.isActive === 1 ? 0 : 1;

            // อัปเดตหน้า UI ทันที
            setProducts((prev) =>
                prev.map((p) =>
                    p.productId === product.productId
                        ? { ...p, isActive: updatedActive }
                        : p
                )
            );

            const productData = {
                productId: product.productId,
                productName: product.productName,
                productPrice: product.productPrice,
                productDetail: product.productDetail,
                productStock: product.productStock,
                categoryId: product.categoryId,
                isActive: updatedActive,
                updatedBy: username || "system",
            };

            const formData = new FormData();
            formData.append(
                "product",
                new Blob([JSON.stringify(productData)], { type: "application/json" })
            );

            await axios.post("http://localhost:8080/product/update", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });


            showMessageSuccess(
                `Product "${product.productName}" visibility updated successfully`
            );
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ Delete product
    const handleDelete = async (productId, productName) => {
        const result = await showMessageConfirmDelete(productName);
        if (!result.isConfirmed) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/product/delete",
                { productId },
                { withCredentials: true }
            );

            if (res.data?.message?.includes("delete success")) {
                showMessageSuccess(`Deleted product "${productName}" successfully`);
                await fetchProducts();
            } else {
                showMessageError("Delete failed, please try again.");
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ Save (create/update)
    const handleSave = async () => {
        const confirm = await showMessageConfirmProcess(
            "Are you sure to save this product?"
        );
        if (!confirm.isConfirmed) return;

        try {
            const productData = {
                productId: form.productId || null,
                productName: form.productName,
                productPrice: form.productPrice,
                productDetail: form.productDetail,
                productStock: form.productStock,
                categoryId: form.categoryId,
                createdBy: username || "system",
                updatedBy: username || "system",
            };

            const formData = new FormData();
            formData.append(
                "product",
                new Blob([JSON.stringify(productData)], {
                    type: "application/json",
                })
            );

            if (form.imageFile) {
                formData.append("image", form.imageFile);
            }

            const url = isEditMode
                ? "http://localhost:8080/product/update"
                : "http://localhost:8080/product/create";

            const res = await axios.post(url, formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            });


            if (res.data?.message?.includes("success")) {
                showMessageSuccess(
                    isEditMode
                        ? "Product updated successfully"
                        : "Product created successfully"
                );
                await fetchProducts();
                document.getElementById("modalProduct_btnClose").click();
            } else {
                showMessageError("Save failed, please try again.");
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ Filter Search
    const filteredProducts = products.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                        data-bs-target="#modalProduct"
                        onClick={() => {
                            setIsEditMode(false);
                            setForm({
                                productId: "",
                                productName: "",
                                productPrice: "",
                                productDetail: "",
                                productStock: "",
                                categoryId: "",
                                categoryName: "",
                                imageFile: null,
                                preview: null,
                            });
                        }}
                    >
                        Add Item <i className="bi bi-plus-lg"></i>
                    </button>
                    <p className="text-muted mb-0">
                        Recommended: <span className="text-danger">{recommended.length}/3</span>
                    </p>
                </div>


                {/* Table */}
                <div className="product-table">
                    <table className="table table-borderless align-middle product-management-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Visibility</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((p) => (
                                <tr key={p.productId}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={recommended.some(
                                                (r) => r.productId === p.productId
                                            )}
                                            onChange={(e) =>
                                                handleRecommend(p.productId, p.productId, e.target.checked)
                                            }
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={`http://localhost:8080${p.productImgPath}`}
                                            alt={p.productName}
                                            className="product-thumb"
                                        />
                                    </td>
                                    <td>{p.productId}</td>
                                    <td>{p.productName}</td>
                                    <td className="text-capitalize">{p.categoryName}</td>
                                    <td>{p.productPrice}</td>
                                    <td>{p.productStock}</td>
                                    <td>
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={p.isActive === 1}
                                                onChange={() => handleToggleVisibility(p)}
                                            />
                                            <span className="slider"></span>
                                        </label>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modalProduct"
                                            onClick={() => handleEdit(p)}
                                        >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDelete(p.productId, p.productName)}
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
                    id="modalProduct"
                    icon="bi bi-pencil-fill"
                    title={isEditMode ? "Edit Product" : "Add Product"}
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
                                value={form.productName}
                                onChange={(e) => setForm({ ...form, productName: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Category</label>
                            <select
                                className="form-control"
                                value={form.categoryId}
                                onChange={(e) => {
                                    const id = e.target.value;
                                    const name =
                                        categories.find((c) => c.categoryId === Number(id))
                                            ?.categoryName || "";
                                    setForm({ ...form, categoryId: id, categoryName: name });
                                }}
                            >
                                <option value="">Select category</option>
                                {categories.map((c) => (
                                    <option key={c.categoryId} value={c.categoryId}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Price</label>
                            <input
                                className="form-control"
                                type="number"
                                value={form.productPrice}
                                onChange={(e) => setForm({ ...form, productPrice: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Stock</label>
                            <input
                                className="form-control"
                                type="number"
                                value={form.productStock}
                                onChange={(e) => setForm({ ...form, productStock: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Detail</label>
                            <textarea
                                className="form-control"
                                rows={3}
                                value={form.productDetail}
                                onChange={(e) =>
                                    setForm({ ...form, productDetail: e.target.value })
                                }
                            ></textarea>
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

export default ProductsManage;
