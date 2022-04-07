import React, {useEffect, useState} from "react";
import { AuthState } from "../../../core/auth";
import { Link } from "react-router-dom";
import login from "../api/index";
import './LoginComponent.scss';
import '../../../assets/styles/_shared.scss';
import logo from '../../../assets/svgs/logo.svg';

const LoginComponent = () => {
    const [state, setState] = useState(AuthState);
    const {email, password, pendingAuth} = state;


    function handleLogin(){
        setState({pendingAuth: true});
        let canceled = false;

        authenticate();
        return () => {
            canceled = false;
        }
        
        async function authenticate(){
            try{
                const response = await login(email, password);
                setState({pendingAuth: false});
    
                console.log(response);
                console.log('pendingAuth: ', pendingAuth)
            } catch (err) {
                setState({authenticationError: err});
                setState({pendingAuth: true});
            }
        }
    }

    


    return (
        <div className={'login-component flex-column-center-x'}>
            <div className={'login-header'}>
                <img className={'logo-rounded'} src={logo}/>
            </div>

            <div className={'login-component-container'}>
                <div className={'login-component-container-body'}>
                    <div className={'login-body-email'}>
                        <input className={'input'} type={'email'} name={'userEmail'} placeholder={'Enter email address'} value={email} onChange={(event)=>{setState({...state, email: event.target.value})}}/>
                    </div>
                    <div className={'login-body-password input-password'} >
                        <input className={'input'} type="password" placeholder={'Enter password'} value={password} onChange={(event)=>{setState({...state, password: event.target.value})}}/>
                        <a id="lnkforget" class="hyperlink" >Forgot</a>
                    </div>
                </div>

                <div className={'login-component-container-footer flex-space-between flex-row-center-y'}>
                    <button className={'login-footer-button button-primary'} onClick={handleLogin}>Login</button>
                    <button className={'login-footer-register button-transparent'} to={'/auth/register'}>Register</button>
                </div>
            </div>
 

            {pendingAuth && <div>PENDING AUTHEENTICATIOON !!!!</div>}
        </div>
    )
}

export default LoginComponent;