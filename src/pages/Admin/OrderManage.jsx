import { useState, useEffect } from "react";
import Adminheader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import useMessage from "../../components/useMessage";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Accept"] = "application/json";

function OrderManagement() {
    const {
        showMessageError,
        showMessageSuccess,
        showMessageConfirmProcess,
    } = useMessage();

    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ โหลดข้อมูล order ทั้งหมด
    const fetchOrders = async () => {
        try {
            const res = await axios.get("http://localhost:8080/order/list", {
                withCredentials: true,
            });
            if (res.data?.results) {
                setOrders(res.data.results);
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // ✅ ค้นหาด้วย orderId
    const filteredOrders = orders.filter((o) => {
        if (!searchQuery.trim()) return true;
        const id = String(o.order.orderId);
        return id.includes(searchQuery.trim());
    });

    // ✅ เปลี่ยนสถานะ (Pending = 0, Fulfilled = 1)
    const handleStatusChange = async (orderId, newStatusValue) => {
        const statusText = newStatusValue === "1" ? "Fulfilled" : "Pending";
        const confirm = await showMessageConfirmProcess(
            `Are you sure to change this order to "${statusText}"?`
        );
        if (!confirm.isConfirmed) return;

        try {
            const res = await axios.post(
                "http://localhost:8080/order/update",
                { orderId, status: Number(newStatusValue) },
                { withCredentials: true }
            );

            if (res.data?.message?.includes("success")) {
                showMessageSuccess("Order status updated successfully");
                fetchOrders();
            } else {
                showMessageError("Failed to update status, please try again.");
            }
        } catch (e) {
            showMessageError(e);
        }
    };

    return (
        <div className="app-layout">
            <Adminheader />
            <main className="main-content">
                {/* Search bar */}
                <div className="product-header d-flex align-items-center gap-3 mb-4 pt-4 ps-4">
                    <input
                        className="product-search-box"
                        type="text"
                        placeholder="Search by Order ID"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Table */}
                <div className="product-table">
                    <table className="table table-borderless align-middle product-management-table text-center">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total Price</th>
                                <th>Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((item) => {
                                const o = item.order;
                                return (
                                    <tr key={o.orderId}>
                                        <td>{o.orderId}</td>
                                        <td>{o.username}</td>
                                        <td>{o.grandTotal}฿</td>
                                        <td>{o.createdAt}</td>
                                        <td>
                                            <select
                                                className={`status-dropdown ${
                                                    o.status === 0
                                                        ? "status-pending"
                                                        : "status-fulfilled"
                                                }`}
                                                value={String(o.status)}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        o.orderId,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="0">Pending</option>
                                                <option value="1">Fulfilled</option>
                                            </select>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default OrderManagement;