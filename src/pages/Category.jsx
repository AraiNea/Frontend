import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";
import CategoryList from "../components/CategoryCard";

function Category() {
    const { categoryId } = useParams();
    const { showMessagePermission, showMessageError } = useMessage();
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const fetchCategoryData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/category/`);
            if (res.data) {
                setCategories(res.data.categories);
                setProducts(res.data.products);
            }
        } catch (e) {
            if (e.response?.status === 401) {
                showMessagePermission();
            } else {
                showMessageError(e);
            }
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    return (
        <>
            <div className="app-layout">
                <Header />
                <main className="main-content">
                {/* ตรวจสอบว่า categories มีข้อมูลก่อนส่งไปที่ CategoryList */}
                {categories && categories.length > 0 ? (
                    <CategoryList categories={categories} />
                ) : (
                    <div>Loading categories...</div>
                )}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default Category;
