import React from 'react';
import LoginComponent from '../../../components/auth/login/LoginComponent';
import loginGraphic from '../../../assets/svgs/undraw-login.svg';
import '../../../assets/styles/_shared.scss';
import './LoginPage.scss';

const LoginPage = () => {
    return (
        <div className="login-page">
            <div className={'flex-space-around flex-row-center-y login-page-body'}>
                <div className='login-page-form'>
                    <LoginComponent/>
                </div>
                <div className={'login-page-graphics'}> 
                    <img src={loginGraphic}/>
                    <div className={'text-big text-center text-bolder text-dark-grey login-page-graphics-text text-handwriting'}>
                        Start upgrading your meal prepping game!
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;