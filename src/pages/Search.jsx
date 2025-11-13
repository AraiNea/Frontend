import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import CatalogGrid from "../components/Card.jsx";

const SearchPage = () => {
  const [allProducts, setAllProducts] = useState([]); // สินค้าจาก backend
  const [filteredProducts, setFilteredProducts] = useState([]); // สินค้าหลัง filter
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [inStock, setInStock] = useState(false);

  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const searchQuery = queryParams.get("query") || "";

  // 🔹 Fetch จาก backend โดยส่ง searchQuery
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const url = `http://localhost:8080/product/list?productName=${encodeURIComponent(searchQuery)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        const products = Array.isArray(data.products)
          ? data.products.filter((p) => Number(p.isActive) === 1)
          : [];

        setAllProducts(products);          // เก็บทั้งหมด
      } catch (err) {
        console.error("Fetch error:", err);
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // 🔹 Filter frontend (ราคา + stock)
  useEffect(() => {
    let filtered = [...allProducts];

    if (priceMin)
      filtered = filtered.filter(
        (p) => Number(p.productPrice) >= Number(priceMin)
      );
    if (priceMax)
      filtered = filtered.filter(
        (p) => Number(p.productPrice) <= Number(priceMax)
      );
    if (inStock)
      filtered = filtered.filter(
        (p) => Number(p.productStock) > 0
      );

    // 🔹 group by category
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
        productStock: p.productStock,
        productImgPath: p.productImgPath || "/images/placeholder.png",
      });
    });

    setFilteredProducts(Object.values(grouped));
  }, [allProducts, priceMin, priceMax, inStock]);

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

          <button
            onClick={() => setShowFilter(!showFilter)}
            className="btn btn-light d-flex align-items-center gap-2"
          >
            <i className="bi bi-funnel-fill text-secondary"></i>
            <span>Filter</span>
          </button>
        </div>

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
                Apply
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-muted">กำลังโหลด...</p>
        ) : filteredProducts.length > 0 ? (
          <CatalogGrid
            data={{ results: filteredProducts }}
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
