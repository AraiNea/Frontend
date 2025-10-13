import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import useMessage from "../../components/useMessage";

function AdminRegister() {
    const { showMessagePermission, showMessageError, showMessageSave, showMessageNotSuccess } = useMessage();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        profileName: "",
        profileSname: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const newErrors = {};

        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showMessageNotSuccess("Please correct the errors before submitting.");
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/profile/admin/signup",
                { ...formData },
                { withCredentials: true }
            );

            if (res.data?.message === "signup success") {
                showMessageSave();
                navigate("/productsManagement");
            } else {
                showMessageError({ message: "Registration failed" });
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission();
            } else {
                showMessageError(e);
            }
        }
    };

    return (
        <>
            <div className="app-layout">
                <main className="main-content">
                    <div className="admin-register-container">
                        {/* 🔹 รูปด้านซ้าย */}
                        <div className="admin-image"></div>

                        {/* 🔹 ฟอร์มด้านขวา */}
                        <div className="admin-register-form-container">
                            <form className="admin-register-form" onSubmit={handleRegister} noValidate>
                                <h3 className="text-center mb-4">Admin Register</h3>

                                {/* Username */}
                                <div className="form-group mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`form-control ${errors.username ? "is-invalid" : ""}`}
                                        placeholder="Enter username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>

                                {/* Password */}
                                <div className="form-group mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Enter password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>

                                {/* First Name */}
                                <div className="form-group mb-3">
                                    <label className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="profileName"
                                        className={`form-control ${errors.profileName ? "is-invalid" : ""}`}
                                        placeholder="Enter first name"
                                        value={formData.profileName}
                                        onChange={handleChange}
                                    />
                                    {errors.profileName && <div className="invalid-feedback">{errors.profileName}</div>}
                                </div>

                                {/* Last Name */}
                                <div className="form-group mb-4">
                                    <label className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="profileSname"
                                        className={`form-control ${errors.profileSname ? "is-invalid" : ""}`}
                                        placeholder="Enter last name"
                                        value={formData.profileSname}
                                        onChange={handleChange}
                                    />
                                    {errors.profileSname && <div className="invalid-feedback">{errors.profileSname}</div>}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100 admin-register-button"
                                >
                                    Register
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default AdminRegister;
