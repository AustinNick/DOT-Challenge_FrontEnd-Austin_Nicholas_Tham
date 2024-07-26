import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"

interface ProtectedRoutesProps {
    children: ReactNode
}

const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
    const { user, isQuizInProgress } = useAuthContext()
    const isAuth = !!user

    if (!isAuth) {
        return <Navigate to="/login" replace />
    }

    if (isQuizInProgress && location.pathname !== "/quiz") {
        return <Navigate to="/quiz" replace />
    }

    return children
}

export default ProtectedRoutes
