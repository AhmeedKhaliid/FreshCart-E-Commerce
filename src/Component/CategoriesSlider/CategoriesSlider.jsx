import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Slider from 'react-slick'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ServerError from '../ServerError/ServerError'
export default function CategoriesSlider() {
  function categoriesApi() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

  }
  let { data, isError, isLoading } = useQuery({
    queryKey: ['Categories'],
    queryFn: categoriesApi
  })

  if (isLoading) {
    return <LoadingScreen />
  }
  if (isError) {
    return <ServerError/>
  }
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 7,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return <>
   <Slider {...settings}>
   {data?.data.data.map((category) =>
              <div className='group' key={category._id} >
                <img className="h-52 sm:w-full object-cover mx-auto mb-4" src={category.image} alt={category.name} />
                <p className="group-hover:text-[#0AAD0A] mb-4 text-lg text-center text-gray-500 transition-all duration-300">{category.name}</p>
                </div>)}
          
   </Slider>
  
  </>
}
