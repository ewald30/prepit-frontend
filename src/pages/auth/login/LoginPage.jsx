import React from 'react';
import LoginComponent from '../../../components/auth/login/LoginComponent';

const LoginPage = () => {
    return (
        <div className={'login-page'}>
            <div className={'login-page-form'}>
                <LoginComponent/>
            </div>
            <div className={'login-page-graphics'}> 
                Graphics
            </div>
        </div>
    )
}

export default LoginPage;