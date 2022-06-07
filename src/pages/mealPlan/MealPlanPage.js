import React, { useState } from 'react';
import MealPlanFormComponent from '../../components/mealPlan/MealPlanFormComponent';
import MealSwitcher from '../../components/mealPlan/MealSwitcher';

import '../../assets/styles/_shared.scss';
import './MealPlanPage.scss'

import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition';
import CardRecipeComponent from '../../components/card/CardRecipeComponent';
import { MealPlanPageState } from '../../core/mealPlan';
import MealModal from '../../components/mealModal/MealModal';
import CollectionsComponent from '../../components/collections/CollectionsComponent';
import Modal from '../../components/modal/Modal';
import { createCollection, saveMealToCollection, getCollections } from '../../api/collection/collectionApi';
import { BeatLoader, ClimbingBoxLoader } from 'react-spinners';
import CollectionCreateModal from '../../components/collectionCreateModal/CollectionCreateModal';
import { authRequestWrapper } from '../../api/auth/auth';

const MEALS = {
    BREAKFAST : 0,
    LUNCH : 1,
    DINNER : 2,
    MORNING_SNACK : 3,
    AFTERNOON_SNACK : 4
}


const MealPlanPage = () => {
    const [state, setState] = useState(MealPlanPageState);
    const {meals, selectedMeal, selectedRecipe, modalOpen, collectionModalOpen, selectedCollection, loadingSaveMeal, collectionCreationModalOpen} = state;

    // CHANGE BACKEND TO RETURN COLLECTION ID!!!!!!!!
    // pass button for save for collection modal
    // pass 2 inputs for name and description
    // if two inputs !== null, change button from save to create
    // two handlers, one for create one for save? maybe not required since backend is the same

    function handleSwitchMeal(meal){
        setState({...state, selectedMeal: meal})
    }

    function handleCreateNewCollection(title, description){
        setState({...state, collectionCreationModalOpen: false, loadingSaveMeal: true})

        console.log("TITLE, DESCRIPTION", title, description)
        createNewCollection(title, description);

        async function createNewCollection(title, description){
            try{
                const createCollectionWrapped = authRequestWrapper(createCollection)        // wrapper that handles the refresh jwt token
                const response = await createCollectionWrapped(title, description);
                setState({...state, loadingSaveMeal: false, collectionCreationModalOpen: false,})
                handleGetCollections(selectedRecipe);
            } catch (error){
                console.error(error);
                setState({...state, loadingSaveMeal: false, collectionCreationModalOpen: false,})

            }
        }
    }

    function handleSelectCollection(collection){
        if (!collection){
            console.log("create new");
            return;
        }
        setState({...state, selectedCollection: collection})
        console.log("selected: ", collection)
    }

    function handleGetCollections(meal){
        
        // add loading indicator
        const token =  localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        getCollectionsForUser();


        async function getCollectionsForUser(){
            const getCollectionsWrapped = authRequestWrapper(getCollections);
            const response = await getCollectionsWrapped(token, userInfo.id)
            setState({...state, collections: response, collectionModalOpen: true, modalOpen: false, selectedRecipe: meal, collectionCreationModalOpen: false})

        }
    }

    function handleSaveMealToCollection(){
        const token =  localStorage.getItem('token');
        setState({...state, loadingSaveMeal: true});
        saveMeal();

        async function saveMeal(){
            try{
                const saveMealToCollectionWrapper = authRequestWrapper(saveMealToCollection);
                await saveMealToCollectionWrapper(token, selectedCollection.collectionId, selectedCollection.name,selectedCollection.description,selectedRecipe)

                setState({...state, loadingSaveMeal: false});
                handleGetCollections(selectedRecipe);
            } catch (err) {
                console.log("error:  ", err);
                setState({...state, loadingSaveMeal: false});
            }
        }
    }

    function handleGotRequestedMeals(objects){
        const container = document.querySelector('.meal-plan-page');
        container.scrollBy({
            top: 700,
            left: 0,
            behavior: 'smooth'
          });
        setState({...state, selectedMeal:"BREAKFAST", meals:objects})
    }
    
    console.log("loading: ", collectionCreationModalOpen)

    return (
        <div className="meal-plan-page">
            <div className={'flex-space-around flex-row-center-y meal-plan-page-container'}>
                <div className='meal-plan-page-form flex-column-center-y'>
                    <AnimatedTranslateTransition>
                        <MealPlanFormComponent handleRenderMeals={handleGotRequestedMeals}/>
                    </AnimatedTranslateTransition>
                </div>
                <div className={meals.length === 0 ? "meal-plan-page-graphics" : "meal-plan-page-recipes"}>
                     
                    {meals.length === 0 && <AnimatedFadeTransition>
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
                                            priceRating={item.price_score}
                                            timeRating={item.time_score}
                                            />
                                        </div>
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

            
            {modalOpen && <MealModal open={modalOpen} item={selectedRecipe} onClose={() => setState({...state, modalOpen: false})} onSave={handleGetCollections} />}
            {collectionModalOpen && 
                <Modal open={collectionModalOpen} onClose={() => setState({...state, collectionModalOpen: false})}>
                    <div className="modal-save-meal flex-column-center-x">
                        <div className='modal-save-meal-collections'>
                            <CollectionsComponent collections={state.collections} 
                                                    onSelectCollection={handleSelectCollection} 
                                                    onCreateNewCollection={() => {setState({...state, collectionCreationModalOpen: true})}}
                                                    selectedCollection={state.selectedCollection}
                                                    />
                        </div>
                        <div className="modal-save-meal-buttons">
                            {loadingSaveMeal?<BeatLoader width={150} height={5} color={'#29474A'} loading={true} /> : <button className='button-primary' onClick={() => handleSaveMealToCollection()}>Save meal</button>}
                        </div>
                    </div>
                </Modal>}

                {collectionCreationModalOpen && <CollectionCreateModal open={collectionCreationModalOpen} onClose={() => {setState({...state, collectionCreationModalOpen: false})}} onSave={handleCreateNewCollection}/>}
        </div>
    )
}

export default MealPlanPage;