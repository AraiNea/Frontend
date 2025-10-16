import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";

axios.defaults.withCredentials = true;

function EditProfile() {
    const { showMessageError, showMessageSave, showMessagePermission } = useMessage();
    const [formData, setFormData] = useState({
        profileID: "",
        username: "",
        password: "",
        profileName: "",
        profileSname: "",
    });
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    // ✅ ดึงข้อมูลโปรไฟล์ครั้งเดียวตอนเปิดหน้า
    useEffect(() => {
        let isMounted = true;
        const fetchProfile = async () => {
            try {
                const res = await axios.get("http://localhost:8080/profile/list", { withCredentials: true });

                if (isMounted && res.data && res.data.profile) {
                    const p = res.data.profile; // ✅ ดึง object profile ออกมา

                    setFormData({
                        profileID: p.profileID || "",
                        username: p.username || "",
                        password: p.password || "",
                        profileName: p.profileName || "",
                        profileSname: p.profileSname || "",
                    });
                }
            } catch (err) {
                console.error(err);
                if (isMounted) showMessageError("Failed to load profile data");
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchProfile();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ กด Save
    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                "http://localhost:8080/profile/update",
                {
                    profileID: formData.profileID,
                    username: formData.username,
                    password: formData.password,
                    profileName: formData.profileName,
                    profileSname: formData.profileSname,
                },
                { withCredentials: true }
            );

            if (res.data?.message === "success") {
                showMessageSave();
            } else {
                showMessageError("Failed to update profile");
            }
        } catch (err) {
            if (err.response?.status === 401) showMessagePermission();
            else showMessageError("Error updating profile");
        }
    };

    if (loading) {
        return (
            <>
                <Header />
                <div className="edit-profile-container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
                    <p>Loading profile...</p>
                </div>
                <Footer />
            </>
        );
    }

    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="main-content">
                    <div className="edit-profile-container">
                        <form className="edit-profile-box" onSubmit={handleSave}>
                            <h4 className="text-center mb-4 text-danger">Account</h4>

                            <div className="row g-3">
                                {/* Name */}
                                <div className="col-md-6">
                                    <label className="form-label mb-1">Name</label>
                                    <input
                                        type="text"
                                        name="profileName"
                                        className="form-control form-InputM"
                                        placeholder="Name"
                                        value={formData.profileName}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Surname */}
                                <div className="col-md-6">
                                    <label className="form-label mb-1">Surname</label>
                                    <input
                                        type="text"
                                        name="profileSname"
                                        className="form-control form-InputM"
                                        placeholder="Surname"
                                        value={formData.profileSname}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Username */}
                                <div className="col-md-6">
                                    <label className="form-label mb-1">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control form-InputM"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password */}
                                <div className="col-md-6">
                                    <label className="form-label mb-1">Password</label>
                                    <div className="password-wrapper">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            className="form-control form-InputM"
                                            placeholder="Password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <i
                                            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} toggle-eye`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        ></i>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-danger px-4 py-1 fw-bold">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}

export default EditProfile;
