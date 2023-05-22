import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import Layout from './components/Layout/Layout';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import MovieDetail from './components/views/MovieDetail/MovieDetail';

function App() {
  /**
   * null: 아무나 출입이 가능한 페이지
   * true: 로그인한 유저만 출입이 가능한 페이지
   * false: 로그인한 유저는 출입이 불가능한 페이지
   */
  const AuthenticLandingPage = Auth(LandingPage, null);
  const AuthenticLoginPage = Auth(LoginPage, false);
  const AuthenticRegisterPage = Auth(RegisterPage, false);
  const AuthenticMovieDetail = Auth(MovieDetail, null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticLandingPage />} />
        <Route path="/login" element={<AuthenticLoginPage />} />
        <Route path="/register" element={<AuthenticRegisterPage />} />
        <Route path="/movie/:movieId" element={<AuthenticMovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
