// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilter } from "react-icons/fa";
import Header from "../components/Header.jsx";
import CatalogGrid from "../components/Card.jsx"; // ใช้ CatalogGrid

const SearchPage = () => {
  const [data, setData] = useState({ results: [] });
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStock, setInStock] = useState(false);

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

        let filtered = allProducts.filter(
          (p) =>
            p.productName.toLowerCase().includes(searchQuery.toLowerCase()) &&
            p.isActive === 1
        );

        if (priceMin) filtered = filtered.filter(p => p.productPrice >= Number(priceMin));
        if (priceMax) filtered = filtered.filter(p => p.productPrice <= Number(priceMax));
        if (inStock) filtered = filtered.filter(p => p.productStock > 0);

        // group by category และเพิ่ม stock
        const grouped = {};
        filtered.forEach((p) => {
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
            productStock: p.productStock, // ✅ เพิ่ม stock
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
  }, [searchQuery, priceMin, priceMax, inStock]);

  const clearFilter = () => {
    setPriceMin("");
    setPriceMax("");
    setInStock(false);
  };

  return (
    <div className="app-layout">
      <Header />
      <main className="main-content container my-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Search Results</h1>

          {/* Funnel filter toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300 flex items-center gap-2"
          >
            <FaFilter className="text-gray-700" />
            <span>Filter</span>
          </button>
        </div>

        {/* Filter dropdown */}
        {showFilter && (
          <div className="border rounded-lg p-4 mb-4 bg-white shadow-md">
            <div className="mb-3">
              <label className="block font-semibold mb-1">Price</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="border px-2 py-1 rounded w-24"
                />
                <span style={{ margin: "0 5px", color: "#FF4500", fontWeight: "bold" }}>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="border px-2 py-1 rounded w-24"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                />
                Stock available
              </label>
            </div>

            <div className="flex gap-10">
              <button
                onClick={clearFilter}
                className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50"
              >
                Clear
              </button>
              <button
                onClick={() => setShowFilter(false)}
                className="text-white px-4 py-2 rounded"
                style={{ backgroundColor: '#FF4500', border: '1px solid #FF4500' }}
              >
                Search
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-muted">กำลังโหลด...</p>
        ) : data.results.length > 0 ? (
          <CatalogGrid
            data={data} // ✅ CatalogGrid จะใช้ productStock
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
