import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'


createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* Public: No userInfo needed */}
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
)
