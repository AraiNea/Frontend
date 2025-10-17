import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function UpdateAddress() {
    const navigate = useNavigate();
    const { showMessageError, showMessageSuccess, showMessageAdjust } = useMessage();

    // ✅ เพิ่ม addressId ใน state
    const [form, setForm] = useState({
        addressId: null,
        receivedName: "",
        addrNum: "",
        district: "",
        amphor: "",
        province: "",
        zipCode: "",
        phone: "",
        detail: "",
    });

    // ✅ โหลดข้อมูลที่อยู่ปัจจุบัน
    const fetchAddress = async () => {
        try {
            const res = await axios.get("http://localhost:8080/address/list");
            if (res.data && res.data.address) {
                setForm({
                    addressId: res.data.address.addressId || null, // 🟢 เพิ่มตรงนี้
                    receivedName: res.data.address.receivedName || "",
                    addrNum: res.data.address.addrNum || "",
                    district: res.data.address.district || "",
                    amphor: res.data.address.amphor || "",
                    province: res.data.address.province || "",
                    zipCode: res.data.address.zipCode || "",
                    phone: res.data.address.phone || "",
                    detail: res.data.address.detail || "",
                });
            }
        } catch (err) {
            showMessageError(err);
        }
    };

    useEffect(() => {
        fetchAddress();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // ✅ Checkout
    const handleCheckout = async (e) => {
        e.preventDefault();

        try {
            // 🟢 เช็ก login session ก่อน
            const meRes = await axios.get("http://localhost:8080/profile/me", { withCredentials: true });
            if (!meRes.data || !meRes.data.username) {
                showMessageAdjust("Please log in again before checkout.", "error");
                navigate("/login");
                return;
            }

            // 🟢 ตรวจว่ามี addressId ก่อน
            if (!form.addressId) {
                showMessageAdjust("Your address ID is missing. Please try again.", "error");
                return;
            }

            // 1️⃣ Update address
            await axios.post("http://localhost:8080/address/update", form, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            // 2️⃣ สร้าง order
            const orderData = JSON.parse(sessionStorage.getItem("orderData"));
            if (!orderData) {
                showMessageAdjust("Order data not found.", "error");
                return;
            }

            // ✅ ป้องกัน axios โยน error เมื่อ status != 2xx
            const orderRes = await axios.post("http://localhost:8080/order/create", orderData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
                validateStatus: () => true, // 🟢 สำคัญมาก — ทำให้เข้า if-else ได้เอง
            });

            // ✅ ตรวจสอบสถานะ response เอง
            if (orderRes.status === 200 || orderRes.status === 201) {
                showMessageSuccess("Your order has been placed successfully!");
                navigate("/trackorder");
            }
            else if (
                orderRes.status === 400 &&
                orderRes.data?.message?.toLowerCase().includes("not enough stock")
            ) {
                // 🟥 สินค้าไม่พอใน stock
                showMessageAdjust(
                    "Some items in your cart are out of stock. Please check again.",
                    "warning"
                );
            }
            else {
                showMessageAdjust(
                    orderRes.data?.message || "Failed to create order.",
                    "error"
                );
            }

        } catch (err) {
            // ❌ กรณี network error หรือ server ล่มจริง ๆ
            showMessageError(err);
        }
    };



    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                <div className="container py-5 d-flex justify-content-center">
                    <div className="address-form-container">
                        <h4>Address</h4>
                        <form onSubmit={handleCheckout}>
                            <input type="hidden" name="addressId" value={form.addressId || ""} />

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="receivedName"
                                    value={form.receivedName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Address no.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="addrNum"
                                    value={form.addrNum}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Subdistrict</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="district"
                                        value={form.district}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">District</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="amphor"
                                        value={form.amphor}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Province</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="province"
                                        value={form.province}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label className="form-label fw-semibold">Zip Code</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="zipCode"
                                        value={form.zipCode}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label fw-semibold">Telephone no.</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label fw-semibold">Detail</label>
                                <textarea
                                    className="form-control"
                                    name="detail"
                                    rows="2"
                                    value={form.detail}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-checkout">
                                Check out
                            </button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default UpdateAddress;