import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CatalogGrid from "../components/Card";
import useMessage from "../components/useMessage";

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const { showMessageError } = useMessage();
    const [categoryData, setCategoryData] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:8080/category/");
            if (res.data && res.data.products) {
                // ✅ กรองสินค้าตามหมวด + แสดงเฉพาะสินค้าที่เปิดอยู่
                const filteredProducts = res.data.products.filter(
                    (p) =>
                        p.categoryName.toLowerCase() === categoryName.toLowerCase() &&
                        p.isActive === 1
                );

                const foundCategory = res.data.categories.find(
                    (c) => c.categoryName.toLowerCase() === categoryName.toLowerCase()
                );

                // ✅ จัด format ให้เข้ากับ CatalogGrid
                const formattedData = {
                    results: [
                        {
                            category: foundCategory || { categoryName },
                            products: filteredProducts,
                        },
                    ],
                };

                setCategoryData(formattedData);
            }
        } catch (e) {
            console.error(e);
            showMessageError(e);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [categoryName]);

    return (
        <div className="app-layout">
            <Header />
            <main className="main-content container py-5 category-products-page">
                {categoryData ? (
                    <CatalogGrid
                        data={categoryData}
                        onProductClick={(productId) => navigate(`/product/${productId}`)}
                    />
                ) : (
                    <p className="text-center text-muted">Loading products...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CategoryProducts;