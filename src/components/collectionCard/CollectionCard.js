import React from 'react'
import './CollectionCard.scss';

const CollectionCard = (props) => {
    const {containedMeals, name} = props;

    function compareMeals( a, b ){
        if ( a.title.toLowerCase() < b.title.toLowerCase()){
            return -1;
        }
        if ( a.title.toLowerCase() > b.title.toLowerCase()){
            return 1;
        }
        return 0;
    }

    containedMeals.sort(compareMeals)   // so they show up in the same order every time
    const mealImages = containedMeals.map(item => item.image);

    return (
        <div className="collection-card">
            <div className="collection-card-header flex-column-center-x">
                <div className='collection-card-header-top'>
                    {mealImages[0] ? <img className="collection-card-top-img" src={mealImages[0]}/> : <div className="collection-card-top-img collection-blank"/>}
                </div>
                <div className='collection-card-header-bottom flex-row flex-space-between'>
                    {mealImages[1] ? <img className="collection-card-bottom-img collection-card-bottom-img-first" src={mealImages[1]}/> : <div className="collection-card-bottom-img collection-blank collection-card-bottom-img-first"/>}
                    {mealImages[2] ? <img className="collection-card-bottom-img" src={mealImages[2]}/> : <div className="collection-card-bottom-img collection-blank"/>}
                    {mealImages[3] ? <img className="collection-card-bottom-img collection-card-bottom-img-last" src={mealImages[3]}/>  : <div className="collection-card-bottom-img collection-blank collection-card-bottom-img-last"/>}
                </div>
            </div>
            <div className='collection-card-footer flex-column-center-x'>
                {name}
                <div className='collection-card-footer-info'>
                    {mealImages.length} recipes
                </div>
            </div>

        </div>
    )
}

export default CollectionCard
