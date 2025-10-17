import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";

function OrderDetail() {
    const { orderId } = useParams();
    const { showMessageError } = useMessage();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axios.get("http://localhost:8080/order/list", {
                    params: { orderId: orderId },
                });
                if (res.data?.results?.length > 0) {
                    const data = res.data.results[0];
                    setOrder(data.order);
                    setItems(data.orderItems);
                }
            } catch (e) {
                showMessageError(e);
            }
        };
        fetchOrder();
    }, [orderId]);

    const getStatusText = (status) => {
        switch (status) {
            case 1:
                return "fulfilled";
            case 0:
            default:
                return "pending";
        }
    };

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content orderdetail-container">
                {order ? (
                    <>
                        {/* หัวข้อ */}
                        <h2 className="orderdetail-title">Order #{order.orderId}</h2>

                        {/* รถบรรทุก + Progress */}
                        <div className="orderdetail-progress">
                            <div className="orderdetail-truck">
                                <i
                                    className={`bi bi-truck truck-icon ${getStatusText(order.status) === "fulfilled" ? "move" : "idle"
                                        }`}
                                ></i>
                            </div>

                            <div className="orderdetail-line">
                                <div
                                    className={`orderdetail-line-fill ${getStatusText(order.status)}`}
                                ></div>
                            </div>

                            <div className="orderdetail-status-labels">
                                <span className="orderdetail-label pending">
                                    <span className="dot dot-pending"></span> pending
                                </span>
                                <span className="orderdetail-label fulfilled">
                                    <span className="dot dot-fulfilled"></span> fulfilled
                                </span>
                            </div>
                        </div>

                        {/* ส่วนเนื้อหา */}
                        <div className="orderdetail-content">
                            {/* Order Items */}
                            <div className="orderdetail-items">
                                <h3 className="orderdetail-subtitle">Order Items</h3>
                                <table className="orderdetail-table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.orderItemId}>
                                                <td>{item.productName}</td>
                                                <td>฿{item.productPrice}</td>
                                                <td>{item.qty}</td>
                                                <td>฿{item.lineTotal}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Order Summary */}
                            <div className="orderdetail-info">
                                <h3 className="orderdetail-subtitle">Order Summary</h3>
                                <div className="order-summary-card">
                                    <p><span>Date:</span> <strong>{order.createdAt}</strong></p>
                                    <p><span>Subtotal:</span> <strong>฿{order.subtotal}</strong></p>
                                    <p><span>Delivery Fee:</span> <strong>฿{order.deliveryFee}</strong></p>
                                    <div className="grand-total">
                                        <p><span>Grand Total:</span> <strong className="total-amount">฿{order.grandTotal}</strong></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="orderdetail-empty">Loading order details...</p>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default OrderDetail;