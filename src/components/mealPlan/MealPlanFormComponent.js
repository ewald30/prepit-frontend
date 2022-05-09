import React, {useState, useEffect} from "react";
import '../../assets/styles/_shared.scss';
import './MealPlanFormComponent.scss';
import { MealPlanComponentState } from "../../core/mealPlan";
import generateMealPlan from "../../api/mealPlan/mealPlanApi";

import profile from '../../assets/svgs/icons/profile.svg';
import ruler from '../../assets/svgs/icons/ruler.svg';
import scale from '../../assets/svgs/icons/calendar-two.svg';
import logo from '../../assets/svgs/logo_iconOnly.svg';
import select from '../../assets/svgs/icons/select-o.svg';
import { BarLoader } from "react-spinners";

const GOALS={
    GAIN : "GAIN",
    LOSE : "LOSE"
}

const GOAL_TIERS = {
    TIER1: "0.25",
    TIER2: "0.5",
}

const GENDERS = {
    MALE: "m",
    FEMALE: "f",
    OTHER: "o"
}


const checkedStyle = { 
    "color" : "white",
    "background-color": "#29474a",
} 

const MealPlanFormComponent = (props) => {
    const [state, setState] = useState(MealPlanComponentState);
    const {loading, error, meals} = state;
    const {handleRenderMeals} = props;

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('userInfo'));
        if (info) {
            setState({...state, 
                height:info.height,
                weight:info.weight,
                age:info.age,
                gender: info.gender
            });
        }
        console.log(info);
    },[]);

    useEffect(() => {
        if (meals){
            handleRenderMeals(meals);
        }
    },[meals])

    function generatePlan(){
        setState({...state, loading: true});
        requestGeneratePlan();

        async function requestGeneratePlan(){
            try{
                const token = localStorage.getItem('token');
                const response = await generateMealPlan(state, token);
                setState({...state, meals:response, loading:false, error:null});
            } catch(err){
                setState({...state, meals:null, loading:false, error: err});
            }
        }
    }

    console.log('age: ', state.age);

    return (
        <div className="meal-form generic-container flex-column-center-x">
            <div className={'generic-container-header'} style={{'margin-bottom':'2rem'}}>
                <div className="text-biggest text-accent text-handwriting">Meal Plan</div>
            </div>

            <div className={'generic-multiple-option-toggle'}>
                <button style={ state.gender == GENDERS.FEMALE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.FEMALE})}>Female</button>
                {(state.gender === GENDERS.OTHER || state.gender === '') && <div>|</div>}
                <button style={ state.gender == GENDERS.MALE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.MALE})}>Male</button>
                {(state.gender === GENDERS.FEMALE || state.gender === '') && <div>|</div>}
                <button style={ state.gender == GENDERS.OTHER? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.OTHER})}>Other</button>
            </div>
            
            <div className={"input-icon"}>
                <input className={"input"} type={'number'} placeholder={'Age'} value={state.age} onChange={(event) => {setState({...state, age: event.target.value})}}/>
                <img src={profile} />
            </div>

            <div className={'input-icon'}>
                <input className={"input"} type={'number'} placeholder={'Height'} value={state.height} onChange={(event) => {setState({...state, height: event.target.value})}}/>
                <div className={'input-icon-info'}>cm</div>
            </div>

            <div className={'input-icon'}>
                <input className={"input"} type={'number'} step={0.1} min={0} placeholder={'Weight'} value={state.weight} onChange={(event) => {setState({...state, weight: event.target.value})}}/>
                <div className={'input-icon-info'}>kg</div>
           </div>

           <div className={'generic-select-dropdown'}>
                <select className={'generic-select-dropdown-select'} onChange={(event) => {setState({...state, numberOfMeals:event.target.value})}}>
                    <option value="" disabled selected>Number of meals</option>
                    <option value={3}>3 meals / day</option>
                    <option value={4}>4 meals / day</option>
                    <option value={5}>5 meals / day</option>
                </select>
                <img src={select} className={"generic-select-dropdown-icon-img"}/>
           </div>

           <div className={'generic-select-dropdown'}>
                <select className={'generic-select-dropdown-select'} value={state.activityType} onChange={(event) => {setState({...state, activityType:event.target.value})}}>
                    <option value="" disabled selected>Select activity type</option>
                    <option value={'SEDENTARY'}>Sedentary</option>
                    <option value={'LIGHT_ACTIVITY'}>Light activity</option>
                    <option value={'MODERATE_ACTIVITY'}>Moderate activity</option>
                    <option value={'ABOVE_AVERAGE_ACTIVITY'}>Above average activity</option>
                    <option value={'VERY_ACTIVE'}>Very active</option>
                </select>
                <img src={select} className={"generic-select-dropdown-icon-img"}/>
           </div>

           <div className="meal-form-goal flex-row-center-y">
                <div className={'generic-multiple-option-toggle'}>
                    <button style={ state.goal == GOALS.GAIN? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goal: GOALS.GAIN})}>Gain</button>
                    {state.goal === '' && <div>|</div>}
                    <button style={ state.goal == GOALS.LOSE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goal: GOALS.LOSE})}>Lose</button>
                </div>
            </div>

            <div className={'meal-form-goal-multiplier'}>
                <div className={'generic-multiple-option-toggle'}>
                    <button style={ state.goalTier == GOAL_TIERS.TIER1? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goalTier: GOAL_TIERS.TIER1})}>0.25kg</button>
                    {state.goalTier === 0 && <div>|</div>}
                    <button style={ state.goalTier == GOAL_TIERS.TIER2? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goalTier: GOAL_TIERS.TIER2})}>0.50kg</button>
                </div>
            </div>

            <div className={'generic-container-action flex-column-center-y flex-column-center-x'}>
                    <button className={'generic-container-action-button button-primary text-bigger'} style={{'margin-top':'2rem'}} onClick={generatePlan}>Generate</button>
            </div>

            {loading && <BarLoader width={150} height={5} color={'#29474A'} loading={loading} />}
            
        </div>
    )
}

export default MealPlanFormComponent;