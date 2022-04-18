import React from "react";
import RegisterComponent from '../../../components/auth/register/RegisterComponent';
import loginGraphic from '../../../assets/svgs/illustrations/undraw_groceries.svg';
import '../../../assets/styles/_shared.scss';
import './RegisterPage.scss';
import CardRecipeComponent from "../../../components/card/CardRecipeComponent";

const RegisterPage = () => {
    return (
        <div className="register-page">
            <div className={'flex-space-around flex-row-center-y login-page-body'}>
                <div className='login-page-form'>
                    <RegisterComponent/>
                </div>
                <div className={'register-page-graphics'}> 
                    {/* <img src={loginGraphic}/> */}
                    <CardRecipeComponent/>
                </div>
            </div>
        </div>
    )
} 

export default RegisterPage;