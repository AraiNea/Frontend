import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Category from './pages/Category.jsx';
import CategoryProducts from "./pages/CategoryProducts.jsx";
import Products from './pages/Products.jsx'
import Login from "./pages/LogIn.jsx";
import Search from "./pages/Search.jsx";
import ProductsManage from "./pages/Admin/ProductsManage.jsx";
import Register from "./pages/Register.jsx";
import AdminRegister from "./pages/Admin/AdminRegister.jsx";
import Profile from "./pages/Profile.jsx";
import AdminProfile from "./pages/Admin/AdminProfile.jsx";
import Cart from "./pages/Cart.jsx";
import UpdateAddress from "./pages/Address.jsx";
import TrackOrder from "./pages/TrackOrder.jsx";
import OrderDetail from "./pages/OrderDetail.jsx";

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* Public: No userInfo needed */}
      <Route path="/" element={<Home />} />
      <Route path="/category/" element={<Category />} />
      <Route path="/category/:categoryName" element={<CategoryProducts />} />
      <Route path="/product/:id" element={<Products />} />
      <Route path="/search" element={<Search />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminRegister" element={<AdminRegister />} />

      {/* userInfo needed */}
      <Route path="/profile" element={<Profile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/updateAddress" element={<UpdateAddress />} />
      <Route path="/trackOrder" element={<TrackOrder />} />
      <Route path="/orderDetail/:orderId" element={<OrderDetail />} />

      {/* adminInfo needed */}
      <Route path="/ProductsManagement" element={<ProductsManage />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
    </Routes>
  </Router>
)
