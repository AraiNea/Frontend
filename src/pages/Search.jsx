// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import CatalogGrid from "../components/Card.jsx";

const SearchPage = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(`http://localhost:8080/product/list`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const products = await res.json();

        // ✅ ดึงรายการสินค้า
        const allProducts = Array.isArray(products.products)
          ? products.products
          : [];

        // ✅ กรองสินค้า: ต้องชื่อใกล้เคียง + เปิดใช้งานเท่านั้น
        const filteredProducts = allProducts.filter(
          (p) =>
            p.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            p.isActive === 1
        );

        // ✅ จัดกลุ่มตาม categoryId เพื่อให้ใช้กับ CatalogGrid ได้
        const grouped = {};
        filteredProducts.forEach((p) => {
          if (!grouped[p.categoryId]) {
            grouped[p.categoryId] = {
              category: {
                categoryId: p.categoryId,
                categoryName: p.categoryName || "Uncategorized",
              },
              products: [],
            };
          }
          grouped[p.categoryId].products.push({
            productId: p.productId,
            productName: p.productName,
            productDetail: p.productDetail,
            productPrice: p.productPrice,
            productImgPath: p.productImgPath || "/images/placeholder.png",
          });
        });

        // ✅ เซ็ตผลลัพธ์ให้เหมาะกับ CatalogGrid
        setData({ results: Object.values(grouped) });
      } catch (err) {
        console.error("Fetch error:", err);
        setData({ results: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content container my-4">
        <h1 className="mb-4">Search Results</h1>

        {loading ? (
          <p className="text-muted">กำลังโหลด...</p>
        ) : data.results.length > 0 ? (
          <CatalogGrid
            data={data}
            onProductClick={(id) => navigate(`/product/${id}`)}
          />
        ) : (
          <p className="text-center text-muted">ไม่พบสินค้า</p>
        )}
      </main>
    </div>
  );
};

export default SearchPage;