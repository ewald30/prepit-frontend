import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AnimatedTranslateTransition from '../../components/utils/AnimatedTranslateTransition';
import { MyCollectionsState } from '../../core/myCollections';
import CollectionCreateModal from '../../components/collectionCreateModal/CollectionCreateModal';
import CollectionsComponent from '../../components/collections/CollectionsComponent';
import { setSelectedCollection } from '../../redux/actions/collection';
import './MyCollectionsPage.scss';
import { sessionExpired } from '../../redux/actions/auth';
import { authRequestWrapper } from '../../api/auth/auth';
import { createCollection, getCollections } from '../../api/collection/collectionApi';

const MyCollectionsPage = () => {
    const [state, setState] = useState(MyCollectionsState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {collections, collectionCreationModalOpen} = state;


    useEffect(() => {
        init();
    }, [])

    function init(){
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));

        getCollectionsForUser();

        async function getCollectionsForUser(){
            try{
                const getCollectionsWrapped = authRequestWrapper(getCollections);   // will refresh token if expired
                const response = await getCollectionsWrapped(userInfo.id);
                debugger;
                setState({...state, 
                    collections: response,
                    collectionCreationModalOpen: false
                })
                debugger;
            } catch(error){
                debugger;
                if (error.response.status === 401){
                    dispatch(sessionExpired());
                    navigate('/home');
                }
            }
        }
    }

    function handleCreateNewCollection(title, description){
        setState({...state, collectionCreationModalOpen: false, loadingSaveMeal: true})

        console.log("TITLE, DESCRIPTION", title, description)
        createNewCollection(title, description);

        async function createNewCollection(title, description){
            try{
                const createCollectionWrapped = authRequestWrapper(createCollection);   // will refresh token if expired
                const response = await createCollectionWrapped(title, description);
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
        <div className="my-collections flex-column-center-y flex-column-center-x" style={{'height': '100%'}}>
            <AnimatedTranslateTransition style={{'height': '100%'}}>
                <div className="generic-container" style={{'height': '100%'}}>
                    <div className='text-biggest'>Saved collections</div>
                    {collections && <div className='text-normal-2 text-thinner' style={{'margin-bottom':'-1rem'}}>
                        Collections : {collections.length}
                    </div>}
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

export default MyCollectionsPage
