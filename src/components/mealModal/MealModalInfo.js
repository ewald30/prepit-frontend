import React from 'react'
import './MealModalInfo.scss';

export default function MealModalInfo(props) {
    const {icon, label, info} = props

    return (
        <div className='modal-info flex-row-start-x'>
            <div className='modal-info-icon'>
                <img src={icon}/>
            </div>
            <div className='modal-info-text flex-column flex-center-y text-bolder'>
                <div className='modal-info-text-value text-darkest-grey text-bold'>
                    {info}
                </div>
                <div className='modal-info-text-label text-dark-grey'>
                    {label}
                </div>
            </div>
        </div>
    )
}
