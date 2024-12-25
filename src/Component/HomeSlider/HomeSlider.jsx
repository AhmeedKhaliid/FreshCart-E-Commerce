import React from 'react'
import style from './HomeSlider.module.css'
import image1 from '../../assets/slider-image-1-Dh9d2U6G.jpeg'
import image2 from '../../assets/slider-image-2-Xt88XJy9.jpeg'
import image3 from '../../assets/slider-image-3-BtMvVf4V.jpeg'
import Slider from 'react-slick'
export default function HomeSlider() {
   
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1}

      
  return <>
<Slider {...settings}>

  <img className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]" src={image1} alt="slider_1" />
  <img className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]" src={image2} alt="slider_2" />
  <img className="xl:h-[450px] lg:h-[350px] md:h-[280px] h-[150px]" src={image3} alt="slider_3" />


</Slider>

    </> 
 


}
