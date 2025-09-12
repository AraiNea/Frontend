// Header.jsx
import React, { useState } from "react";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search:", searchQuery);
    };

    return (
        <header id="header" className="header position-relative">
            {/* 🔹 Top Bar */}
            <div className="top-bar py-2 d-none d-lg-block bg-light">
                <div className="container-fluid container-xl">
                    <div className="row align-items-center">
                        {/* Left */}
                        <div className="col-lg-6">
                            <div className="d-flex align-items-center">
                                <div className="top-bar-item me-4">
                                    <i className="bi bi-telephone-fill me-2"></i>
                                    <span>Customer Support: </span>
                                    <span style={{color: "#e53935"}}>0123456789</span>
                                </div>
                                <div className="top-bar-item">
                                    <i className="bi bi-envelope-fill me-2"></i>
                                    <a href="mailto:support@example.com" style={{color: "#e53935"}}>
                                        lnw(Piz)za007@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right */}
                        <div className="col-lg-6">
                            <div className="d-flex justify-content-end">
                                <div className="top-bar-item me-4">
                                    <a href="#" style={{color: "#e53935"}}>
                                        <i className="bi bi-truck me-2"></i> Track Order
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
                    <div className="d-flex py-3 align-items-center justify-content-between">
                        {/* Logo */}
                        <a href="/" className="logo d-flex align-items-center">
                            <h1 className="sitename" style={{color: "#e53935"}}>
                                JomHut <span style={{color: "#FB8C00"}}>lnw(Piz)za007</span>
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
                                <button className="btn btn-danger search-btn" type="submit">
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                        </form>

                        {/* Actions */}
                        <div className="header-actions d-flex align-items-center justify-content-end">
                            <a href="#" className="header-action-btn me-3">
                                <i className="bi bi-cart3"></i>
                                <span className="d-none d-md-inline-block">Cart</span>
                                <span className="badge bg-danger">3</span>
                            </a>
                            <div className="dropdown">
                                <button className="header-action-btn" data-bs-toggle="dropdown">
                                    <i className="bi bi-person"></i>
                                    <span className="d-none d-md-inline-block">Account</span>
                                </button>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="#">Profile</a></li>
                                    <li><a className="dropdown-item" href="#">Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔹 Nav */}
            <div className="header-nav border-top">
                <div className="container-fluid container-xl">
                    <nav className="navmenu">
                        <ul className="d-flex gap-4 list-unstyled mb-0">
                            <li><a href="/" className="active" style={{color: "#e53935"}}>Home</a></li>
                            <li><a href="#">Category</a></li>
                            <li><a href="#">Search</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
