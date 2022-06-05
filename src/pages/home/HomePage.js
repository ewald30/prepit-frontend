import React, { useEffect, useState } from 'react'
import './HomePage.scss';
import AnimatedFadeTransition from '../../components/utils/AnimatedFadeTransition';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { ClimbingBoxLoader, ClipLoader } from 'react-spinners';
var Carousel = require('react-responsive-carousel').Carousel;

const NUMBER_OF_IMAGES = 4;

const HomePage = (props) => {
    const {handleAnimation} = props;
    const[images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRandomImages(); // loads random images from the stockImages directory
    }, [])


    function loadRandomImages(){
        let i=0;
        let images = [];
        while (i < NUMBER_OF_IMAGES){
            const imageNb = Math.floor(Math.random() * 22);
            const image   = require(`../../assets/stockPhotos/stock${imageNb}.jpg`);
            if (!images.some(e => e === image)) {
                images.push(image);
                i++;
              }
        }
        setImages(images)
        setLoading(false)
    }

    const getConfigurableProps = () => ({
        showArrows: true,
        showStatus: false,
        showIndicators: true,
        infiniteLoop: true,
        showThumbs: true,
        useKeyboardArrows: true,
        autoPlay: true,
        stopOnHover: false,
        swipeable: true,
        dynamicHeight: true,
        emulateTouch: true,
        autoFocus: false,
        thumbWidth: 100,
        selectedItem: 0,
        interval: 4000,
        transitionTime:1500,
        swipeScrollTolerance: 5,
        ariaLabel: undefined,
    });

    if(loading) {
        return (
            <div className='home-container flex-column-center-x flex-column-center-y'>
                <div className='home-loader'>
                    {loading && <ClipLoader width={500} height={5} color={'#29474A'} loading={loading}/>}
                </div>
            </div>
        )
    }

    return (
        console.log(images),
        <div className='home-container flex-column-center-x flex-column-center-y'>
            <AnimatedFadeTransition>
                <div className="home flex-column-center-x">
                    <div className='home-header'>
                        <div className='home-header-title text-huge text-bold text-accent text-center text-gradient'>
                            Begin your journey now!
                        </div>
                        <div className='home-header-content text-center text-bigger text-darkest-grey text-bold'>
                            Create an account, head to the "Meal Plan" section, enter your information, and start planning your meals.
                        </div>
                    </div>
                    <div className="home-button">
                        <Link to="/auth/register" className="text-big text-bolder link-full" onClick={() => {handleAnimation(true)}}>Join now!</Link>
                    </div>
                    <div className='home-login-link text-center text-normal-2 text-darkest-grey text-bold'>
                        Or sign in <Link to="/auth/register" className="text-bolder link-header" onClick={() => {handleAnimation(true)}}>here</Link>
                        </div>
                    <div className="home-content">
                        {images && <Carousel {...getConfigurableProps()}>
                            {images.map((image) => {
                                return (
                                <div className='carousel-image'>
                                    <img src={image}/>
                                </div>
                                )
                            })}
                            
                        </Carousel>}
                    </div>
                </div>
            </AnimatedFadeTransition>
        </div>
    )
}

export default HomePage;
