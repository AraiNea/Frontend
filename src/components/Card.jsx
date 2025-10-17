import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true; // ✅ ส่ง cookie ทุก request

/** การ์ดสินค้า */
const ProductCard = ({ picture, title, subtitle, price, stock, onAdd, onClick }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const Img =
        typeof picture === "string" ? (
            <img
                src={`http://localhost:8080${picture}`}
                alt={title}
                className="img-fluid"
                style={{
                    maxWidth: 200,
                    height: 200,
                    objectFit: "contain",
                }}
            />
        ) : (
            picture
        );

    const handleAddToCart = (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        if (stock === 0) return; // ✅ ป้องกันกดเพิ่มสินค้าหมดสต็อก
        onAdd();
    };

    return (
        <div className="col-12 col-sm-6 col-md-3 mb-4">
            <div
                className="card h-100 border-0 shadow-sm position-relative"
                style={{
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,.06), 0 8px 24px rgba(0,0,0,.08)",
                    cursor: "pointer",
                }}
                onClick={onClick}
            >
                <div className="card-body d-flex flex-column text-center">
                    <div className="w-100 d-flex justify-content-center mb-2">{Img}</div>

                    <h5 className="mb-1 fw-semibold">{title}</h5>
                    {subtitle && <p className="text-muted small mb-4">{subtitle}</p>}

                    {stock === 0 ? (
                        <p className="text-danger fw-semibold mb-3">Out of Stock</p>
                    ) : (
                        <p className="text-muted small mb-3">In Stock: {stock}</p>
                    )}

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">${price}</div>
                        <button
                            type="button"
                            className={`btn ${stock === 0 ? "btn-secondary disabled" : "btn-danger"
                                } d-flex align-items-center justify-content-center`}
                            style={{ width: 44, height: 36, borderRadius: 10 }}
                            onClick={handleAddToCart}
                            title={stock === 0 ? "Out of stock" : "Add to cart"}
                            disabled={stock === 0} // ✅ disable ปุ่ม
                        >
                            <i className="bi bi-cart" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

/** กริดแสดงหมวดหมู่ + สินค้า 4 ใบ/แถว */
const CatalogGrid = ({ data, onProductClick }) => {
    const { showMessageError, showMessageSuccess, showMessageAdjust } = useMessage();

    const groups = [...(data?.results ?? [])].sort(
        (a, b) => a.category.categoryId - b.category.categoryId
    );

    /** ✅ เพิ่มสินค้าลงตะกร้า */
    const handleAddToCart = async (product) => {
        try {
            // 🧩 1. ถ้าหมดสต็อก → ห้ามเพิ่ม
            if (product.productStock === 0) {
                showMessageAdjust(`"${product.productName}" is out of stock.`, "error");
                return;
            }

            // 🧩 2. โหลดข้อมูล cart ปัจจุบัน
            const cartRes = await axios.get("http://localhost:8080/cart/list", {
                withCredentials: true,
            });

            const existingItem = cartRes.data?.cartItems?.find(
                (i) => i.productId === product.productId
            );

            if (existingItem) {
                showMessageAdjust("This item is already in your cart.", "info");
                return;
            }

            // 🧩 3. เพิ่มสินค้าใหม่ (qty = 1)
            await axios.post(
                "http://localhost:8080/cart/addItems",
                {
                    productId: product.productId,
                    qty: 1,
                    lineTotal: product.productPrice,
                },
                { withCredentials: true }
            );

            showMessageSuccess(`"${product.productName}" added to your cart successfully!`);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            showMessageError(err);
        }
    };

    return (
        <div className="container px-0">
            {groups.map((group) => (
                <section key={group.category.categoryId} className="mb-5">
                    <h4 className="fw-bold text-uppercase mb-3">
                        {group.category.categoryName}
                    </h4>

                    <div className="row">
                        {group.products?.map((p) => (
                            <ProductCard
                                key={p.productId}
                                picture={p.productImgPath || "/images/placeholder.png"}
                                title={p.productName}
                                subtitle={p.productDetail}
                                price={p.productPrice}
                                stock={p.productStock} // ✅ ส่ง stock ลงไปด้วย
                                onAdd={() => handleAddToCart(p)}
                                onClick={() => onProductClick(p.productId)}
                            />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default CatalogGrid;