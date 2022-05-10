import React, { useState } from "react";
import RegisterComponent from '../../../components/auth/register/RegisterComponent';
import registerGraphic from '../../../assets/svgs/illustrations/undraw_unlock.svg';
import mailbox from '../../../assets/svgs/illustrations/undraw_mailbox.svg';
import '../../../assets/styles/_shared.scss';
import './RegisterPage.scss';
import CardRecipeComponent from "../../../components/card/CardRecipeComponent";
import AnimatedFadeTransition from '../../../components/utils/AnimatedFadeTransition';
import AnimatedTranslateTransition from '../../../components/utils/AnimatedTranslateTransition';
import Modal from "../../../components/modal/Modal";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    function handleModalEvent(value){
        setIsOpen(value);
    }

    function handleModalOnClose(){
        setIsOpen(false);
        navigate('/auth/login');
    }

    return (
        <div className="register-page">
                <div className={'flex-space-around flex-row-center-y login-page-body'}>
                    <div className='register-page-form flex-column-center-y'>
                        <AnimatedTranslateTransition>
                            <RegisterComponent handleModalEvent={handleModalEvent} />
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

                {isOpen && <Modal open={isOpen} onClose={() => {handleModalOnClose()}}>
                        <div>
                            <img src={mailbox} />
                            <div style={{'margin-top': '2rem'}} className={'text-bigger text-center text-bold'}> Please check your mailbox to verify your email address</div>
                        </div>
                    </Modal>}
        </div>
    )
} 

export default RegisterPage;