import React, {useEffect, useState} from "react";
import './CardRecipeComponent.scss';

const MAX_RATING = 5;

const RatingComponent = (props) => {
    const [icons, setIcons] = useState([]);
    const {rating, iconGrey, iconColor} = props;

    useEffect(() =>{
        const iconList = [];

        for (let i=1; i<=rating; i++) {
            iconList.push(iconColor);
        }

        for(let i=1; i<=MAX_RATING-rating; i++) {
            iconList.push(iconGrey)
        }
        
        setIcons(iconList);

    }, [JSON.stringify(icons)]);

    console.log(icons)

    return (
        <div>
            {icons.map((item) => {
                return(
                    <img src={item}/>
                )
            })}
        </div>
    )
}

export default RatingComponent;
