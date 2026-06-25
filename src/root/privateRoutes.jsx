import { Navigate, useNavigate } from "react-router-dom"

const PrivateRoutes = function ({ children }) {
    const token = localStorage.getItem("token")
    return token ? children : <Navigate to={"/sign-in"} replace />
}

export default PrivateRoutes