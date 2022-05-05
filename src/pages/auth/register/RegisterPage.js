import React from "react";
import RegisterComponent from '../../../components/auth/register/RegisterComponent';
import registerGraphic from '../../../assets/svgs/illustrations/undraw_unlock.svg';
import '../../../assets/styles/_shared.scss';
import './RegisterPage.scss';
import CardRecipeComponent from "../../../components/card/CardRecipeComponent";
import AnimatedFadeTransition from '../../../components/utils/AnimatedFadeTransition';
import AnimatedTranslateTransition from '../../../components/utils/AnimatedTranslateTransition';

const RegisterPage = () => {
    return (
        <div className="register-page">
                <div className={'flex-space-around flex-row-center-y login-page-body'}>
                    <div className='login-page-form'>
                        <AnimatedTranslateTransition>
                            <RegisterComponent/>
                        </AnimatedTranslateTransition>
                    </div>
                    <div className={'register-page-graphics'}> 
                        <AnimatedFadeTransition>
                            <img src={registerGraphic}/>
                            <div className={'text-big text-center text-bold text-dark-grey login-page-graphics-text'}>
                                Unlock the full experience of meal prepping!
                            </div>
                        </AnimatedFadeTransition>
                    </div>
                </div>
        </div>
    )
} 

export default RegisterPage;