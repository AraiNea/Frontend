import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true; // ✅ ส่ง cookie ทุก request
axios.defaults.headers.common["Accept"] = "application/json";

function TrackOrder() {
    const navigate = useNavigate();
    const { showMessageError, showMessageAdjust, showMessageConfirmReorder } = useMessage();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("http://localhost:8080/order/");
                if (res.data?.results) {
                    // ดึงเฉพาะ array results แล้วเรียง orderId มาก → น้อย
                    const sorted = [...res.data.results].sort(
                        (a, b) => b.order.orderId - a.order.orderId
                    );
                    setOrders(sorted);
                }
            } catch (e) {
                showMessageError(e);
            }
        };
        fetchOrders();
    }, []);

    const handleOrderClick = (orderId) => {
        navigate(`/orderDetail/${orderId}`);
    };

    const renderStatusText = (status) => {
        return status === 1 ? "fulfilled" : "pending";
    };

    const handleReorder = async (order, orderItems) => {
        try {
            const result = await showMessageConfirmReorder(
                'all items in your cart before reordering this order will be removed. Do you want to proceed?'
            );

            if (!result.isConfirmed) return;

            const payload = orderItems.map((item) => ({
                orderItemId: item.orderItemId,
                productIdSnapshot: item.productIdSnapshot,
                productName: item.productName,
                productDetail: item.productDetail,
                productPrice: item.productPrice,
                qty: item.qty,
                lineTotal: item.lineTotal,
            }));

            await axios.post("http://localhost:8080/order/reorder", { orderItems: payload });

            showMessageAdjust("Reorder success", "success");

            navigate("/cart");
        } catch (e) {
            showMessageError(e);
        }
    };

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content trackorder-container">
                <h2 className="trackorder-title">Track Order</h2>

                {orders.length === 0 ? (
                    <p className="trackorder-empty">No orders found.</p>
                ) : (
                    orders.map(({ order, orderItems }) => (
                        <div key={order.orderId} className="trackorder-item">
                            <div className="trackorder-left">
                                <p className="trackorder-orderid">
                                    Order #{order.orderId}
                                </p>
                                <p className="trackorder-date">
                                    {order.createdAt}
                                </p>
                            </div>

                            <div className="trackorder-middle">
                                <ul>
                                    {orderItems.map((item) => (
                                        <li key={item.orderItemId}>
                                            {item.productName}{" "}
                                            <span>x{item.qty}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="trackorder-right">
                                <div className="trackorder-status">
                                    <span
                                        className={`trackorder-status ${
                                            order.status === 1 ? "fulfilled" : "pending"
                                        }`}
                                    >
                                        {renderStatusText(order.status)}
                                    </span>

                                    <span
                                        className="trackorder-arrow"
                                        onClick={() => handleOrderClick(order.orderId)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <i className="bi bi-arrow-right-circle"></i>
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    className="trackorder-reorder"
                                    onClick={() => handleReorder(order, orderItems)}
                                >
                                    Reorder
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </main>
            <Footer />
        </div>
    );
}

export default TrackOrder;