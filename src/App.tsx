import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoginPage from './pages/auth/Login';
import './App.css';
import NotFoundPage from './pages/NotFound';
import MainLayout from './pages/MainLayout';
import HomePage from './pages/Home';
import QuizPage from './pages/Quiz';
import { user as UserType } from './types/user';
import ResultPage from './pages/Result';

function App() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const savedState = localStorage.getItem('quizState')

    if (savedState) {
      const parsedState = JSON.parse(savedState)

      if (parsedState && parsedState.questions && parsedState.questions.length !== 0) {
        window.location.href = '/quiz'
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout user={user} onLogout={logout} />}>
          <Route path="login" element={user ? <Navigate to="/home" /> : <LoginPage />} />
          <Route index element={<Navigate to={user ? "/home" : "/login"} />} />
          <Route path="home" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
          <Route path="quiz" element={user ? <QuizPage /> : <Navigate to="/login" />} />
          <Route path="results" element={user ? <ResultPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
