import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from './homeimage1.jpg';
// import image2 from './homeimage2.jpg';
// import image3 from './homeimage3.jpg';
// import image4 from './homeimage4.jpg';

const Home_Image = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    const images = [
        image1,
        // image2,
        // image3,
        // image4
    ];

    return (
        <div className=" hidden md:block md:max-w-lg p-4">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index}>
                        <img 
                            src={image} 
                            alt={`Slide ${index + 1}`} 
                            className=" md:h-auto md:w-96 transition-transform transform hover:scale-105" 
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Home_Image;
