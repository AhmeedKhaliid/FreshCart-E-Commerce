
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
export default function Layout() {

  return <>
  <div className="flex flex-col h-screen">
  <Navbar />
    <Outlet />
    <Footer />
  </div>
  
  </>
}
