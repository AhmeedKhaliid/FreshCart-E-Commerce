import { useContext } from "react";
import { CartContextProvider } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from "react-helmet";
export default function Cart() {
  let {
    numOfCart,
    totalPrice,
    productsCart,
    updateCartQuantity,
    deleteItem,
    deleteCart,
  } = useContext(CartContextProvider);

async function updateCart(id , count) {
 await updateCartQuantity(id , count)
}
if (deleteItem.isPending ||deleteCart.isPending ) {
  return <LoadingScreen />
}


  return <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    <div className="bg-center flex-1 mt-16">
      <main className="container px-4 mx-auto overflow-hidden">
        {numOfCart==0?
        <section className="xl:mx-24 px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-500">Shopping Cart</h2>
            </div>
            
          </div>
          <div className="flex flex-col items-center justify-center gap-12 py-8 my-8">
            <p className="sm:text-5xl text-3xl font-medium">Your Cart Is Empty</p>
            <Link className="hover:bg-[#088A08]  whitespace-nowrap  focus:ring-[#6cce6c]  block w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer" to="/products">Go To Shopping</Link>
          </div>
        </section>:
        <section className="xl:mx-24 px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold text-gray-500">Shopping Cart</h2>
            </div>
            <div>
              <button onClick={()=> deleteCart.mutate()} className="hover:bg-red-700 focus:ring-red-300 whitespace-nowrap w-fit px-4 py-2 mx-auto font-semibold text-center text-white transition-all duration-500 bg-red-500 rounded-lg cursor-pointer">Clear All</button>
            </div>
          </div>
          <div className="sm:flex-row border-b-gray-300 sm:border-none flex flex-col items-center justify-between gap-8 pb-4 mb-4 text-2xl text-gray-500 border-b"><h3>Total Price: <span className="font-bold text-[#0AAD0A]">{totalPrice}</span></h3><h3>Total Number: <span className="font-semibold text-[#0AAD0A]">{numOfCart}</span>
          </h3>
          </div>
          {productsCart?.map((product) => (
            <div
              key={product._id} className="rounded-xl p-4 my-4" style={{ boxShadow: 'rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px' }}>
            <div className="sm:flex-row flex flex-col items-center justify-between gap-8"><div className="flex items-center">
              <img className="w-28 mr-3" src={product.product.imageCover} alt={product.product.title} />
              <div>
                <h3 className="mb-2 text-lg font-medium text-gray-500"> {product.product.title}</h3>
                <h4 className="mb-2 font-bold text-[#0AAD0A]">{product.price} Egp</h4>
                <div className="flex">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" className="text-[20px] cursor-pointer text-1xl text-red-600 relative top-[2px] mr-1" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z">
                    </path>
                  </svg>
                  <button onClick={() => deleteItem.mutate(product.product._id)} className="text-red-600">Remove</button>
                </div>
              </div>
            </div>
            
            
              <div className="flex items-center">
                <button onClick={() =>
                      updateCart(product.product._id, product.count + 1)} className="sm:text-base hover:bg-[#088A08] hover:text-white focus:ring-[#6cce6c] px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-[#0AAD0A] rounded-lg cursor-pointer">+</button>
                <span className="mx-4 text-lg font-medium"> {product.count}</span>
                
                
                <button onClick={() =>
                      updateCart(product.product._id, product.count - 1)
                    } className="sm:text-base hover:bg-[#088A08] focus:ring-[#6cce6c] hover:text-white px-4 py-2 text-sm text-gray-500 bg-transparent border-2 border-[#0AAD0A] rounded-lg cursor-pointer">-</button>
              </div>
            </div>
          </div>))}
          <Link className="hover:bg-[#088A08]  whitespace-nowrap  focus:ring-[#6cce6c]  block w-full px-4 py-2 mx-auto mt-8 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer" to="/payment">Checkout</Link></section>}
      </main>
    </div>

  </>
}
