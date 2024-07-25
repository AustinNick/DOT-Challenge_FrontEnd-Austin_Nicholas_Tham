import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

interface ProtectedRoutesProps {
    children: ReactNode
    isAuth: boolean
    isContinue: boolean
}

const ProtectedRoutes = ({ children, isAuth, isContinue }: ProtectedRoutesProps) => {
    if (!isAuth) {
        return <Navigate to={isContinue ? '/quiz' : '/login'} replace />
    }

    return children
}

export default ProtectedRoutes