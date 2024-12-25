import  { useContext, useState } from 'react'
import logo from '../../assets/signin-DlR7P608.png'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useMutation, } from '@tanstack/react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import {  toast } from 'react-toastify';
import * as Yup from "yup"
import { userContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'
import { jwtDecode } from 'jwt-decode'
    
export default function Login() {

  let navi = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
   let { setToken,setname,setemail ,setUserId } = useContext(userContext);
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);
    },
    onSuccess: (data) => {
      // Display a success toast
      toast.success('welcome to Fresh Cart');
      navi('/'); // Navigate to login page after success
      setname(data.data.user.name)
      setemail(data.data.user.email)
      setToken(data.data.token);
      setUserId(data.data.token);
      localStorage.setItem("token", data.data.token);
      const decoded = jwtDecode(localStorage.getItem("token"));
      localStorage.setItem("name", data.data.user.name);
      localStorage.setItem("email", data.data.user.email);
      localStorage.setItem("Userid",decoded.id);
      
    },
    onError: (error) => {
      // Handle error case and show a toast message
      toast.error(error.response.data.message); // Display error toast
    },
  });

  let validationSchema = Yup.object().shape(
    {
      email: Yup.string().email("Email must be valid email").required("Email is required"),
      password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password must include letters and numers min 6 max 10").required("Password is required"),

    }
  )

  let formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    validationSchema
  })

  if (mutation.isPending) {
    return <LoadingScreen />
  }


  const togglePassword = () => {
    setPasswordVisible(prev => !prev);
  };

  const notify = () => toast();






  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
 <div className="bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="md:my-20 my-8">
      <div className="container px-4 mx-auto">
        <div className="justify-evenly md:flex-row flex flex-col items-center">
          <div className="lg:order-1 order-2 px-4">
            <img src={logo} alt="signin-img" />
          </div>
          <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
            <div className="lg:mb-10 mb-6">
              <h1 className="mb-1 text-3xl font-bold text-gray-700">Sign in to FreshCart</h1>
              <p className="mt-0 mb-4">Welcome back to FreshCart! Enter your email to get started.</p>
            </div>
            <form onSubmit={formikLogin.handleSubmit}  className="select-none">
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  {formikLogin.errors.email && formikLogin.touched.email? <p className="text-sm text-red-600">{formikLogin.errors.email}</p> : null }

                </div>
                <input onBlur={formikLogin.handleBlur} onChange={formikLogin.handleChange} value={formikLogin.values.email} type="email" name="email" id="email" placeholder="Email" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"  />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-3">
                  <label className="text-sm font-medium" htmlFor="password">Password</label>
                  {formikLogin.errors.password && formikLogin.touched.password? <p className="text-sm text-red-600">{formikLogin.errors.password}</p> : null }

                </div>
                <div className="flex">
                  <input  onBlur={formikLogin.handleBlur} onChange={formikLogin.handleChange} value={formikLogin.values.password} type={passwordVisible ? "text" : "password"} name="password"  id="password" placeholder="******" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"  />
                  <span className="flex items-center justify-around cursor-pointer">
                  {passwordVisible?<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>:<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                          </path>
                        </svg> }
                  </span></div>
              </div>
              <button disabled = {!formikLogin.isValid || !formikLogin.dirty?true:false} onClick={notify} type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer">Sign In</button>
              <p className="mt-5 text-base font-medium">You don’t have an account? <Link to={"/register"} className="text-[#0AAD0A]">Sign Up</Link></p>
              <Link className="block mt-2 text-base font-medium text-[#0AAD0A]" to="/ForgetPassword">Forget Your Password?</Link>
            </form></div>
        </div></div>
    </section>
  </main>
</div>

  </>
}