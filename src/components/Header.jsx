import React, { useState, useEffect } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true; // ✅ ส่ง cookie ทุก request

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { showMessageError, showMessageSuccess } = useMessage();

    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [cartCount, setCartCount] = useState(0);

    // ✅ ดึงข้อมูล cart
    const fetchCartCount = async () => {
        try {
            const res = await axios.get("http://localhost:8080/cart/list");
            if (res.data?.cartItems || res.data?.items) {
                const items = res.data.cartItems || res.data.items;
                const totalItems = items.reduce((sum, item) => sum + item.qty, 0);
                setCartCount(totalItems);
            } else {
                setCartCount(0);
            }
        } catch (err) {
            console.error("Failed to load cart:", err);
        }
    };

    // ✅ ตรวจสอบสถานะ login จาก backend
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile/me");

                if (res.data && res.data.username) {
                    setIsLoggedIn(true);
                    setUsername(res.data.username);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", res.data.username);
                    fetchCartCount();
                } else {
                    setIsLoggedIn(false);
                    setCartCount(0);
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("username");
                }
            } catch (err) {
                if (err.response?.status !== 401) showMessageError(err);
                setIsLoggedIn(false);
                setCartCount(0);
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
            }
        };

        checkLoginStatus();

        // ✅ อัปเดตชื่อเมื่อ profile เปลี่ยน
        const handleProfileUpdate = () => {
            const updatedUsername = localStorage.getItem("username");
            if (updatedUsername) setUsername(updatedUsername);
        };
        window.addEventListener("profileUpdated", handleProfileUpdate);

        // ✅ อัปเดตจำนวน cart เมื่อมีสินค้าเพิ่ม/ลบ
        const handleCartUpdate = () => fetchCartCount();
        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("profileUpdated", handleProfileUpdate);
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, []);

    // ✅ ไปหน้า cart
    const handleCartClick = (e) => {
        e.preventDefault();
        navigate("/cart");
    };

    // ✅ ไปหน้า track order
    const handleTrackOrderClick = (e) => {
        e.preventDefault();
        navigate("/trackorder");
    };

    // ✅ ค้นหา
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    // ✅ เข้าสู่ระบบ / ออกจากระบบ
    const handleLogin = () => navigate("/login");
    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/profile/logout");
            setIsLoggedIn(false);
            setUsername("");
            setCartCount(0);
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            showMessageSuccess("Logout successful");
            navigate("/login");
        } catch (e) {
            showMessageError(e);
        }
    };

    // ✅ ตรวจหน้า active เพื่อเปลี่ยนสี
    const isCartActive = location.pathname === "/cart";
    const isTrackOrderActive = location.pathname === "/trackorder";

    return (
        <header id="header" className="header position-relative">
            {/* Top Bar */}
            <div className="top-bar py-2 d-none d-lg-block bg-light">
                <div className="container-fluid container-xl">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                                <div className="top-bar-item me-4">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <span>Customer Support: </span>
                                    <span style={{ color: "#e53935" }}>0123456789</span>
                                </div>
                                <div className="top-bar-item">
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    <a href="mailto:support@example.com" style={{ color: "#e53935" }}>
                                        lnw(Piz)za007@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header */}
            <div className="main-header">
                <div className="container-fluid container-xl">
                    <div className="d-flex flex-wrap py-3 align-items-center">
                        {/* Logo */}
                        <a href="/" className="logo d-flex align-items-center">
                            <h1 className="sitename" style={{ color: "#e53935" }}>
                                JomHut <span style={{ color: "#FB8C00" }}>lnw(Piz)za007</span>
                            </h1>
                        </a>

                        {/* Search */}
                        <form className="search-form desktop-search-form" onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for products..."
                                />
                                <button className="btn search-btn" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>

                        {/* Actions */}
                        <div className="header-actions d-flex align-items-center justify-content-end">
                            {isLoggedIn && (
                                <>
                                    {/* 🛒 Cart */}
                                    <button
                                        onClick={handleCartClick}
                                        className="header-action-btn me-3 btn bg-transparent border-0 position-relative"
                                        style={{
                                            color: isCartActive ? "#e53935" : "#000",
                                        }}
                                    >
                                        <i className={`bi ${isCartActive ? "bi-cart-fill" : "bi-cart3"}`}></i>
                                        <span
                                            className="d-none d-md-inline-block ms-1"
                                            style={{ color: isCartActive ? "#e53935" : "#000" }}
                                        >
                                            Cart
                                        </span>
                                        {cartCount > 0 && (
                                            <span
                                                className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                                                style={{
                                                    fontSize: "0.7rem",
                                                    borderRadius: "50%",
                                                }}
                                            >
                                                {cartCount}
                                            </span>
                                        )}
                                    </button>

                                    {/* 🚚 Track Order */}
                                    <button
                                        onClick={handleTrackOrderClick}
                                        className="header-action-btn me-3 btn bg-transparent border-0"
                                        style={{
                                            color: isTrackOrderActive ? "#e53935" : "#000",
                                        }}
                                    >
                                        <i className={`bi ${isTrackOrderActive ? "bi-truck-front-fill" : "bi-truck"}`}></i>
                                        <span
                                            className="d-none d-md-inline-block ms-1"
                                            style={{ color: isTrackOrderActive ? "#e53935" : "#000" }}
                                        >
                                            Track Order
                                        </span>
                                    </button>
                                </>
                            )}

                            {/* 👤 Profile */}
                            <div className="dropdown">
                                <button className="header-action-btn" data-bs-toggle="dropdown">
                                    <i className="bi bi-person"></i>
                                    <span className="d-none d-md-inline-block">
                                        {isLoggedIn ? username : "Guest"}
                                    </span>
                                </button>
                                <ul className="dropdown-menu">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <a className="dropdown-item" href="/profile">
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>
                                                    Logout
                                                </button>
                                            </li>
                                        </>
                                    ) : (
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogin}>
                                                Log In
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Search */}
            <div id="mobileSearch" className="d-lg-none">
                <div className="container-fluid container-xl">
                    <form className="search-form" onSubmit={handleSearch}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search..."
                            />
                            <button className="btn search-btn" type="submit">
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Nav */}
            <div className="header-nav border-top">
                <div className="container-fluid container-xl">
                    <nav className="navmenu">
                        <ul className="d-flex gap-4 list-unstyled mb-0">
                            <li>
                                <NavLink
                                    to="/"
                                    className="nav-link"
                                    style={({ isActive }) => ({
                                        color: isActive ? "#e53935" : "#000",
                                    })}
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/category"
                                    className="nav-link"
                                    style={({ isActive }) => ({
                                        color: isActive ? "#e53935" : "#000",
                                    })}
                                >
                                    Category
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/search"
                                    className="nav-link"
                                    style={({ isActive }) => ({
                                        color: isActive ? "#e53935" : "#000",
                                    })}
                                >
                                    Search
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;