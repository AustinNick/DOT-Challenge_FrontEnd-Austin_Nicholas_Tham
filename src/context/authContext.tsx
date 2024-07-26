import { createContext, useContext } from "react"
import { User } from "../types/user"

interface AuthContextType {
    user: User | null
    isQuizInProgress: boolean
    loading: boolean
    login: (user: User, token: string) => void
    logout: () => void
    startQuiz: () => void
    finishQuiz: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const useAuthContext = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthProvider")
    }
    return context
}

export { AuthContext, useAuthContext }
