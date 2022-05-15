import logo from './logo.svg';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.scss';
import LoginPage from './pages/auth/login/LoginPage';
import RegisterPage from './pages/auth/register/RegisterPage';
import Header from './components/header/Header';
import MealPlanPage from './pages/mealPlan/MealPlanPage';
import { useState } from 'react';
import SavedMealsPage from './pages/savedMeals/SavedMealsPage';
import MyProfile from './pages/myProfile/MyProfilePage';

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
            <Route path="/auth/my-profile" element={ <MyProfile/> } />

            <Route path="/meal/meal-plan" element={ <MealPlanPage/> } />
            <Route path="/meal/saved-meals" element={<SavedMealsPage/>}/>

            <Route path='/' element={<Navigate to='/auth/login' replace />} />
          </Routes>

        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
