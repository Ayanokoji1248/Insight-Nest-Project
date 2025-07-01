import { Navigate, Outlet } from "react-router-dom"
import userStore from "../store/userStore"


const ProtectedRoute = () => {
    const { user } = userStore();
    if (!user || !user._id) {
        return <Navigate to={'/'} replace />
    }
    return (
        <Outlet />
    )
}

export default ProtectedRoute