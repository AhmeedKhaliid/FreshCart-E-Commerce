import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast, } from "react-toastify";
import LoadingScreen from "../Component/LoadingScreen/LoadingScreen";
import ServerError from "../Component/ServerError/ServerError";


// Create context
export const WishListContextProvider = createContext();

// CartContext component
export default function WishListContext({ children }) {
    const [productsWishList, setProductWishList] = useState(null);
    const [countWishList, setCountWishList] = useState(0);



    const addToWishList = useMutation({
        mutationFn: (productId) => {
            const newToken = localStorage.getItem("token");

            return axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId }, { headers: { token:newToken } }
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
            const newToken = localStorage.getItem("token");

            return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers: { token:newToken }, })
        },
        onSuccess: () => {

            toast.success("Product removed from WhishList");
            refetch()
        },
        onError: () => {
            toast.error("Error removing product"); // Display error toast
        },
    });


    function getWhislist() {
        const newToken = localStorage.getItem("token");

        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers: { token:newToken }, });

    }
    let { data, isError, isLoading, refetch } = useQuery({
        queryKey: ['whishlistitem'],
        queryFn: getWhislist,
        enabled: !!localStorage.getItem("token"),
    })
    useEffect(() => {
        if (data) {
            setProductWishList(data?.data?.data);
            setCountWishList(data?.data?.count);

        }
    }, [data]);
    if (isLoading) {
        return <LoadingScreen />
    }
    if (isError) {
        return <ServerError />
    }

    return (
        <WishListContextProvider.Provider
            value={{
                addToWishList,
                getWhislist,
                productsWishList,
                deleteItem,
                countWishList

            }}
        >
            {children}
        </WishListContextProvider.Provider>
    );
}

