// Header.jsx
import React, { useState } from "react";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Search:", searchQuery);
    };

    const handleTrackOrder = () => {
        console.log("Go to Track Order page");
        // หรือใช้ react-router-dom: navigate("/track-order");
    };

    const handleCart = () => {
        console.log("Go to Cart page");
    };

    const handleAccount = () => {
        console.log("Go to Account page");
    };

    return (
        <header style={{ borderBottom: "1px solid #ddd" }}>
            {/* 🔹 Top Bar */}
            <div
                style={{
                    backgroundColor: "#FEF4E4",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "5px 20px",
                    fontSize: "14px",
                }}
            >
                {/* Left Side */}
                <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
                    {/* Phone */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                            </svg>
                        </> <span>Customer Support:</span>
                        <span style={{ color: "red" }}>0123456789</span>
                    </div>
                    {/* Email */}
                    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                            </svg>
                        </> <span style={{ color: "red" }}>lnw(Piz)za007@gmail.com</span>
                    </div>
                </div>

                {/* Right Side (Track Order → clickable) */}
                <button
                    onClick={handleTrackOrder}
                    style={{
                        background: "none",
                        border: "none",
                        color: "red",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-truck" viewBox="0 0 16 16">
                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2" />
                        </svg>
                    </><span>Track Order</span>
                </button>
            </div>

            {/* 🔹 Middle Section */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px 30px",
                }}
            >
                {/* Logo */}
                <div style={{ fontSize: "24px", fontWeight: "bold" }}>
                    <span style={{ color: "#e63946" }}>JomHut </span>
                    <span style={{ color: "orange" }}>lnw(Piz)za007</span>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    style={{
                        display: "flex",
                        width: "50%",
                        border: "1px solid #ccc",
                        borderRadius: "20px",
                        overflow: "hidden",
                    }}
                >
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        style={{
                            flex: 1,
                            padding: "10px",
                            border: "none",
                            outline: "none",
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "red",
                            color: "white",
                            border: "none",
                            padding: "0 15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                    >
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </>
                    </button>
                </form>

                {/* Cart & Account → clickable */}
                <div style={{ display: "flex", gap: "20px", fontSize: "16px" }}>
                    <button
                        onClick={handleCart}
                        style={{
                            background: "none",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart2" viewBox="0 0 16 16">
                                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                            </svg>
                        </> Cart
                    </button>
                    <button
                        onClick={handleAccount}
                        style={{
                            background: "none",
                            border: "none",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                            </svg>
                        </> Account
                    </button>
                </div>
            </div>

            {/* เนปบาร์ส่วนล่าง */}
            <nav
                style={{
                    display: "flex",
                    gap: "30px",
                    padding: "10px 30px",
                    borderTop: "1px solid #eee",
                    fontSize: "16px",
                }}
            >
                <a href="#" style={{ color: "red", textDecoration: "none", borderBottom: "2px solid red" }}>
                    Home
                </a>
                <a href="#" style={{ color: "black", textDecoration: "none" }}>
                    Category
                </a>
                <a href="#" style={{ color: "black", textDecoration: "none" }}>
                    Search
                </a>
            </nav>
        </header>
    );
};

export default Header;
