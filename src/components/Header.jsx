// Header.jsx
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== "") {
            // ไปหน้า /search พร้อม query parameter
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleLogin = () => {
        navigate("/login");
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        console.log("User logged out");
    };

    return (
        <header id="header" className="header position-relative">
            {/* Top Bar */}
            <div className="top-bar py-2 d-none d-lg-block bg-light">
                <div className="container-fluid container-xl">
                    <div className="row align-items-center">
                        {/* Top Left */}
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

            {/* 🔹 Main Header */}
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
                        <form
                            className="search-form desktop-search-form"
                            onSubmit={handleSearch}
                        >
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
                                        {isLoggedIn ? "Account" : "Guest"}
                                    </span>
                                </button>
                                <ul className="dropdown-menu">
                                    {isLoggedIn ? (
                                        <>
                                            <li>
                                                <a className="dropdown-item" href="#">
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

            {/* ✅ Mobile Search (แสดงเฉพาะจอเล็ก) */}
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


            {/* 🔹 Nav */}
            <div className="header-nav border-top">
                <div className="container-fluid container-xl">
                    <nav className="navmenu">
                        <ul className="d-flex gap-4 list-unstyled mb-0">
                            <li>
                                <NavLink
                                    to="/" // เส้นทางที่ต้องการให้ลิงก์ไป
                                    className="nav-link"
                                    style={({ isActive }) => ({
                                        color: isActive ? "#e53935" : "#000", // เปลี่ยนสีเมื่อเป็น active
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
                                <NavLink to="/search"
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
