import React, { useState } from 'react';
import MealPlanFormComponent from '../../components/mealPlan/MealPlanFormComponent';
import MealSwitcher from '../../components/mealPlan/MealSwitcher';

import '../../assets/styles/_shared.scss';
import './MealPlanPage.scss'

import graphics from'../../assets/svgs/illustrations/undraw_barbeque.svg';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition';
import CardRecipeComponent from '../../components/card/CardRecipeComponent';
import { MealPlanPageState } from '../../core/mealPlan';
import MealModal from '../../components/mealModal/MealModal';

const MEALS = {
    BREAKFAST : 0,
    LUNCH : 1,
    DINNER : 2,
    MORNING_SNACK : 3,
    AFTERNOON_SNACK : 4
}


const MealPlanPage = () => {
    const [state, setState] = useState(MealPlanPageState);
    const {meals, selectedMeal, selectedRecipe, modalOpen} = state;

    function handleSwitchMeal(meal){
        setState({...state, selectedMeal: meal})
    }

    function handleGotRequestedMeals(objects){
        const container = document.querySelector('.meal-plan-page');
        console.log(container);
        container.scrollBy({
            top: 700,
            left: 0,
            behavior: 'smooth'
          });
        setState({...state, selectedMeal:"BREAKFAST", meals:objects})
    }

    return (
        <div className="meal-plan-page">
            <div className={'flex-space-around flex-row-center-y meal-plan-page-container'}>
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

                    {meals.length !== 0 && <div className={"flex-column-center-x meal-plan-page-result"}>
                        <div className={"flex-row meal-plan-page-result-container"}>
                            {meals[MEALS[selectedMeal]].map(item => {
                                return <div className={'meal-plan-page-result-container-recipe'} onClick={() => {setState({...state, selectedRecipe: item, modalOpen: true})}}>
                                            <CardRecipeComponent 
                                            image={item.image} 
                                            title={item.title}
                                            description={item.description}
                                            priceRating={item.priceScore}
                                            timeRating={item.timeScore}
                                            />
                                        </div>
                            })}
                        </div>
                        <MealSwitcher
                            handleSwitch={handleSwitchMeal}
                            numberOfMeals={meals.length}
                            selectedMeal={selectedMeal}
                            className={'meal-switcher'}
                        />
                    </div>}

                </div>
            </div>
            {modalOpen && <MealModal open={modalOpen} item={selectedRecipe} onClose={() => setState({...state, modalOpen: false})}/>}
        </div>
    )
}

export default MealPlanPage;