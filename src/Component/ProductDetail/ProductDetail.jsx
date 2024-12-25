import { useQuery } from '@tanstack/react-query'
import  { useContext } from 'react'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import ServerError from '../ServerError/ServerError'
import Curosol from '../Curosol/Curosol'
import { CartContextProvider } from '../../Context/CartContext'
import { WishListContextProvider } from '../../Context/WishListContext'
import { Helmet } from 'react-helmet'



export default function ProductDetail() {
    let {addToCart} = useContext(CartContextProvider);
    let { productsWishList,deleteItem , addToWishList } = useContext(WishListContextProvider);
  let { id , category } = useParams()
  function getSpcificProduct(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }
  let { data, isError, isLoading,  } = useQuery({
    queryKey: ['productdetail', id],
    queryFn: () => getSpcificProduct(id)
  })
  
  function getRelatedProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`) 
  }
  let allproducts = useQuery({
    queryKey: ['productRelated'],
    queryFn: getRelatedProduct
  })
  

let relatedproduct = allproducts?.data?.data?.data?.filter((product)=>product.category.name == category)
  if (allproducts.isLoading) {
    return <LoadingScreen/>
  }
  if (allproducts.isError) {
    return <ServerError/>
  }

  if (isLoading) {
    return <LoadingScreen/>
  }
  if (isError) {
    return <ServerError/>
  }
   if (addToCart.isPending || addToWishList.isPending || deleteItem.isPending ) {
    return <LoadingScreen />
  }
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  return <>
<Helmet>
  <title>Product Detail</title>
</Helmet>
  <div className=" bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <div className="px-8 py-12 mt-8">
      <div className="lg:flex-row flex flex-col items-center justify-center gap-20">
        <div className=" w-[400px]">
        <Slider {...settings}>
     {data?.data.data.images.map((details,index)=><img key={index} className="rounded-md" src={details} alt={data?.data.data.title}/>)}
    </Slider>
        </div>
        <div className="flex-1">
          <h3 className="mb-4 text-2xl font-semibold">{data?.data.data.title}</h3>
          <p className="mb-4 font-medium">{data?.data.data.description}</p>
          <h4 className="mb-4 text-lg font-medium text-[#0AAD0A]">{data?.data.data.category.name}</h4>
          <div className="flex items-center justify-around mb-8">
          {data.data.data.priceAfterDiscount?<><div className="flex gap-4"><h4 className="line-through">{data?.data.data.price} EGP</h4><h4>{data?.data.data.priceAfterDiscount} EGP</h4></div></>:<h4>{data?.data.data.price} EGP</h4>}
            <p className="flex items-center">
              <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 576 512" className="mr-1 text-yellow-400" height={16} width={16} xmlns="http://www.w3.org/2000/svg">
                <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z" />
              </svg> {data?.data.data.ratingsAverage}</p>
              <div onClick={() =>productsWishList?.find((x) => x?.id === data?.data.data.id)? deleteItem.mutate(data?.data.data.id): addToWishList.mutate(data?.data.data.id)
                      } className="cursor-pointer">
                        {productsWishList?.find((x) => x?.id === data?.data.data.id)?  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="text-red-500" height={30} width={30} xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
                        </svg>:<svg
                          stroke="currentColor"
                          fill="currentColor"
                          strokeWidth={0}
                          viewBox="0 0 512 512"
                          className="text-red-500"
                          height={30}
                          width={30}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z"></path>
                        </svg>}
                      
                        

                      </div>
          </div>
          <button  onClick={()=>{addToCart.mutate(data?.data.data.id)}} className="hover:bg-[#088A08] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-[#0AAD0A] rounded-lg cursor-pointer">Add to Cart</button>
        </div>
      </div>
      <div className='mt-5'><Curosol relatedproduct={relatedproduct}/></div>
      
    </div>
  </main>
</div>

  </>
}
