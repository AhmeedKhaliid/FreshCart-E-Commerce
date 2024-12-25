import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import ServerError from '../ServerError/ServerError'
import { userContext } from '../../Context/UserContext'
import { CartContextProvider } from '../../Context/CartContext'
import { WishListContextProvider } from '../../Context/WishListContext'
export default function PopularProducts() {
  let{token} =useContext(userContext)
  let {addToCart} = useContext(CartContextProvider);
  let { productsWishList,deleteItem , addToWishList } = useContext(WishListContextProvider);
    // State for search term
    const [searchTerm, setSearchTerm] = useState('');
    function callApi() {
      return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

    }
    let { data, isError, isLoading} = useQuery({
      queryKey: ['products'],
      queryFn: callApi
    })

    if (isLoading) {
      return <LoadingScreen />
    }
    if (isError) {
      return <ServerError />
    }
  if (addToCart.isPending || addToWishList.isPending || deleteItem.isPending ) {
    return <LoadingScreen />
  }
    // Filter products based on the search term
    const filteredProducts = data?.data.data.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <>
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for popular products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-[35px] rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2 flex-1 sm:mb-0 w-full"

          />
        </div>
        <div className="md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 md:gap-16 grid grid-cols-1 gap-8">



          {/* Display filtered products */}
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="hovbox group rounded-xl p-4">
              <Link to={`/ProductDetail/${product.id}/${product.category.name}`}>
                <img
                  className="rounded-md"
                  src={product.imageCover}
                  alt={product.title}
                />
                <h3 className="mt-8 text-lg font-medium text-[#0AAD0A]">
                  {product.category.name}
                </h3>
                <p className="mb-4 font-semibold">{product.title.split(' ', 2).join(' ')}</p>
                <div className="flex items-center justify-between">
                  {product.priceAfterDiscount ? (
                    <>
                      <div className="flex gap-4">
                        <h4 className="line-through">{product.priceAfterDiscount} EGP</h4>
                        <h4>{product.price} EGP</h4>
                      </div>
                    </>
                  ) : (
                    <h4>{product.price} EGP</h4>
                  )}
                  <p className="flex items-center">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 576 512"
                      className="mr-1 text-yellow-400"
                      height={16}
                      width={16}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                    </svg>
                    {product.ratingsAverage}
                  </p>
                </div>
              </Link>
              <div className="flex items-center justify-center gap-4 mt-6">
                {token? <button onClick={()=>{addToCart.mutate(product.id)}} className="hover:bg-[#088A08] focus:ring-[#6cce6c] group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-[#0AAD0A] rounded-lg opacity-0 cursor-pointer">
                  Add to Cart
                </button>:<Link to={"/login"} className="hover:bg-[#088A08] focus:ring-[#6cce6c] group-hover:opacity-100 group-hover:translate-y-0 whitespace-nowrap w-full px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 translate-y-full bg-[#0AAD0A] rounded-lg opacity-0 cursor-pointer">
                  Add to Cart
                </Link>} 
                {token? <div onClick={() =>productsWishList?.find((x) => x?.id === product.id)? deleteItem.mutate(product.id): addToWishList.mutate(product.id)
                      } className="flex-1 cursor-pointer">
                        {productsWishList?.find((x) => x?.id === product.id)?  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="text-red-500" height={30} width={30} xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
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
                      
                        

                      </div>:<Link to={"/login"} onClick={() =>productsWishList?.find((x) => x?.id === product.id)? deleteItem.mutate(product.id): addToWishList.mutate(product.id)
                      } className="flex-1 cursor-pointer">
                        {productsWishList?.find((x) => x?.id === product.id)?  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="text-red-500" height={30} width={30} xmlns="http://www.w3.org/2000/svg"><path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>
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
                      
                        

                      </Link>} 
              </div>
            </div>
        ))
        ) : (
        <div>No products found</div>
        )}
      </div >
    </>
  );
  }



