import logo from './logo.svg';
import './App.css';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={ <LoginPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
