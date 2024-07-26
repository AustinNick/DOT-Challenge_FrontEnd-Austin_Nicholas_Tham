import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import LoginPage from "./pages/auth/Login"
import "./App.css"
import NotFoundPage from "./pages/NotFound"
import MainLayout from "./pages/MainLayout"
import HomePage from "./pages/Home"
import QuizPage from "./pages/Quiz"
import ResultPage from "./pages/Result"
import ProtectedRoutes from "./routes/ProtectedRoutes"
import { useAuthContext } from "./context/authContext"

function App() {
    const { user, loading, logout } = useAuthContext()

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout onLogout={logout} />}>
                    <Route
                        path="login"
                        element={
                            user ? (
                                <Navigate to="/home" replace />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />
                    <Route
                        index
                        element={
                            <ProtectedRoutes>
                                <HomePage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="home"
                        element={
                            <ProtectedRoutes>
                                <HomePage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="quiz"
                        element={
                            <ProtectedRoutes>
                                <QuizPage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route
                        path="results"
                        element={
                            <ProtectedRoutes>
                                <ResultPage />
                            </ProtectedRoutes>
                        }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
