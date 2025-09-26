import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx';
import Products from './pages/Products.jsx'
import Login from "./pages/LogIn.jsx";
import Search from "./pages/Search.jsx";


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* Public: No userInfo needed */}
      <Route path="/" element={<Home />} />
      <Route path="/category/" element={<Category />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </Router>
)
