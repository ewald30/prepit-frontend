import React, {useEffect, useState} from "react";
import RatingComponent from "./RatingComponent";
import { Link } from "react-router-dom";
import './CardRecipeComponent.scss';
import '../../assets/styles/_shared.scss';

import stopwatch from  '../../assets/svgs/icons/stopwatch.svg';
import stopwatch_colored from '../../assets/svgs/icons/stopwatch_colored.svg';
import dollar from '../../assets/svgs/icons/dollar.svg';
import dollar_colored from '../../assets/svgs/icons/dollar_colored.svg';

const CardRecipeComponent = (props) => {
    // states
    props = {
        image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/recipe-image-legacy-id-1098495_11-319e3ec.jpg",
        title: "Venison steaks with stroganoff sauce & shoestring fries asdasda we fasda csgsaef asdasda sdaa sdasdfasdgas s adga sd asd",
        description: "Steak and chips gets even more special with rare seared game and homemade fries with mushroom cream sauce",
        priceRating: 3,
        timeRating: 3
    }

    const {image, title, description, priceRating, timeRating} = props;
    // TODO: limit this to 120 characters


    return (
        <div className={'generic-container card flex-column-start-y'}>
            <div className={"card-header"}>
                <img className={"card-header-img"} src={image} />
            </div>

            <div className={"card-body-container flex-column flex-space-around"}>
                <div className={"card-body flex-column-center-x flex-column-center-y"}>
                    <div className={"card-body-description flex-row-center-x"}>{title}</div>
                </div>

                <div className={"card-footer flex-column"}>
                    <div className={"card-footer-time-rating"}>
                        <RatingComponent rating={props.timeRating} iconGrey={stopwatch} iconColor={stopwatch_colored} />
                    </div>
                    <div className={"card-footer-price-rating"}>
                        <RatingComponent rating={props.priceRating} iconGrey={dollar} iconColor={dollar_colored} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardRecipeComponent;
