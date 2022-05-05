import React from 'react';
import LoginComponent from '../../../components/auth/login/LoginComponent';
import loginGraphic from '../../../assets/svgs//illustrations/undraw_cookie.svg';
import '../../../assets/styles/_shared.scss';
import './LoginPage.scss';
import AnimatedFadeTransition from '../../../components/utils/AnimatedFadeTransition';
import AnimatedTranslateTransition from '../../../components/utils/AnimatedTranslateTransition';

const LoginPage = () => {
    return (
        <div className="login-page">
                <div className={'flex-space-around flex-row-center-y login-page-body'}>
                    <div className='login-page-form'>
                            <AnimatedTranslateTransition>
                                <LoginComponent/>
                            </AnimatedTranslateTransition>
                    </div>
                    <div className={'login-page-graphics'}> 
                        <AnimatedFadeTransition>
                            <img src={loginGraphic}/>
                            <div className={'text-big text-center text-bold text-dark-grey login-page-graphics-text'}>
                                Start upgrading your meal prepping game!
                            </div>
                        </AnimatedFadeTransition>
                    </div>
                </div>
        </div>
    )
}

export default LoginPage;