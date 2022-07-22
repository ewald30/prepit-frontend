import React from 'react';
import LoginComponent from '../../../components/auth/login/LoginComponent';
import '../../../assets/styles/_shared.scss';
import './LoginPage.scss';
import AnimatedFadeTransition from '../../../components/utils/AnimatedFadeTransition';
import AnimatedTranslateTransition from '../../../components/utils/AnimatedTranslateTransition';

const LoginPage = () => {
    return (
        <div className="login-page">
            <AnimatedFadeTransition>
            <div className='flex-space-around flex-row-center-y login-page-body'>
                    <div className='login-page-form flex-column-center-y'>
                                <LoginComponent/>
                    </div>
                    <div className={'login-page-graphics'}> 
                        <AnimatedFadeTransition>
                            <div className={'text-big text-center text-dark-grey login-page-graphics-text text-bold'}>
                                Start upgrading your meal prepping game!
                            </div>
                        </AnimatedFadeTransition>
                    </div>
                </div>
            </AnimatedFadeTransition>
        </div>
    )
}

export default LoginPage;