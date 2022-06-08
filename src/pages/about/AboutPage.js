import {Link} from 'react-router-dom';
import React from 'react'
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition'
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition'

const AboutPage = () => {
    return (
        <div className="login-page">
                <div className='flex-space-around flex-row-center-y login-page-body'>
                    <div className='login-page-form flex-column-center-y'>
                            <AnimatedTranslateTransition>
                                <div style={{'color': '#29474A'}} className='generic-container flex-column-center-x'>
                                    <div className='text-accent text-biggest text-handwriting'>About</div>
                                    <div style={{'margin-top':'1rem'}} className='flex-column-start-x'>
                                        <div className='text-bigger'>
                                            Author: Berla Ewald
                                        </div>
                                        <div className='text-bigger'>
                                            Git profile: <a className='link-underline link-header' href='https://github.com/ewald30'>ewald30</a>
                                        </div>
                                    </div>
                                    <div style={{'margin-top':'1rem'}}className='text-bigger flex-column-start-x'>
                                        Special thanks to:
                                        <div>Illustrations: <a className='link-underline link-header' href='https://undraw.co'>Undraw</a></div>
                                        <div>Icons: <a className='link-underline link-header' href='https://css.gg'>CSS.gg</a></div>

                                    </div>
                                    {/* <a style={{'margin-top':'1rem'}} href="../../assets/user_guide.pdf" download="PrepIt_User_Guide" className="link-header link-underline text-bigger">Download user guide</a> */}
                                </div>
                            </AnimatedTranslateTransition>
                    </div>
                    <div className={'login-page-graphics'}> 
                        <AnimatedFadeTransition>
                            <div className={'text-big text-center text-dark-grey login-page-graphics-text text-bold'}>
                                Thanks for visiting!
                            </div>
                        </AnimatedFadeTransition>
                    </div>
                </div>
        </div>
    )
}

export default AboutPage
