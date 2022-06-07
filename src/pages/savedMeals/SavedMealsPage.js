import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { authRequestWrapper } from '../../api/auth/auth';
import { getSavedMeals } from '../../api/collection/collectionApi';
import CardRecipeComponent from '../../components/card/CardRecipeComponent';
import MealModal from '../../components/mealModal/MealModal';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import { SavedMealsState } from '../../core/savedMeals';
import './SavedMealsPage.scss';

const SavedMealsPage = () => {
    const [state, setState] = useState(SavedMealsState);
    const {meals, selectedRecipe, modalOpen} = state

    const selectedCollection = useSelector(state => state.collection.selectedCollection);
    const {name, description, id} = selectedCollection;
    

    useEffect(() => {
        getMeals();

        async function getMeals(){
            const getSavedMealsWrapper = authRequestWrapper(getSavedMeals);
            const response  = await getSavedMealsWrapper(id);
            setState({...state, meals: response.containedMeals})        }
    }, [])

    console.log(meals);

    return (
        <div className='saved-meals flex-column-center-y flex-column-center-x'>
            <AnimatedTranslateTransition>
                <div className='saved-meals-container generic-container'>
                    <div className='saved-meals-container-header flex-space-between flex-row-center-y'>
                        <div>
                            <div className='saved-meals-container-title text-big'>{name}</div>
                            <div className='saved-meals-container-description text-normal'>{description}</div>
                        </div>
                        <div>
                            {meals.length} items saved
                        </div>
                    </div>

                    <div className='saved-meals-container-items'>
                        {meals.length !== 0 && <div className={"flex-column-start-x saved-meals-container-items-result"}>
                                <div className={"saved-meals-container-items-result-container grid"}>
                                    {meals.map(item => {
                                        return <div className={'saved-meals-container-items-result-container-recipe col'} onClick={() => {setState({...state, selectedRecipe: item, modalOpen: true})}}>
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
                        </div>}
                    </div>
                </div>
            </AnimatedTranslateTransition>
            {modalOpen && <MealModal open={modalOpen} item={selectedRecipe} onClose={() => setState({...state, modalOpen: false})}/>}

        </div>
    )
}

export default SavedMealsPage;
