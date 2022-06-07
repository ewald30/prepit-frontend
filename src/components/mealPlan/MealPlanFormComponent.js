import React, {useState, useEffect} from "react";
import '../../assets/styles/_shared.scss';
import './MealPlanFormComponent.scss';
import { MealPlanComponentState } from "../../core/mealPlan";
import generateMealPlan from "../../api/mealPlan/mealPlanApi";
import Modal from '../modal/Modal';
import profile from '../../assets/svgs/icons/profile.svg';
import ruler from '../../assets/svgs/icons/ruler.svg';
import scale from '../../assets/svgs/icons/calendar-two.svg';
import logo from '../../assets/svgs/logo_iconOnly.svg';
import select from '../../assets/svgs/icons/select-o.svg';
import questionIllustration from '../../assets/svgs/illustrations/undraw_question.svg';
import { BarLoader } from "react-spinners";
import { validateMealPlanInput } from "../../resources/validation/mealPlanValidation";

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
    const [formErrors, setFormErrors] = useState({});
    const {loading, error, meals} = state;
    const {handleRenderMeals} = props;

    useEffect(() => {
        const info = JSON.parse(localStorage.getItem('userInfo'));
        if (info) {
            setState({...state, 
                height:info.height,
                weight:info.weight,
                age:info.age > 0? info.age : null,
                gender: info.gender,
                id: info.id
            });
        }
        console.log(info);
    },[]);


    useEffect(() => {
        if (meals){
            handleRenderMeals(meals);
        }
    },[meals])

    useEffect(() => {
            if(state.saveUser){
                generatePlan();
            }
        },
        [state.saveUser],
      );


    function generatePlan(){
        // check to see if there are any validation errors
        const errors = validateMealPlanInput(state)
        setFormErrors(errors);
        
        // if there are errors, stop the process
        if(Object.keys(errors).length !== 0){
            return;
        }
        const info = JSON.parse(localStorage.getItem('userInfo'));
        setState({...state, loading: true});

        if (state.overwrittenValues && info && !state.saveUser){        // ask for agreement to save the data
            setState({...state, modalOpen: true});  
        }
        else{
            if (state.saveUser === 'yes'){    // if the user agreed for the data to be saved
                updateUserInfo();
            }
            requestGeneratePlan();
        }

        function updateUserInfo(){
            debugger;
            const info = JSON.parse(localStorage.getItem('userInfo'));
            info.age = state.age;
            info.height = state.height;
            info.weight = state.weight;
            info.gender = state.gender;
            localStorage.setItem('userInfo', JSON.stringify(info));
        }

        async function requestGeneratePlan(){
            try{

                const requestBody = {
                    age: state.age,
                    height: state.height,
                    weight: state.weight,
                    gender: state.gender,
                    numberOfMeals: state.numberOfMeals,
                    activityType: state.activityType,
                    goal: state.goal,
                    goalTier: state.goalTier,
                    id: state.saveUser == 'yes'? state.id : -1,
                    priceMultiplier: info? info.priceMultiplier : 1,
                    timeMultiplier: info? info.timeMultiplier : 1,
                    accuracyMultiplier: info? info.accuracyMultiplier : 5,
                }

                const token = localStorage.getItem('token');
                const response = await generateMealPlan(requestBody, token);
                setState({...state, meals:response, loading:false, error:null, overwrittenValues:false, saveUser:null});
            } catch(err){
                setState({...state, meals:null, loading:false, error: err, overwrittenValues:false, saveUser:null});
            }
        }
    }


    function handleSaveUserPreference(value){
        setState({...state, saveUser:value, modalOpen: false, overwrittenValues:false});
    }


    return (
        <div className="meal-form generic-container flex-column-center-x">
            <div className={'generic-container-header'} style={{'margin-bottom':'2rem'}}>
                <div className="text-biggest text-accent text-handwriting">Meal Plan</div>
            </div>

            <div className={'generic-multiple-option-toggle'}>
                <button style={ state.gender == GENDERS.FEMALE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.FEMALE, overwrittenValues:true})}>Female</button>
                {(state.gender === GENDERS.OTHER || state.gender === '') && <div>|</div>}
                <button style={ state.gender == GENDERS.MALE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.MALE, overwrittenValues: true})}>Male</button>
                {/* {(state.gender === GENDERS.FEMALE || state.gender === '') && <div>|</div>}
                <button style={ state.gender == GENDERS.OTHER? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, gender: GENDERS.OTHER, overwrittenValues: true})}>Other</button> */}
            </div>
            <div className="generic-error-container">
                {formErrors.gender && <div className="generic-container-error">{formErrors.gender}</div>}
            </div>

            
            <div className={"input-icon"}>
                <input className={formErrors.age? 'input input-error' : 'input'} type={'number'} placeholder={'Age'} value={state.age} onChange={(event) => {setState({...state, age: event.target.value, overwrittenValues:true})}}/>
                <img src={profile} />
                {formErrors.age && <div className="generic-container-error">{formErrors.age}</div>}

            </div>

            <div className={'input-icon'}>
                <input className={formErrors.height? 'input input-error' : 'input'} type={'number'} placeholder={'Height'} value={state.height} onChange={(event) => {setState({...state, height: event.target.value, overwrittenValues:true})}}/>
                <div className={'input-icon-info'}>cm</div>
                {formErrors.height && <div className="generic-container-error">{formErrors.height}</div>}
            </div>

            <div className={'input-icon'}>
                <input className={formErrors.weight? 'input input-error' : 'input'}type={'number'} step={0.1} min={0} placeholder={'Weight'} value={state.weight} onChange={(event) => {setState({...state, weight: event.target.value, overwrittenValues:true})}}/>
                <div className={'input-icon-info'}>kg</div>
                {formErrors.weight && <div className="generic-container-error">{formErrors.weight}</div>}
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
           <div className="generic-error-container">
                {formErrors.numberOfMeals && <div className="generic-container-error">{formErrors.numberOfMeals}</div>}
           </div>

           <div className={'generic-select-dropdown'}>
                <select className={'generic-select-dropdown-select'} value={state.activityType} onChange={(event) => {setState({...state, activityType:event.target.value})}}>
                    <option disabled selected>Select activity level</option>
                    <option value={'SEDENTARY'}>Sedentary</option>
                    <option value={'LIGHT_ACTIVITY'}>Light activity (1-2 days/week)</option>
                    <option value={'MODERATE_ACTIVITY'}>Moderate activity (3-5 days/week)</option>
                    <option value={'ABOVE_AVERAGE_ACTIVITY'}>Very active (6-7 days/week)</option>
                    <option value={'VERY_ACTIVE'}>Athlete (2x per day)</option>
                </select>
                <img src={select} className={"generic-select-dropdown-icon-img"}/>
           </div>  
           <div className="generic-error-container">
                {formErrors.activityType && <div className="generic-container-error">{formErrors.activityType}</div>}
           </div>

           <div className="meal-form-goal">
                <div className={'generic-multiple-option-toggle'}>
                    <button style={ state.goal == GOALS.GAIN? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goal: GOALS.GAIN})}>Gain</button>
                    {state.goal === '' && <div>|</div>}
                    <button style={ state.goal == GOALS.LOSE? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goal: GOALS.LOSE})}>Lose</button>
                </div>
                {formErrors.goal && <div className="generic-container-error">{formErrors.goal}</div>}
            </div>


            <div className={'meal-form-goal-multiplier'}>
                <div className={'generic-multiple-option-toggle'}>
                    <button style={ state.goalTier == GOAL_TIERS.TIER1? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goalTier: GOAL_TIERS.TIER1})}>0.25kg / week</button>
                    {state.goalTier === 0 && <div>|</div>}
                    <button style={ state.goalTier == GOAL_TIERS.TIER2? checkedStyle : {"background-color":"#efefef"}} onClick={() => setState({...state, goalTier: GOAL_TIERS.TIER2})}>0.50kg / week</button>
                </div>
                {formErrors.goalTier && <div className="generic-container-error">{formErrors.goalTier}</div>}
                {/* {!formErrors.goalTier && <div className="generic-container-info">* per week</div>} */}

            </div>
            

            <div className={'generic-container-action flex-column-center-y flex-column-center-x'}>
                    <button className={'generic-container-action-button button-primary text-bigger'} style={{'margin-top':'2rem'}} onClick={generatePlan}>Generate</button>
            </div>

            {loading && <BarLoader width={150} height={5} color={'#29474A'} loading={loading} />}


            <Modal open={state.modalOpen} onClose={() => setState({...state, modalOpen: false})}>
                <div className={'save-user-info-modal flex-column-center-x'}>
                    <img className={'save-user-info-modal-illustration'} src={questionIllustration}/>
                    <div className={'text-bigger text-accent'} >Save user info?</div>
                    <div className={'save-user-info-modal-buttons flex-row flex-space-around'}>
                        <button onClick={() => handleSaveUserPreference('yes')} className={'button-primary'}>Yes</button>
                        <button onClick={() => handleSaveUserPreference('no')} className={'button-transparent'}>No</button>
                    </div>
                </div>
            </Modal>


        </div>
    )
}

export default MealPlanFormComponent;