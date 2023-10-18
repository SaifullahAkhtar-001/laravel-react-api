import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../context/AuthContext";

function GuestLayout() {
    const { isLogin } = useAuthContext()
    return !isLogin? <Outlet/> : <Navigate to="/"/>
}

export default GuestLayout
