import React, { useState } from 'react';
import '../../assets/styles/_shared.scss'
import './MealPlanFormComponent.scss';

const checkedStyle = { 
    "color" : "white",
    "background-color": "#29474a",
} 

const MEALS = {
    BREAKFAST : 'BREAKFAST',
    LUNCH : 'LUNCH',
    DINNER : 'DINNER',
    MORNING_SNACK : 'MORNING_SNACK',
    AFTERNOON_SNACK : 'AFTERNOON_SNACK'
}

const MealSwitcher = (props) => {
    const {handleSwitch, numberOfMeals, selectedMeal} = props;

    if (numberOfMeals === 3){
        return (
            <div className={'generic-multiple-option-toggle meal-switcher'}>
                <button style={ selectedMeal == MEALS.BREAKFAST? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.BREAKFAST)}>Breakfast</button>
                {(selectedMeal === MEALS.MORNING_SNACK || selectedMeal === '' || selectedMeal === MEALS.AFTERNOON_SNACK) && <div>|</div>}
                <button style={ selectedMeal == MEALS.LUNCH? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.LUNCH)}>Lunch</button>
                {(selectedMeal === MEALS.MORNING_SNACK || selectedMeal === '' || selectedMeal === MEALS.AFTERNOON_SNACK) && <div>|</div>}
                <button style={ selectedMeal == MEALS.DINNER? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.DINNER)}>Dinner</button>
        </div>
        )
    }

    if (numberOfMeals === 4){
        return (
            <div className={'generic-multiple-option-toggle meal-switcher'}>
                <button style={ selectedMeal == MEALS.BREAKFAST? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.BREAKFAST)}>Breakfast</button>
                {(selectedMeal === '' || selectedMeal === MEALS.AFTERNOON_SNACK) && <div>|</div>}
                <button style={ selectedMeal == MEALS.MORNING_SNACK? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.MORNING_SNACK)}>Morning Snack</button>
                {(selectedMeal === '' || selectedMeal === MEALS.AFTERNOON_SNACK) && <div>|</div>}
                <button style={ selectedMeal == MEALS.LUNCH? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.LUNCH)}>Lunch</button>
                {(selectedMeal === '' || selectedMeal === MEALS.AFTERNOON_SNACK) && <div>|</div>}
                <button style={ selectedMeal == MEALS.DINNER? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.DINNER)}>Dinner</button>
        </div>
        )
    }

    if (numberOfMeals === 5){
        return (
            <div className={'generic-multiple-option-toggle meal-switcher'}>
                <button style={ selectedMeal == MEALS.BREAKFAST? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.BREAKFAST)}>Breakfast</button>
                {(selectedMeal === '') && <div>|</div>}
                <button style={ selectedMeal == MEALS.MORNING_SNACK? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.MORNING_SNACK)}>Morning Snack</button>
                {(selectedMeal === '') && <div>|</div>}
                <button style={ selectedMeal == MEALS.LUNCH? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.LUNCH)}>Lunch</button>
                {(selectedMeal === '') && <div>|</div>}
                <button style={ selectedMeal == MEALS.AFTERNOON_SNACK? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.AFTERNOON_SNACK)}>Afternoon Snack</button>
                {(selectedMeal === '') && <div>|</div>}
                <button style={ selectedMeal == MEALS.DINNER? checkedStyle : {"background-color":"white"}} onClick={() => handleSwitch(MEALS.DINNER)}>Dinner</button>
            </div>
        )
    }
}

export default MealSwitcher;