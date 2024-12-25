import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import  { useEffect } from "react";
import { createContext, useState } from "react";
import { toast,  } from "react-toastify";
import LoadingScreen from "../Component/LoadingScreen/LoadingScreen";
import ServerError from "../Component/ServerError/ServerError";


// Create context
export const CartContextProvider = createContext();

// CartContext component
// eslint-disable-next-line react/prop-types
export default function CartContext({ children }) {
  const [numOfCart, setNumOfCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productsCart, setProductCart] = useState(null);
  const [cartId, setCartId] = useState(null);
  const token = localStorage.getItem("token");


const addToCart = useMutation({
    mutationFn: (productId) => {
      return axios.post("https://ecommerce.routemisr.com/api/v1/cart",{ productId },{ headers: { token } }
      );
    },
    onSuccess: (data) => {
    
      toast.success(data?.data.message);
      refetch()
    },
    onError: () => {
      toast.error("Error adding product to your cart"); // Display error toast
    },
});
  
const deleteItem = useMutation({
  mutationFn: (id) => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {headers: { token },})
  },
  onSuccess: () => {
  
    toast.success("Product removed from cart");
    refetch()
  },
  onError: () => {
    toast.error("Error removing product"); // Display error toast
  },
});

const deleteCart = useMutation({
  mutationFn: () => {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers: { token },})},
  onSuccess: () => {
  
    toast.success("Cart empty succesfully");
    refetch()
  },
  onError: () => {
    toast.error("Error emptying product"); // Display error toast
  },
});

  async function updateCartQuantity(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,{ count },{ headers: { token } })
      .then((res) => {
        setNumOfCart(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);
        setProductCart(res.data.data.products);
        toast.success("Cart Updated succesfully")
        return true;
      })
      .catch(() => {
        toast.error("Error Updating product");
        return false;
      });
}

function getCart() {
return  axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers: { token },});

}
let { data, isError, isLoading,refetch } = useQuery({
queryKey: ['Cartitem'],
queryFn: getCart
})
useEffect(() => {
if (data) {
  setNumOfCart(data?.data?.numOfCartItems);
  setTotalPrice(data?.data?.data?.totalCartPrice);
  setProductCart(data?.data?.data?.products);
  setCartId(data?.data?.cartId);

}
}, [data]);
if (isLoading) {
return <LoadingScreen />
}
if (isError) {
return <ServerError/>
}


  return (
    <CartContextProvider.Provider
      value={{
        addToCart,
        getCart,
        numOfCart,
        totalPrice,
        productsCart,
        updateCartQuantity,
        deleteItem,
        deleteCart,
        cartId,
        refetch
      }}
    >
      {children}
    </CartContextProvider.Provider>
  );
}

