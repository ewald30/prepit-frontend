import React from 'react'
import CollectionCard from '../collectionCard/CollectionCard'
import addIcon from '../../assets/svgs/icons/add.svg';
import './CollectionsComponent.scss';

const CollectionsComponent = ({collections, onSelectCollection, onCreateNewCollection, selectedCollection}) => {
  // pass selected collection, 
  // if selected collection == item => style{{border in jur sa se vada ca e selectat}}

	return (
		<div className='flex-row flex-space-around grid'>
			<div className='col' onClick={() => onCreateNewCollection()}>
				<div className='new-collection-card flex-row-center-y flex-row-center-x'>
					<img src={addIcon}/>
				</div>
			</div>
			{collections && collections.map((item) => {
				return (
					<div className='col' onClick={() => onSelectCollection(item)}>
						<div className={selectedCollection === item ? 'collection-card-selected' : ''}>
							<CollectionCard 
								containedMeals={item.containedMeals} 
								name={item.name}/>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CollectionsComponent
