import './App.css'
import Home from './Component/Home/Home'
import Products from './Component/Products/Products'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Notfound from './Component/Notfound/Notfound'
import Layout from './Component/Layout/Layout'
import Categories from './Component/Categories/Categories'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductDetail from './Component/ProductDetail/ProductDetail'
import Brands from './Component/Brands/Brands'
import Login from './Component/Login/Login'
import Register from './Component/Register/Register'
import { ToastContainer } from 'react-toastify'
import ForgetPassword from './Component/ForgetPassword/ForgetPassword'
import ResetCode from './Component/ResetCode/ResetCode'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import UserContext from './Context/UserContext'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
import WishList from './Component/WishList/WishList'
import Cart from './Component/Cart/Cart'
import AllOrders from './Component/AllOrders/AllOrders'
import Payment from './Component/Payment/Payment'
import CartContext from './Context/CartContext'
import WishListContext from './Context/WishListContext'
import Profile from './Component/Profile/Profile'


let client= new QueryClient()

function App() {

  const router = createBrowserRouter([
    {path: "", element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute>  },
        { path: "Home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "resetcode", element: <ResetCode /> },
        { path: "resetpassword", element: <ResetPassword /> },
        { path: "products", element: <ProtectedRoute><Products/></ProtectedRoute> },
        { path: "productDetail/:id/:category", element: <ProtectedRoute><ProductDetail /></ProtectedRoute> },
        { path: "Brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "allorders", element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
        { path: "Payment", element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
        { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },]},
    { path: "*", element: <Notfound /> }
  ])
  return <>
  <QueryClientProvider client={client}>
<UserContext>
  <CartContext>
    <WishListContext>
    <RouterProvider router={router} />
    <ToastContainer />
    </WishListContext>
  </CartContext>
</UserContext>
</QueryClientProvider>
  </>

}

export default App
