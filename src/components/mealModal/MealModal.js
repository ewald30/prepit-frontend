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
import { useSelector } from 'react-redux';

export default function MealModal(props) {
    const {item, onClose, open, onSave} = props;
    const instructions = item.instructions.split('|');
    const ingredients = item.ingredients.split('|');
    const loggedIn = useSelector(state => state.auth.loggedIn);


    let nutritionInfo = item.nutritions_info.split('|');
    nutritionInfo = nutritionInfo.map(element => {
        console.log(element)
        element = element.replace(':', ": ")    // add a space after :
        element = element.replace('C', ' c')    // replace camel case on Content
        element = element.replace('F', ' f')    // replace camel case on FatContent
        return element;
    });

    return (
        <Modal open={open} onClose={onClose}>
            <div  className="meal-modal flex-row flex-space-between">
                <div className='meal-modal-left'>
                    <div className='meal-modal-left-image'>
                        <img src={item.image}/>
                    </div>
                    <div className='meal-modal-left-info'>
                        {item.prep_time && <MealModalInfo icon={refrigerator} label={'Preparation Time'} info={item.prep_time}/>}
                        {item.cook_time && <MealModalInfo icon={timer} label={'Cook Time'} info={item.cook_time}/>}
                        {item.time_score && <MealModalInfo icon={stopwatch} label={'Time score'} info={`${item.time_score} / 5`}/>}
                        {/* {item.price_score && <MealModalInfo icon={dollar} label={'Price score'} info={`${item.price_score} / 5`}/>} */}
                        {item.calories && <MealModalInfo icon={chart} label={"Calories"} info={item.calories}/>}
                        {item.serving && <MealModalInfo icon={bowl} label={'Serving'} info={item.serving}/>} 
                        {item.type && <MealModalInfo icon={tag} label={'Type'} info={item.type}/>}
                        {loggedIn && <div className="meal-save">
                            <button className={'button-transparent text-normal meal-save-button'} onClick={() => {onSave(item)}}>Save</button>
                        </div>}
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
