import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import UserContext from "./components/context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

// 🟩 Pages (User)
import Profile from "./pages/Profile.jsx";
import Cart from "./pages/Cart.jsx";
import UpdateAddress from "./pages/Address.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";

// 🟥 Pages (Admin)
import ProductsManage from "./pages/Admin/ProductsManage.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import CategoryManagement from "./pages/Admin/CategoryManage.jsx";
import OrderManagement from "./pages/Admin/OrderManage.jsx";

export default function AppWithAuth() {
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile/me", {
                    withCredentials: true,
                });

                if (res.data?.username) {
                    setUserInfo({
                        username: res.data.username,
                        role: res.data.role, // 1=user, 2=admin
                    });
                } else {
                    setUserInfo(null);
                }
            } catch {
                setUserInfo(null);
            }
        };

        fetchUserInfo();
    }, []);

    if (userInfo === undefined)
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-danger" role="status"></div>
            </div>
        );

    return (
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
            <Routes>
                {/* 🔹 USER ROUTES */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute allowedRoles={[1, 2]}>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <Cart />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/updateAddress"
                    element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <UpdateAddress />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/trackOrder"
                    element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <TrackOrder />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orderDetail/:orderId"
                    element={
                        <ProtectedRoute allowedRoles={[1]}>
                            <OrderDetail />
                        </ProtectedRoute>
                    }
                />

                {/* 🔸 ADMIN ROUTES */}
                <Route
                    path="/productsManagement"
                    element={
                        <ProtectedRoute allowedRoles={[2]}>
                            <ProductsManage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/adminProfile"
                    element={
                        <ProtectedRoute allowedRoles={[2]}>
                            <AdminProfile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/categoryManagement"
                    element={
                        <ProtectedRoute allowedRoles={[2]}>
                            <CategoryManagement />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/orderManagement"
                    element={
                        <ProtectedRoute allowedRoles={[2]}>
                            <OrderManagement />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </UserContext.Provider>
    );
}
