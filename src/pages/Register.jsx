import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";

function Register() {
    const { showMessagePermission, showMessageError, showMessageSave, showMessageNotSuccess } = useMessage();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        profileName: "",
        profileSname: "",
        phone: "",
        province: "",
        amphor: "",
        district: "",
        zipCode: "",
        addrNum: "",
        detail: "",
        receivedName: ""
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

        // ตรวจว่าทุกช่องต้องกรอก
        Object.keys(formData).forEach((key) => {
            if (!formData[key].trim()) {
                newErrors[key] = "This field is required";
            }
        });

        if (formData.phone && !/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits only";
        }

        if (formData.zipCode && !/^[0-9]{5}$/.test(formData.zipCode)) {
            newErrors.zipCode = "Zip code must be 5 digits only";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            showMessageNotSuccess({ message: "Please correct the errors before submitting." });
            return;
        }

        try {
            const res = await axios.post(
                "http://localhost:8080/profile/user/signup",
                { ...formData },
                { withCredentials: true }
            );

            if (res.data?.message === "signup success") {
                showMessageSave();
                navigate("/login");
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
            <Header />

            <div className="container-fluid register-container">
                <div className="row g-0">
                    <div className="login-image"></div>

                    <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center register-form-wrapper">
                        <form className="register-form" onSubmit={handleRegister} noValidate>
                            <h3 className="text-center mb-4">Create an Account</h3>

                            {/* Profile Info */}
                            <div className="row">
                                {[
                                    { label: "Username", name: "username" },
                                    { label: "Password", name: "password", type: "password" },
                                    { label: "First Name", name: "profileName" },
                                    { label: "Last Name", name: "profileSname" },
                                ].map(({ label, name, type = "text" }) => (
                                    <div className="col-md-6 mb-3" key={name}>
                                        <label className="form-label">{label}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                            value={formData[name]}
                                            onChange={handleChange}
                                        />
                                        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                                    </div>
                                ))}
                            </div>

                            {/* Address Info */}
                            <h5 className="mt-4 mb-2">Address Information</h5>
                            <div className="row">
                                {[
                                    { label: "Phone", name: "phone" },
                                    { label: "Province", name: "province" },
                                    { label: "Amphor", name: "amphor" },
                                    { label: "District", name: "district" },
                                    { label: "Zip Code", name: "zipCode" },
                                    { label: "Address Number", name: "addrNum" },
                                    { label: "Detail", name: "detail" },
                                    { label: "Received Name", name: "receivedName" },
                                ].map(({ label, name }) => (
                                    <div className="col-md-6 mb-3" key={name}>
                                        <label className="form-label">{label}</label>
                                        <input
                                            type="text"
                                            name={name}
                                            className={`form-control ${errors[name] ? "is-invalid" : ""}`}
                                            placeholder={`Enter ${label.toLowerCase()}`}
                                            value={formData[name]}
                                            onChange={handleChange}
                                        />
                                        {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
                                    </div>
                                ))}
                            </div>

                            <button type="submit" className="btn btn-warning w-100 register-button">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default Register;