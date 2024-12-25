import React from 'react'
import style from './Notfound.module.css'
import logo from '../../assets/freshcart-logo-Ctk0WIKS.svg'
import error from '../../assets/error-B1_ZqxX0.svg'
import { Link } from 'react-router-dom'

export default function Notfound() {

  return <>
<div className="lg:px-20 container px-10 mx-auto">
  <div className="lg:gap-5 flex flex-col justify-center w-full h-screen gap-10">
    <div><Link to="/"><img src={logo} alt="freshCart-log" /></Link>
    </div>
    <div className="lg:flex-row lg:items-center flex flex-col items-start justify-between">
      <div>
        <h1 className="mb-4 text-4xl font-semibold">Something’s wrong here…</h1>
        <p className="mt-2 mb-8 text-sm font-medium text-gray-500">We can’t find the page you’re looking for.<br />Check out our help center or head back to home.</p>
        <div className="lg:mb-0 flex gap-5 mb-10">
          <button className="hover:bg-gray-700 sm:w-auto w-full px-[17px] py-[9px] font-semibold text-center text-white transition-all duration-300 bg-[#001e2b] rounded-md cursor-pointer whitespace-nowrap">Help Center</button>
          <Link to="/" className="hover:bg-[#088A08] focus:ring-[#6cce6c] sm:w-auto w-full px-[17px] py-[9px] font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-md whitespace-nowrap" >Back to Home</Link>
        </div>
      </div>
      <div><img src={error} alt="error-img" />
      </div>
    </div>
  </div>
</div>

  </>
}
