import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true; // ✅ ให้ axios ส่ง cookie อัตโนมัติทุก request

function Login() {
    const { showMessagePermission, showMessageError } = useMessage();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // ✅ 1. ยิง API ไป login
            const res = await axios.post("http://localhost:8080/profile/login", {
                username,
                password,
            });

            // ✅ 2. ถ้า login สำเร็จ → เรียก /profile/me เพื่อตรวจ role
            if (res.data?.message === "success") {
                const meRes = await axios.get("http://localhost:8080/profile/me");
                const role = Number(meRes.data.role); // ✅ บังคับให้เป็นตัวเลข

                if (role === 2) {
                    navigate("/productsManagement");
                } else if (role === 1) {
                    navigate("/");
                } else {
                    showMessageError("Invalid role, please contact admin.");
                }
            } else {
                showMessageError("Login failed — please try again.");
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission();
            } else {
                showMessageError(e);
            }
        }
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return (
        <>
            <Header /> {/* ✅ Header ด้านบน */}

            <div className="login-container">
                <div className="login-image"></div>

                <div className="login-form-container">
                    <form className="login-form" onSubmit={handleLogin}>
                        <h3 className="text-center mb-4">Sign In</h3>

                        <div className="form-group mb-3">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Value"
                                required
                            />
                        </div>

                        <div className="form-group mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Value"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-danger w-100 mb-3"
                            style={{ backgroundColor: "#e53935" }}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            className="btn btn-warning w-100"
                            style={{ backgroundColor: "#FB8C00" }}
                            onClick={handleRegister}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>

            <Footer /> {/* ✅ Footer ด้านล่าง */}
        </>
    );
}

export default Login;
