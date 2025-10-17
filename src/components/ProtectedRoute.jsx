import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./context/UserContext";

export default function ProtectedRoute({ allowedRoles, children }) {
    const { userInfo } = useContext(UserContext);

    // ⏳ กำลังโหลด session
    if (userInfo === undefined) return null;

    // ❌ ถ้าไม่ได้ login → กลับหน้า login
    if (userInfo === null) {
        return <Navigate to="/login" replace />;
    }

    // ❌ ถ้าไม่มี role ที่อนุญาต
    if (allowedRoles && !allowedRoles.includes(userInfo.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
