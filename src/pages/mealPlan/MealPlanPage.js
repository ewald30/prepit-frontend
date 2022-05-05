import React from 'react';
import MealPlanFormComponent from '../../components/mealPlan/MealPlanFormComponent';
import '../../assets/styles/_shared.scss';
import './MealPlanPage.scss'

import graphics from'../../assets/svgs/illustrations/undraw_barbeque.svg';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition';


const MealPlanPage = () => {
    return (
        <div className="meal-plan-page">
            <div className={'flex-space-around flex-row-center-y meal-plan-page'}>
                <div className='meal-plan-page-form'>
                    <AnimatedTranslateTransition>
                        <MealPlanFormComponent/>
                    </AnimatedTranslateTransition>
                </div>
                <div className={'meal-plan-page-graphics'}> 
                    <AnimatedFadeTransition>
                        <img src={graphics}/>
                        <div className={'text-big text-center text-bold text-dark-grey login-page-graphics-text'}>
                            Complete the information and start eating!
                        </div>
                    </AnimatedFadeTransition>
                </div>
            </div>
        </div>
    )
}

export default MealPlanPage;