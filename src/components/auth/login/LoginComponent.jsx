import React, {useState} from "react";
import { AuthState } from "../../../core/auth";
import { Link } from "react-router-dom";
import login from "../api/index";

const LoginComponent = () => {
    const [state, setState] = useState(AuthState);
    const {email, password} = state;

    async function handleLogin(){
        console.log("Login: ", email, password);
        try{
            const response = await login(email, password);
        } catch (err) {
            console.log("err")
        }
    }


    return (
        <div className={'login'}>
            <div className={'login-header'}>
                Logo
            </div>

            <div className={'login-body'}>
                <div className={'login-body-email'}>
                    <input type={'email'} name={'userEmail'} placeholder={'Enter your email address'} value={email} onChange={(event)=>{setState({...state, email: event.target.value})}}/>
                </div>
                <div className={'login-body-password'}>
                    <input type="password" placeholder={'Enter your password'} value={password} onChange={(event)=>{setState({...state, password: event.target.value})}}/>
                </div>
            </div>
 
            <div className={'login-footer'}>
                <button className={'login-footer-button'} onClick={handleLogin}>Login</button>
                <Link className={'login-footer-register'} to={'/auth/register'}>Register</Link>
            </div>
        </div>
    )
}

export default LoginComponent;