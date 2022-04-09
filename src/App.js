import logo from './logo.svg';
import { Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/auth/login/LoginPage';
import Header from './components/header/Header';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header/>

        <Routes>
          <Route path="/auth/login" element={ <LoginPage/> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
