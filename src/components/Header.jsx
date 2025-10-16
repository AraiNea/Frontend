import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true; // ✅ ส่ง cookie ทุก request

const Header = () => {
    const navigate = useNavigate();
    const { showMessageError, showMessageSuccess } = useMessage();

    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true" // ✅ ดึงสถานะจาก localStorage ตอนโหลด
    );
    const [username, setUsername] = useState(localStorage.getItem("username") || "");

    // ✅ ตรวจสอบสถานะ login จาก backend (ยืนยันความถูกต้องของ cookie)
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile/me");

                if (res.data && res.data.username) {
                    setIsLoggedIn(true);
                    setUsername(res.data.username);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("username", res.data.username);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem("isLoggedIn");
                    localStorage.removeItem("username");
                }
            } catch (err) {
                // ✅ ถ้าแค่ยังไม่ล็อกอิน (401) — ไม่ต้องโชว์ alert
                if (err.response?.status !== 401) {
                    console.error("Login check failed:", err);
                    showMessageError(err);
                }
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("username");
            }
        };

        checkLoginStatus();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:8080/profile/logout");
            setIsLoggedIn(false);
            setUsername("");
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
            showMessageSuccess("Logout successful");
            navigate("/login");
        } catch (e) {
            showMessageError(e);
        }
    };

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
                                    <a href="#" className="header-action-btn me-3">
                                        <i className="bi bi-cart3"></i>
                                        <span className="d-none d-md-inline-block">Cart</span>
                                        <span className="badge bg-danger">3</span>
                                    </a>
                                    <a href="#" className="header-action-btn me-3">
                                        <i className="bi bi-truck"></i>
                                        <span className="d-none d-md-inline-block">Track Order</span>
                                    </a>
                                </>
                            )}

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
                                        <>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogin}>
                                                    Log In
                                                </button>
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
