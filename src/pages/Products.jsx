import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";

function Products() {
    const { showMessagePermission, showMessageError, showMessageAdjust, showMessageSuccess } = useMessage();
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    const fetchData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/product/list?productId=${id}`,
                { withCredentials: true }
            );
            if (res.data && res.data.products.length > 0) {
                const found = res.data.products.find(
                    (p) => String(p.productId) === String(id)
                );
                if (found) setProduct(found);
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission();
            } else {
                showMessageError(e);
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    if (!product) {
        return (
            <>
                <Header />
                <div className="container py-5 text-center">Loading...</div>
                <Footer />
            </>
        );
    }

    const isOutOfStock = product.productStock === 0;
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    const handleAddToCart = async (e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const lineTotal = product.productPrice * Number(quantity);

        const payload = {
            productId: product.productId,
            qty: Number(quantity),
            lineTotal: lineTotal,
        };

        try {
            // 🧩 ตรวจว่ามีสินค้าในตะกร้าแล้วหรือยัง
            const cartRes = await axios.get("http://localhost:8080/cart/list");
            const existingItem = cartRes.data?.cartItems?.find(
                (i) => i.productId === product.productId
            );
            if (existingItem) {
                showMessageAdjust("This item is already in your cart.", "info");
                return;
            }

            // ✅ ถ้ายังไม่มี → เพิ่มสินค้าใหม่
            const res = await axios.post("http://localhost:8080/cart/addItems", payload);

            if (res.status === 200 || res.status === 201) {
                showMessageSuccess(
                    `"${product.productName}" added to your cart successfully!`
                );

                // ✅ แจ้ง Header ให้นับจำนวนตะกร้าใหม่
                window.dispatchEvent(new Event("cartUpdated"));
            } else {
                showMessageError("Failed to add to cart.");
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission("Please log in to add items.");
                navigate("/login");
            } else {
                showMessageError(e);
            }
        }
    };

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                <div className="container py-5">
                    <button
                        className="btn btn-danger d-flex align-items-center mb-3"
                        style={{ backgroundColor: "#e53935" }}
                        onClick={() => navigate(-1)}
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back
                    </button>

                    <div className="row align-items-center">
                        {/* Image */}
                        <div className="col-md-6 text-center">
                            <img
                                src={`http://localhost:8080${product.productImgPath}`}
                                alt={product.productName}
                                className="img-fluid"
                                style={{ maxWidth: "400px" }}
                            />
                        </div>

                        {/* Info */}
                        <div className="col-md-6">
                            <h3>{product.productName}</h3>
                            <h5 className="text-danger fw-bold mb-3">
                                ${product.productPrice}
                            </h5>
                            <p className="text-muted">{product.productDetail}</p>

                            {/* Quantity */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold">Quantity</label>

                                {isOutOfStock ? (
                                    <p className="text-danger fw-bold">Out of Stock</p>
                                ) : (
                                    <select
                                        className="form-select"
                                        value={quantity}
                                        onChange={(e) => setQuantity(e.target.value)}
                                    >
                                        {[...Array(product.productStock).keys()].map((q) => (
                                            <option key={q + 1} value={q + 1}>
                                                {q + 1}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Add to cart */}
                            {!isOutOfStock && (
                                <button
                                    className="btn btn-danger w-100"
                                    style={{ backgroundColor: "#e53935" }}
                                    onClick={handleAddToCart}
                                >
                                    <i className="bi bi-cart-plus me-2"></i> Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Products;
