import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../context/AuthContext";

function GuestLayout() {
    const { user } = useAuthContext()
    return !user? <Outlet/> : <Navigate to="/"/>
}

export default GuestLayout
