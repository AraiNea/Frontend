import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useMessage from "../components/useMessage";
import CategoryList from "../components/CategoryCard";

function Category() {
    const { showMessagePermission, showMessageError } = useMessage();
    const [categories, setCategories] = useState([]);

    const fetchCategoryData = async () => {
        try {
            const res = await axios.get("http://localhost:8080/category/");
            if (res.data) {
                // ✅ กรอง category ที่มีสินค้าเปิดอยู่เท่านั้น (ถ้ามีข้อมูล products)
                const visibleCategories = res.data.categories?.filter(
                    (c) =>
                        !c.products ||
                        c.products.some((p) => p.isActive === 1)
                ) || [];

                setCategories(visibleCategories);
            }
        } catch (e) {
            if (e.response?.status === 401) showMessagePermission();
            else showMessageError(e);
        }
    };

    useEffect(() => {
        fetchCategoryData();
    }, []);

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content">
                {categories.length > 0 ? (
                    <CategoryList categories={categories} />
                ) : (
                    <div className="text-center text-muted mt-5">Loading categories...</div>
                )}
            </main>
            <Footer />
        </div>
    );
}

export default Category;