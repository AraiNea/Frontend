/// src/pages/SearchPage.jsx
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

        const allProducts = Array.isArray(products.products)
          ? products.products
          : [];

        const filteredProducts = allProducts.filter((p) =>
          p.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const grouped = {};
        filteredProducts.forEach((p) => {
          if (!grouped[p.categoryId]) {
            grouped[p.categoryId] = {
              category: {
                categoryId: p.categoryId,
              },
              products: [],
            };
          }
          grouped[p.categoryId].products.push({
            productId: p.productId,
            productName: p.productName,
            productDetail: p.productDetail,
            productPrice: p.productPrice,
            productImgPath: p.productImgPath || "/images/placeholder.png", // key ต้องตรงกับ ProductCard
          });
        });

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
    <div>
      <Header />

      <div className="container my-4">
        <h1>Result</h1>
        {loading ? (
          <p>กำลังโหลด...</p>
        ) : data.results.length > 0 ? (
          <CatalogGrid
            data={data}
            onProductClick={(id) => navigate(`/product/${id}`)}
          />
        ) : (
          <p>ไม่พบสินค้า</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
