import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppWithAuth from "./AppWithAuthen.jsx";

// 🟢 Public pages
import Home from "./pages/Home.jsx";
import Category from "./pages/Category.jsx";
import CategoryProducts from "./pages/CategoryProducts.jsx";
import Products from "./pages/Products.jsx";
import Login from "./pages/LogIn.jsx";
import Search from "./pages/Search.jsx";
import Register from "./pages/Register.jsx";
import AdminRegister from "./pages/Admin/AdminRegister.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      {/* 🔓 Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/category" element={<Category />} />
      <Route path="/category/:categoryName" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminRegister" element={<AdminRegister />} />

      {/* 🔒 Protected routes */}
      <Route path="*" element={<AppWithAuth />} />
    </Routes>
  </Router>
);