import React, {useEffect, useState} from "react";
import RatingComponent from "./RatingComponent";
import { Link } from "react-router-dom";
import './CardRecipeComponent.scss';
import '../../assets/styles/_shared.scss';

import stopwatch from  '../../assets/svgs/icons/stopwatch.svg';
import stopwatch_colored from '../../assets/svgs/icons/stopwatch_colored.svg';
import dollar from '../../assets/svgs/icons/dollar.svg';
import dollar_colored from '../../assets/svgs/icons/dollar_colored.svg';
import AnimatedFadeTransition from "../utils/AnimatedFadeTransition";

const CardRecipeComponent = (props) => {

    const {image, title, description, priceRating, timeRating} = props;
    // TODO: limit this to 120 characters


    return (
            <div className={'generic-container card flex-column-start-y'}>
                <div className={"card-header"}>
                    <img className={"card-header-img"} src={image} />
                </div>

                <div className={"card-body-container flex-column flex-space-between"}>
                    <div className={"card-body flex-column-center-x flex-space-between"}>
                        <div className={"card-body-description"}>{title.slice(0,25)+'...'}</div>
                        <div className={"card-body-description text-normal"} style={{'margin-top':'15px'}}>{description.slice(0, 80) + '...'}</div>
                    </div>

                        <div className={"card-footer flex-column"}>
                            <div className={"card-footer-time-rating"}>
                                <RatingComponent rating={timeRating} iconGrey={stopwatch} iconColor={stopwatch_colored} />
                            </div>
                            {/* <div className={"card-footer-price-rating"}>
                                <RatingComponent rating={priceRating} iconGrey={dollar} iconColor={dollar_colored} />
                            </div> */}
                        </div>
                </div>
            </div>
    )
}

export default CardRecipeComponent;
