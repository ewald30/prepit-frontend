import React, { useEffect, useState } from 'react'
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import MyProfileState from '../../core/myProfile';
import './MyProfilePage.scss';
import '../../assets/styles/_shared.scss';
import { updateUser } from '../../api/user/userApi';
import { BarLoader } from 'react-spinners';
import logo from '../../assets/svgs/user.png';


const MyProfilePage = () => {
    const [state, setState] = useState(MyProfileState);
    const { firstName, lastName, timePriceMultiplier, accuracyMultiplier, loading} = state;
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        updateState(userInfo);
    }, [])

    function updateState(userInfo){
        const priceMultiplier = userInfo.priceMultiplier;
        const timeMultiplier= userInfo.timeMultiplier;
        const accuracyMultiplier = userInfo.accuracyMultiplier;
        let timePriceMultiplierValue;

        if (priceMultiplier > 1){
            timePriceMultiplierValue = -1 * priceMultiplier;
        } else if (timeMultiplier > 1) {
            timePriceMultiplierValue = timeMultiplier
        } else{
            timePriceMultiplierValue = 1;
        }

        setState({...state, 
            height:userInfo.height,
            weight:userInfo.weight,
            firstName:userInfo.firstName,
            lastName:userInfo.lastName,
            email:userInfo.email,
            age:userInfo.age > 0? userInfo.age : null,
            gender: userInfo.gender,
            accuracyMultiplier: accuracyMultiplier,
            timePriceMultiplier: timePriceMultiplierValue,
            loading: false
        });
    }

    function resetDefault(){
        setState({...state, 
            timePriceMultiplier: 0, 
            accuracyMultiplier: 10
            })
        handleSaveSettings();
    }

    function handleSaveSettings(){
        setState({...state, loading:true});
        let timeMultiplier, priceMultiplier;
        if (timePriceMultiplier < 0){
            priceMultiplier = Math.abs(timePriceMultiplier);
            timeMultiplier = 1;
        } else if (timePriceMultiplier > 0){
            timeMultiplier = timePriceMultiplier
            priceMultiplier = 1;
        } else{
            timeMultiplier = 1;
            priceMultiplier = 1;
        }

        console.log("multis");
        console.log(timeMultiplier, priceMultiplier);
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const token = localStorage.getItem('token');

        const userDto = {
            accuracyMultiplier: accuracyMultiplier,
            activityType: "",
            age: userInfo.age,
            firstName: userInfo.firstName,
            gender: userInfo.gender,
            height: userInfo.height,
            id: userInfo.id,
            lastName: userInfo.lastName,
            priceMultiplier: priceMultiplier,
            timeMultiplier: timeMultiplier,
            weight: userInfo.weight
        }

        update(userDto);

        async function update(userInfo) {
            const response = await updateUser(userInfo, token);
            localStorage.setItem('userInfo', JSON.stringify(response));
            const userInfoUpdated = JSON.parse(localStorage.getItem('userInfo'));
            updateState(userInfoUpdated);
        }
    }


    return (
        <div className='my-profile flex-row-center-y flex-space-around'> 
                <AnimatedTranslateTransition>
                <div className='my-profile-container generic-container flex-column-center-x'>
                    <div className={'generic-container-header login-component-logo'}>
                        <img className={'logo-rounded'} src={logo}/>
                    </div>

                    <div className='profile flex-column-center-x text-biggest text-darkest-grey'>
                        {firstName + " " + lastName}
                        <div className='profile-info flex-column-center-x text-normal'>
                            <div>{state.email}</div>
                            <div className='flex-row flex-space-between profile-info'>
                                <div>Age: </div><div>{state.age}</div>
                            </div>
                            <div className='flex-row flex-space-between profile-info'>
                                <div>Weight: </div><div>{state.weight}</div>
                            </div>
                            <div className='flex-row flex-space-between profile-info'>
                                <div>Height: </div><div>{state.height}</div>
                            </div>
                            <div className='slider-container'>
                                <div className='slider-container-label text-norma tex-grey'>Accuracy multiplier</div>
                                <div className=' flex-space-between flex-row-center-y'>
                                    <input value={accuracyMultiplier} className="slider" type="range" name="accuracy" min="5" max="10" onChange={(e) => setState({...state, accuracyMultiplier: e.target.value})}/>
                                    {accuracyMultiplier? <div className='slider-left'>{accuracyMultiplier}</div> : 0}
                                </div>
                            </div>

                            <div className='slider-container'>
                                <div className='slider-container-label text-norma tex-grey'>Price / Time multiplier</div>
                                <div className=' flex-space-between flex-row-center-y'>
                                    <input value={timePriceMultiplier} className="slider" type="range" name="accuracy" min="-5" max="5" onChange={(e) => setState({...state, timePriceMultiplier: e.target.value})}/>
                                    {timePriceMultiplier? <div className='slider-left'>{timePriceMultiplier}</div> : 0}
                                </div>
                            </div>

                            <div className='save-container'>
                                <button className='button-primary save-button' onClick={handleSaveSettings}>Save</button>
                                {/* <button className='button-transparent button' onClick={resetDefault}>Reset</button> */}

                            </div>
                            {loading && <BarLoader width={150} height={5} color={'#29474A'} loading={loading} style={{'width':'100%'}}/>}

                        </div>
                    </div>
                </div>
                </AnimatedTranslateTransition>
                <AnimatedTranslateTransition>
                            <div className={'text-big text-center text-dark-grey login-page-graphics-text text-bold my-profile-graphics'}>
                                Start exploring the settings to feel whatever suits you
                            </div>
                </AnimatedTranslateTransition>
        </div>
    )
}

export default MyProfilePage;
