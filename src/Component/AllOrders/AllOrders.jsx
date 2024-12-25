
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ServerError from '../ServerError/ServerError';
import { Helmet } from 'react-helmet';
import { jwtDecode } from 'jwt-decode';

export default function AllOrders() {
    let  userId  = localStorage.getItem("Userid");
  function getUserOrders(userId) {
    const decoded = jwtDecode(localStorage.getItem("token"));
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${decoded?.id || userId }`);
  }


  // Fetch data from API
  let { data, isError, isLoading } = useQuery({
    queryKey: ['products', userId],
    queryFn:  () => getUserOrders(userId)
  })
  if (isLoading) {
    return <LoadingScreen />
  }
  if (isError) {
    return <ServerError />
    
    
  }
  const capitalizeFirstLetter = (name) => {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
}
  return <>
  <Helmet> <title>All Order</title></Helmet>
<div className="bg-[url('/src/assets/light-patten.svg')] bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="xl:mx-24 px-2 py-12">
      <p className="mb-8 text-4xl font-medium text-gray-500">My Orders</p>
      {data?.data.map((orders)=><div key={orders.id} className="md:flex-row rounded-xl flex flex-col justify-between gap-8 p-4 my-4" style={{boxShadow: 'rgba(0, 0, 0, 0.2) 12px 12px 26px, rgba(255, 255, 255, 0.6) -12px -12px 26px'}}>
        <div>
          {orders.cartItems.map((orderdetail)=><div key={orderdetail._id} className="flex items-center mb-2">
            <img className="w-24 mr-3" src={orderdetail.product.imageCover} alt={orderdetail.product.title} /><div><h3 className="mb-2 text-lg font-medium text-gray-500">{orderdetail.product.title.split(" ", 3).join(" ")}</h3>
              <h4 className="mb-2 font-bold text-[#0AAD0A]">{orderdetail.price} EGP</h4>
              <h4>Qty: <span className="font-medium text-[#0AAD0A]">{orderdetail.count}</span></h4>
            </div>
          </div>)}
        </div>
        <div className="whitespace-nowrap">
          <h3 className="border-b-[#0AAD0A] w-fit mb-2 text-3xl font-semibold text-gray-900 border-b">Order Details</h3>
          <div className="flex gap-6 mb-2"><h4 className="text-lg font-medium text-gray-700">Order ID:</h4>
            <p className="text-lg font-medium text-[#0AAD0A]">{orders.id}</p>
          </div>
          <div className="flex gap-6 mb-2">
            <h4 className="text-lg font-medium text-gray-700">Payment Method:</h4>
            <p className="text-lg font-medium text-[#0AAD0A]">{capitalizeFirstLetter(orders.paymentMethodType)}</p>
          </div>
          <div className="flex gap-6 mb-2">
            <h4 className="text-lg font-medium text-gray-700">Address:</h4>
            <p className="text-lg font-medium text-[#0AAD0A]">{orders?.shippingAddress?.city?capitalizeFirstLetter(orders?.shippingAddress?.city):" "}</p> </div>
          <div className="flex gap-6 mb-2">
            <h4 className="text-lg font-medium text-gray-700">Phone Number:</h4>
            <p className="text-lg font-medium text-[#0AAD0A]">{orders?.shippingAddress?.phone?orders?.shippingAddress?.phone:" "}</p> 
          </div>
          <div className="flex gap-6">
            <h4 className="text-lg font-medium text-gray-700">Total Order Price:</h4>
            <p className="text-lg font-bold text-[#0AAD0A]">{orders.totalOrderPrice}</p>
          </div>
        </div>
      </div>)}
    </section>
  </main>
</div>

  </>
}
