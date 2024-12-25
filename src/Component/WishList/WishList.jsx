import { useContext } from "react";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { WishListContextProvider } from "../../Context/WishListContext";
import { CartContextProvider } from "../../Context/CartContext";
import { Helmet } from "react-helmet";
export default function Whishlist() {
  let {
    countWishList,
    productsWishList,
    deleteItem,

  } = useContext(WishListContextProvider);
 let {addToCart} = useContext(CartContextProvider);

  if (deleteItem.isPending || addToCart.isPending) {
    return <LoadingScreen />
  }
 


  return <>
    <Helmet>
      <title>WhisList</title>
    </Helmet>
   <div className=" bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    {countWishList == 0 ?
    <section className="xl:mx-24 px-4 py-12">
      <h2 className="mb-8 text-3xl font-semibold text-gray-500">Wish List</h2>
      <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
        <p className="sm:text-5xl text-3xl font-medium">Your Wishlist Is Empty</p>
      </div>
    </section>
    :<section className="xl:mx-24 px-4 py-12">
      <h2 className="mb-8 text-3xl font-semibold text-gray-500">Wish List</h2>
      {productsWishList?.map((product) => (
      <div key={product._id} className="rounded-xl p-4 my-4" style={{boxShadow: 'rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px'}}>
        <div className="sm:flex-row sm:items-center flex flex-col justify-between gap-8">
          <div className="flex items-center">
            <img className="w-28 mr-3" src={product.imageCover} alt={product.title} />
            <div>
              
              <h3 className="mb-2 text-lg font-medium text-gray-500">{product.title.split(" ", 4).join(" ")}</h3>
              <h4 className="mb-2 font-bold text-[#0AAD0A]">{product.price} EGP</h4>
              <div className="flex">
                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z" />
                </svg>
                <button onClick={() => deleteItem.mutate(product._id)} className="text-red-600">Remove</button>
                </div>
            </div>
          </div>
          <div >
            <button onClick={()=>{addToCart.mutate(product.id)}} className="hover:bg-[#088A08] focus:ring-[#6cce6c] whitespace-nowrap w-full px-4 py-2 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer">Add to Cart</button>
          </div>
        </div>
      </div>))}
    </section>}
  </main>
</div>

  </>
}
