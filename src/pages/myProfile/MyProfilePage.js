import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createCollection } from '../../api/collection/CollectionApi';
import getCollections from '../../api/myProfile/myProfileApi';
import CollectionCreateModal from '../../components/collectionCreateModal/CollectionCreateModal';
import CollectionsComponent from '../../components/collections/CollectionsComponent';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import MyProfileState from '../../core/myProfile';
import { setSelectedCollection } from '../../redux/actions/collection';
import './MyProfilePage.scss';

const MyProfilePage = () => {
    const userId = 1;
    const [state, setState] = useState(MyProfileState);
    const {collections, firstName, lastName, collectionCreationModalOpen} = state;
    const dispatch = useDispatch();
const navigate = useNavigate();
    useEffect(() => {
        init();
    }, [])

    function init(){
        const token =  localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        getCollectionsForUser();

        async function getCollectionsForUser(){
            const response = await getCollections(token, 1)
            setState({...state, 
                collections: response,
                height:userInfo.height,
                weight:userInfo.weight,
                firstName:userInfo.firstName,
                lastName:userInfo.lastName,
                email:userInfo.email,
                age:userInfo.age > 0? userInfo.age : null,
                gender: userInfo.gender,
                collectionCreationModalOpen: false
            })
        }
    }

    function handleCreateNewCollection(title, description){
        setState({...state, collectionCreationModalOpen: false, loadingSaveMeal: true})

        console.log("TITLE, DESCRIPTION", title, description)
        createNewCollection(title, description);

        async function createNewCollection(title, description){
            try{
                const response = await createCollection(title, description);
                setState({...state, loadingSaveMeal: false, collectionCreationModalOpen: false,})
                init();
            } catch (error){
                console.error(error);
                setState({...state, loadingSaveMeal: false, collectionCreationModalOpen: false,})

            }
        }
    }

    function handleSelectCollection(item){
        console.log(item);
        const collection = {
            id: item.collectionId,
            name: item.name,
            description: item.description
        }
        dispatch(setSelectedCollection(collection));
        navigate("/meal/saved-meals");
    }

    return (
        <div className='my-profile flex-column-center-y flex-column-center-x'> 
                <AnimatedTranslateTransition>
                <div className='my-profile-container generic-container'>
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
                        </div>
                    </div>
                    <div className='text-normal-2 text-thinner' style={{'margin-bottom':'-1rem'}}>
                        Collections : {collections.length}
                    </div>
                    <hr className='solid'/>
                    <div className='collections'>
                        <CollectionsComponent collections={collections}
                                                    onSelectCollection={handleSelectCollection}
                                                    onCreateNewCollection={() => {console.log('aiaia baaa'); setState({...state, collectionCreationModalOpen: true})}}/>
                    </div>
                </div>
                </AnimatedTranslateTransition>

                {collectionCreationModalOpen && <CollectionCreateModal open={collectionCreationModalOpen} onClose={() => {setState({...state, collectionCreationModalOpen: false})}} onSave={handleCreateNewCollection}/>}

        </div>
    )
}

export default MyProfilePage;
