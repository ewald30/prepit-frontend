import React from 'react'
import Modal from '../modal/Modal'
import stopwatch from '../../assets/svgs/icons/stopwatch_grey.svg'
import refrigerator from '../../assets/svgs/icons/refrigerator.svg';
import dollar from '../../assets/svgs/icons/dollar_grey.svg';
import bowl from '../../assets/svgs/icons/bowl.svg';
import chart from '../../assets/svgs/icons/chart.svg';
import timer from '../../assets/svgs/icons/timer.svg';
import tag from '../../assets/svgs/icons/tag.svg';
import './MealModal.scss';
import MealModalInfo from './MealModalInfo';

export default function MealModal(props) {
    const {item, onClose, open} = props;
    const instructions = item.instructions.split('|');
    const ingredients = item.ingredients.split('|');
    const nutritionInfo = item.nutritionInfo.split('|');

    return (
        <Modal open={open} onClose={onClose}>
            <div  className="meal-modal flex-row flex-space-between">
                <div className='meal-modal-left'>
                    <div className='meal-modal-left-image'>
                        <img src={item.image}/>
                    </div>
                    <div className='meal-modal-left-info'>
                        {item.prepTime && <MealModalInfo icon={refrigerator} label={'Preparation Time'} info={item.prepTime}/>}
                        {item.cookTime && <MealModalInfo icon={timer} label={'Cook Time'} info={item.cookTime}/>}
                        {item.timeScore && <MealModalInfo icon={stopwatch} label={'Time score'} info={`${item.timeScore} / 5`}/>}
                        {item.priceScore && <MealModalInfo icon={dollar} label={'Price score'} info={`${item.priceScore} / 5`}/>}
                        {item.kcalories && <MealModalInfo icon={chart} label={"Calories"} info={item.kcalories}/>}
                        {item.serving && <MealModalInfo icon={bowl} label={'Serving'} info={item.serving}/>} 
                        {item.type && <MealModalInfo icon={tag} label={'Type'} info={item.type}/>}
                    </div>
                </div>
                <div className='meal-modal-right'>
                    <div className='meal-modal-right-title text-bigger text-bold text-darkest-grey'>
                        {item.title}
                    </div>
                    <div className='meal-modal-right-description text-bigger text-dark-grey'>
                        {item.description}
                    </div>
                    <div className='meal-modal-right-instructions text-normal-2 text-dark-grey'> 
                        <div className='text-bigger' style={{'marginBottom':'0.5rem'}}>Instructions: </div>
                        {instructions.map((instruction) => {
                            return <div style={{'margin-bottom': '1rem'}}> {instruction} </div>
                        })}
                    </div>
                    <div className='meal-modal-right-ingredients text-normal-2 text-dark-grey'> 
                        <div className='text-bigger' style={{'marginBottom':'0.5rem'}}>Ingredients: </div>
                        {ingredients.map((ingredient) => {
                            return <div className='meal-modal-right-ingredient'> - {ingredient} </div>
                        })}
                    </div>
                    <div className='meal-modal-right-nutrition text-normal-2 text-dark-grey'> 
                        <div className='text-bigger' style={{'marginBottom':'0.5rem'}}>Nutritional Info: </div>
                        {nutritionInfo.map((object) => {
                            return <div className='meal-modal-right-nutrition-info'> - {object} </div>
                        })}
                    </div>
                    <div className='meal-modal-right-author text-normal-2 text-dark-grey'>
                        Author: {item.author}
                    </div>
                </div>
            </div>
        </Modal>
    )
}
