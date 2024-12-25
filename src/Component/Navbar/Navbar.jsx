import { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/freshcart-logo-Ctk0WIKS.svg'
import { userContext } from '../../Context/UserContext';
import { toast } from 'react-toastify';

import { CartContextProvider } from '../../Context/CartContext';
import { WishListContextProvider } from '../../Context/WishListContext';
export default function Navbar() {
  let { setToken,token  } = useContext(userContext);
  let {numOfCart} = useContext(CartContextProvider);
  let {countWishList} = useContext(WishListContextProvider);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  let navi = useNavigate()
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  function hideNav() {
    setIsMenuOpen(false)
  }
  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
  };
  function hideAccount() {
    setIsAccountOpen(false)
  }
  const capitalizeFirstLetter = (name) => {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
}
  const FirstLetter = (name) => {
    return String(name).charAt(0).toUpperCase();
}
function logout() {
  toast.success("Logged Out")
  localStorage.removeItem("token");
  setToken(null)
  navi("/home")

}


  return <>
    <nav className="bg-[#eee] select-none shadow-md fixed top-0 z-30 w-full">
      <div className="max-w-7xl md:px-6 lg:px-8 px-2 mx-auto">
        <div className="relative flex items-center justify-between h-16">
          <div className="md:hidden absolute inset-y-0 left-0 flex items-center gap-2">
            <div onClick={toggleMenu} className="inline-flex items-center justify-center p-1.5 rounded-md text-[#0aad0a] border-[#0aad0a] border cursor-pointer ml-1">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="{0}" viewBox="0 0 448 512" className="w-6 h-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
              </svg>
            </div>
            <div className="flex items-center flex-shrink-0">
              <Link to="/home"><img className="w-auto h-8" src={logo} alt="fresh-cart" /></Link>
            </div>
          </div>
          <div className="flex-1 hidden md:flex items-center justify-center md:items-stretch md:justify-start mr-[90px] md:mr-0">
            <div className="flex items-center flex-shrink-0">
              <Link to="/home"><img className="w-auto h-8" src={logo} alt="fresh-cart" /></Link>
            </div>
            <div className="md:block md:ml-6 hidden">
              <div className="flex space-x-2">
                <li className="flex items-center justify-center">
                  <NavLink to="/home" className="text-gray-500 font-normal px-3 py-1.5 transition-all duration-300">Home</NavLink>
                </li>
                <li className="flex items-center justify-center">
                  <NavLink to="/products" className="text-gray-500 font-normal px-3 py-1.5 transition-all duration-300">Products</NavLink>
                </li>
                <li className="flex items-center justify-center">
                  <NavLink to="/categories" className="text-gray-500 font-normal px-3 py-1.5 transition-all duration-300">Categories</NavLink>
                </li>
                <li className="flex items-center justify-center">
                  <NavLink to="/brands" className="text-gray-500 font-normal px-3 py-1.5 transition-all duration-300">Brands</NavLink>
                </li>
              </div>
            </div>
          </div>
          {token? <div className="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2">
            <Link to="/wishlist" className="relative" >
              <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 512 512" className="sm:mr-4 mr-2 text-[#0aad0a]" height={33} width={33} xmlns="http://www.w3.org/2000/svg">
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
              </svg>
              <span className="rounded-lg px-[5px] py-[3px] text-[9px] -left-1 top-0 absolute bg-red-600 text-white">{countWishList}</span>
            </Link >
            <Link to="/cart" className="relative">
              <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 1024 1024" className="sm:mr-4 mr-2 text-[#0aad0a]" height={35} width={35} xmlns="http://www.w3.org/2000/svg">
                <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z" />
              </svg>
              <span className="rounded-lg px-[5px] py-[3px] text-[9px] left-0 top-0 absolute bg-red-600 text-white">{numOfCart}</span>
            </Link >
            <div onClick={toggleAccount}  className="sm:mr-3 relative p-1 mr-1 text-center bg-[#0aad0a] rounded-full cursor-pointer">
              <span className="px-2 text-xl text-white">{FirstLetter(localStorage.getItem("name"))}</span>
            </div>
            <div  className= {`${isAccountOpen ? 'block' : 'hidden'} w-44 top-16 right-2 absolute z-10 bg-white divide-y divide-[#0aad0a] rounded-lg shadow`}>
              <div className="p-4 text-sm text-gray-900">
                <Link to={"/profile"} onClick={()=>{hideAccount()}} className="hover:text-green-900 font-medium text-[#0aad0a]">{capitalizeFirstLetter(localStorage.getItem("name"))}</Link>
                <div className="font-medium truncate">{localStorage.getItem("email")}</div>
                </div>
                <div onClick={()=>{ logout(),hideAccount()}} className="hover:bg-gray-100 hover:text-[#0aad0a] p-4 text-sm text-gray-700 cursor-pointer">Sign out</div>
                </div>
          </div>:<div className="md:static md:inset-auto md:ml-6 md:pr-0 absolute inset-y-0 right-0 flex items-center pr-2">
            <Link className="sm:py-2 sm:px-4 bg-transparent border-2 border-[#0aad0a] rounded-lg text-gray-500 sm:text-base hover:bg-[#0aad0a] hover:text-white text-sm pb-[5px] pt-1 px-2"
              to="/login">Sign In / Sign Up</Link>
          </div>}

        </div>
      </div>
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} px-2 pt-2 pb-3 space-y-1`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <li className="flex items-center justify-start ml-2">
            <Link onClick={hideNav} className="text-gray-500 px-3 py-1.5 rounded-md font-semibold transition-all duration-300 false m-1 text-base" to="/home">Home</Link></li>
          <li className="flex items-center justify-start ml-2">
            <Link onClick={hideNav} className="text-gray-500 px-3 py-1.5 rounded-md font-semibold transition-all duration-300 false m-1 text-base" to="/Products">Products</Link></li>
          <li className="flex items-center justify-start ml-2">
            <Link onClick={hideNav} className="text-gray-500 px-3 py-1.5 rounded-md font-semibold transition-all duration-300 false m-1 text-base" to="/Categories">Categories</Link></li>
          <li className="flex items-center justify-start ml-2">
            <Link onClick={hideNav} className="text-gray-500 px-3 py-1.5 rounded-md font-semibold transition-all duration-300 false m-1 text-base" to="/Brands">Brands</Link></li>
        </div>
      </div>

    </nav>





  </>
}