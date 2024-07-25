import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import LoginPage from './pages/auth/Login'
import './App.css'
import NotFoundPage from './pages/NotFound'
import MainLayout from './pages/MainLayout'
import HomePage from './pages/Home'
import QuizPage from './pages/Quiz'
import { user as UserType } from './types/user'
import ResultPage from './pages/Result'
import ProtectedRoutes from './routes/ProtectedRoutes'

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [isQuizInProgress, setIsQuizInProgress] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setIsLoggedin(true)
    }

    const savedState = localStorage.getItem('quizState')

    if (savedState) {
      const parsedState = JSON.parse(savedState)

      if (parsedState && parsedState.questions && parsedState.questions.length !== 0) {
        setIsQuizInProgress(true)
      } else {
        setIsQuizInProgress(false)
      }
    } else {
      setIsQuizInProgress(false)
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('quizState')
    window.location.reload()
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout user={user} onLogout={logout} />}>
          <Route path="login" element={user ? <Navigate to="/home" replace /> : <LoginPage />} />
          <Route
            index
            element={
              <ProtectedRoutes isAuth={isLoggedin} isContinue={isQuizInProgress}>
                <HomePage user={user} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="home"
            element={
              <ProtectedRoutes isAuth={isLoggedin} isContinue={isQuizInProgress}>
                <HomePage user={user} />
              </ProtectedRoutes>
            }
          />
          <Route
            path="quiz"
            element={
              <ProtectedRoutes isAuth={isLoggedin} isContinue={isQuizInProgress}>
                <QuizPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="results"
            element={
              <ProtectedRoutes isAuth={isLoggedin} isContinue={isQuizInProgress}>
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
