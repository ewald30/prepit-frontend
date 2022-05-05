import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import Header from './components/header/Header';
import MealPlanPage from './pages/mealPlan/MealPlanPage';
import { useState } from 'react';

function App() {
  const [animated, setAnimation] = useState(true);

  return (
    <div className={animated? 'blur app-animated' : 'blur'}>
      <BrowserRouter>
        <div className={'app'}>
          <Header/>

          <Routes>
            <Route path="/auth/login" element={ <LoginPage/> } />
            <Route path="/auth/register" element={ <RegisterPage/> } />
            <Route path="/meal-plan" element={ <MealPlanPage/> } />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
