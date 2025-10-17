import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true;

function Cart() {
    const navigate = useNavigate();
    const { showMessageError, showMessageConfirmDelete, showMessageSuccess, showMessageAdjust } = useMessage();

    const [cartItems, setCartItems] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(300); // fixed delivery fee
    const [grandTotal, setGrandTotal] = useState(0);

    // ✅ โหลดข้อมูลตะกร้า
    const fetchCart = async () => {
        try {
            const res = await axios.get("http://localhost:8080/cart/list");
            if (res.data?.cartItems) {
                const sortedItems = [...res.data.cartItems].sort(
                    (a, b) => b.cartItemId - a.cartItemId
                );
                setCartItems(sortedItems);
                calculateTotal(sortedItems);
            } else {
                setCartItems([]);
                setSubtotal(0);
                setGrandTotal(0);
            }
        } catch (err) {
            showMessageError(err);
        }
    };

    // ✅ คำนวณราคารวม
    const calculateTotal = (items) => {
        const sub = items.reduce((acc, item) => acc + item.productPrice * item.qty, 0);
        setSubtotal(sub);
        setGrandTotal(sub + deliveryFee);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // ✅ เพิ่มจำนวนสินค้า
    const handleIncrease = async (item) => {
        try {
            // 🔹 1. ดึง stock ล่าสุดจาก backend
            const productRes = await axios.get(`http://localhost:8080/product/list?productId=${item.productId}`);
            const product = productRes.data?.products?.find((p) => p.productId === item.productId);
            const stock = product?.productStock ?? 0;

            if (item.qty >= stock) {
                showMessageAdjust(
                    `"${item.productName}" has only ${stock} in stock.`,
                    "info"
                );
                return; // ❌ หยุดการเพิ่มถ้าเกิน stock
            }

            // 🔹 2. อัปเดตจำนวน
            const newQty = item.qty + 1;
            const updatedLineTotal = item.productPrice * newQty;

            await axios.post("http://localhost:8080/cart/updateItems", {
                cartItemId: item.cartItemId,
                productId: item.productId,
                qty: newQty,
                lineTotal: updatedLineTotal
            });

            await fetchCart();
        } catch (err) {
            showMessageError(err);
        }
    };

    // ✅ ลดจำนวนสินค้า
    const handleDecrease = async (item) => {
        if (item.qty > 1) {
            const newQty = item.qty - 1;
            const updatedLineTotal = item.productPrice * newQty;

            try {
                await axios.post("http://localhost:8080/cart/updateItems", {
                    cartItemId: item.cartItemId,
                    productId: item.productId,
                    qty: newQty,
                    lineTotal: updatedLineTotal
                });
                await fetchCart();
            } catch (err) {
                showMessageError(err);
            }
        }
    };

    // ✅ ลบสินค้า (เมื่อ qty เหลือ 1 แล้วกดถังขยะ)
    const handleDelete = async (cartItemId, productName) => {
        const result = await showMessageConfirmDelete(productName);
        if (!result.isConfirmed) return;

        try {
            await axios.post("http://localhost:8080/cart/deleteItems", { cartItemId });
            setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
            calculateTotal(cartItems.filter((i) => i.cartItemId !== cartItemId));
            showMessageSuccess("Item removed successfully");
        } catch (err) {
            showMessageError(err);
        }
    };

    // ✅ ปุ่ม checkout → ไปหน้าอัปเดตที่อยู่
    const handleCheckout = () => {
        const orderInput = {
            status: 0,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            grandTotal: grandTotal
        };

        const cartItemInputs = cartItems.map((item) => ({
            cartItemId: item.cartItemId,
            productId: item.productId,
            productName: item.productName,
            productDetail: item.productDetail,
            productPrice: item.productPrice,
            qty: item.qty,
            lineTotal: item.productPrice * item.qty
        }));

        const orderData = { orderInput, cartItemInputs };

        console.log("🧾 Order Data:", orderData);

        sessionStorage.setItem("orderData", JSON.stringify(orderData));
        navigate("/updateAddress");
    };

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                <div className="cart-container container py-4">
                    <h4 className="cart-title mb-4">Order</h4>

                    {cartItems.length === 0 ? (
                        <p className="text-center text-muted">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.cartItemId} className="cart-item-row">
                                <div className="cart-item-left">
                                    <img
                                        src={
                                            item.productImgPath
                                                ? `http://localhost:8080${item.productImgPath}`
                                                : "/Images/pizza-default.png"
                                        }
                                        alt={item.productName}
                                        className="cart-item-img"
                                    />
                                    <div>
                                        <h6 className="cart-item-name">{item.productName}</h6>
                                        <p className="cart-item-detail text-muted">
                                            {item.productDetail}
                                        </p>
                                    </div>
                                </div>

                                <div className="cart-item-right">
                                    <div className="cart-item-price">
                                        ${item.productPrice * item.qty}
                                    </div>
                                    <div className="cart-item-actions">
                                        {item.qty === 1 ? (
                                            <i
                                                className="bi bi-trash text-danger mx-2 cart-icon"
                                                onClick={() => handleDelete(item.cartItemId, item.productName)}
                                            ></i>
                                        ) : (
                                            <i
                                                className="bi bi-dash-circle mx-2 cart-icon"
                                                onClick={() => handleDecrease(item)}
                                            ></i>
                                        )}
                                        <span>{item.qty}</span>
                                        <i
                                            className={`bi bi-plus-circle mx-2 cart-icon ${item.qty >= item.productStock ? "text-muted" : ""
                                                }`}
                                            onClick={() => handleIncrease(item)}
                                            style={{ cursor: item.qty >= item.productStock ? "not-allowed" : "pointer" }}
                                        ></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}

                    {/* สรุปราคา */}
                    {cartItems.length > 0 && (
                        <div className="cart-summary mt-4 text-end">
                            <p className="cart-total mb-1">
                                Subtotal <b>${subtotal.toLocaleString()}</b>
                            </p>
                            <p className="cart-delivery text-danger">
                                (+deliver fee {deliveryFee})
                            </p>
                            <h5 className="mt-2 fw-bold">
                                Grand Total: ${grandTotal.toLocaleString()}
                            </h5>
                            <button className="btn cart-checkout-btn mt-3" onClick={handleCheckout}>
                                Check out
                            </button>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Cart;