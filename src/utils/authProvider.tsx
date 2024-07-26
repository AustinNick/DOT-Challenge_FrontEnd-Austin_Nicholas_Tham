import { ReactNode, useEffect, useState } from "react"
import { User } from "./../types/user"
import { AuthContext } from "./../context/authContext"

interface AuthProviderProps {
    children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [isQuizInProgress, setIsQuizInProgress] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }

        const savedState = localStorage.getItem("quizState")
        if (savedState) {
            const parsedState = JSON.parse(savedState)
            if (parsedState?.questions?.length) {
                setIsQuizInProgress(true)
            }
        }

        setLoading(false)
    }, [])

    const login = (user: User, token: string) => {
        setUser(user)

        localStorage.setItem("user", JSON.stringify(user))
        localStorage.setItem("token", token)
    }

    const logout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        localStorage.removeItem("quizState")

        setUser(null)
        setIsQuizInProgress(false)
    }

    const startQuiz = () => {
        setIsQuizInProgress(true)
    }

    const finishQuiz = () => {
        localStorage.removeItem("quizState")

        setIsQuizInProgress(false)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isQuizInProgress,
                loading,
                login,
                logout,
                startQuiz,
                finishQuiz
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider }
