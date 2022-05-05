import React, { useState } from 'react';
import MealPlanFormComponent from '../../components/mealPlan/MealPlanFormComponent';
import MealSwitcher from '../../components/mealPlan/MealSwitcher';

import '../../assets/styles/_shared.scss';
import './MealPlanPage.scss'

import graphics from'../../assets/svgs/illustrations/undraw_barbeque.svg';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition';
import CardRecipeComponent from '../../components/card/CardRecipeComponent';
import { m } from 'framer-motion';

const MEALS = {
    BREAKFAST : 0,
    LUNCH : 1,
    DINNER : 2,
    MORNING_SNACK : 3,
    AFTERNOON_SNACK : 4
}

const MealPlanState = {
    meals: [],
    selectedMeal : ""
}

const MealPlanPage = () => {
    const [state, setState] = useState(MealPlanState);
    const {meals, selectedMeal} = state;

    function handleSwitchMeal(meal){
        setState({...state, selectedMeal: meal})
    }

    function handleGotRequestedMeals(objects){
        setState({...state, selectedMeal:"BREAKFAST", meals:objects})
    }

    return (
        <div className="meal-plan-page">
            <div className={'flex-space-around flex-row-center-y meal-plan-page'}>
                <div className='meal-plan-page-form'>
                    <AnimatedTranslateTransition>
                        <MealPlanFormComponent handleRenderMeals={handleGotRequestedMeals}/>
                    </AnimatedTranslateTransition>
                </div>
                <div className={meals.length === 0 ? "meal-plan-page-graphics" : "meal-plan-page-recipes"}>
                     
                    {meals.length === 0 && <AnimatedFadeTransition>
                        <img src={graphics}/>
                        <div className={'text-big text-center text-bold text-dark-grey login-page-graphics-text'}>
                            Complete the information and start eating!
                        </div>
                    </AnimatedFadeTransition>}

                    {meals.length !== 0 && <div className={"flex-column-center-x"}>
                        <div className={"flex-row"}>
                            {meals[MEALS[selectedMeal]].map(item => {
                                return <CardRecipeComponent 
                                            image={item.image} 
                                            title={item.title}
                                            description={item.description}
                                            priceRating={item.priceScore}
                                            timeRating={item.timeScore}/>
                            })}
                        </div>
                        <MealSwitcher
                            handleSwitch={handleSwitchMeal}
                            numberOfMeals={meals.length}
                            selectedMeal={selectedMeal}
                        />
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default MealPlanPage;