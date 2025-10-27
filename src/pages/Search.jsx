// src/pages/SearchPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import CatalogGrid from "../components/Card.jsx";

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

        if (priceMin) filtered = filtered.filter((p) => p.productPrice >= Number(priceMin));
        if (priceMax) filtered = filtered.filter((p) => p.productPrice <= Number(priceMax));
        if (inStock) filtered = filtered.filter((p) => p.stock > 0);

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fs-4 fw-semibold">Search Results</h1>

          {/* 🔽 Filter toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-light d-flex align-items-center gap-2"
          >
            <i className="bi bi-funnel-fill text-secondary"></i>
            <span>Filter</span>
          </button>
        </div>

        {/* 🎛 Filter dropdown */}
        {showFilter && (
          <div className="border rounded-3 p-4 mb-4 bg-white shadow-sm">
            <div className="mb-3">
              <label className="fw-semibold mb-1 d-block">Price</label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceMin}
                  onChange={(e) => setPriceMin(e.target.value)}
                  className="form-control w-auto"
                  style={{ width: "100px" }}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceMax}
                  onChange={(e) => setPriceMax(e.target.value)}
                  className="form-control w-auto"
                  style={{ width: "100px" }}
                />
              </div>
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                id="inStockCheck"
              />
              <label className="form-check-label" htmlFor="inStockCheck">
                Stock available
              </label>
            </div>

            {/* ปุ่ม Clear / Search มีระยะห่างแน่ ๆ */}
            <div className="d-flex gap-3">
              <button
                onClick={clearFilter}
                className="btn border border-danger text-danger"
              >
                Clear
              </button>

              <button
                onClick={() => setShowFilter(false)}
                className="btn text-white"
                style={{
                  backgroundColor: "#FF4500",
                  borderColor: "#FF4500",
                }}
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
