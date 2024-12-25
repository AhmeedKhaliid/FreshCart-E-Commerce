import  { useContext, useState } from 'react'

import logo from '../../assets/signup-g-Dtp6-wtD.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useMutation, } from '@tanstack/react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { userContext } from '../../Context/UserContext'
import { Helmet } from 'react-helmet'




export default function Register() {
  let { setToken,setname,setemail  } = useContext(userContext);

  let navi = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false);
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
    },
    onSuccess: (data) => {
      // Display a success toast
      toast.success('Thanks for create account, please Login to your Account.');
      navi('/login'); // Navigate to login page after success
      setname(data.data.user.name)
      setemail(data.data.user.email)
      setToken(data.data.token);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("name", data.data.user.name);
      localStorage.setItem("email", data.data.user.email);

    },
    onError: (error) => {
      // Handle error case and show a toast message
      toast.error(error.response.data.message); // Display error toast
    },
  });

  let validationSchema = Yup.object().shape(
    {
      name: Yup.string().min(3, "Minimum 3 letters").max(13, "Maximum 13 letter").required("Name is required"),
      email: Yup.string().email("Email must be valid email").required("Email is required"),
      phone: Yup.string().matches(/^01[1250][0-9]{8}$/, "Invalid phone number").required("Phone is required"),
      password: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password must include letters and numers min 6 max 10").required("Password is required"),
      rePassword: Yup.string().oneOf([Yup.ref("password")], "Must match password").required("Repassword is required")

    }
  )

  let formikRegister = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
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
  <Helmet> <title>Sign Up</title></Helmet>
    <div className="bg-center flex-1 mt-16">
      <main className="container px-4 mx-auto overflow-hidden">
        <section className="md:my-16 my-8">
          <div className="container px-4 mx-auto">
            <div className="justify-evenly md:flex-row flex flex-col items-center">
              <div className="lg:order-1 order-2 px-4">
                <img src={logo} />
              </div>
              <div className="lg:order-2 md:mb-0 order-1 px-4 mb-10">
                <div className="mb-6">
                  <h1 className="mb-1 text-3xl font-bold text-gray-700">Get Start Shopping</h1>
                  <p className="mt-0 mb-2">Welcome to FreshCart! Enter your email to get started.</p>
                </div>
                <form onSubmit={formikRegister.handleSubmit} className="select-none">
                  <div className="mb-2">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium" htmlFor="name">Name</label>
                      {formikRegister.errors.name && formikRegister.touched.name ? <p className="text-sm text-red-600">{formikRegister.errors.name}</p> : null}
                    </div>
                    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.name} type="text" name="name" id="name" placeholder="Name" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium" htmlFor="email">Email</label>
                      {formikRegister.errors.email && formikRegister.touched.email? <p className="text-sm text-red-600">{formikRegister.errors.email}</p> : null }
                      </div>
                    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.email} type="email" name="email" id="email" placeholder="Email" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium" htmlFor="phone">Phone</label>
                      {formikRegister.errors.phone && formikRegister.touched.phone? <p className="text-sm text-red-600">{formikRegister.errors.phone}</p> : null }
                      </div>
                    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.phone} type="tel" id="phone" name="phone" placeholder="Phone" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium" htmlFor="password">Password</label>
                      {formikRegister.errors.password && formikRegister.touched.password? <p className="text-sm text-red-600">{formikRegister.errors.password}</p> : null }
                      </div>
                    <div className="flex">
                      <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.password} type={passwordVisible ? "text" : "password"} name="password" id="password" placeholder="******" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                      <span className="flex items-center justify-around cursor-pointer">
                        {passwordVisible?<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>:<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                          </path>
                        </svg> }
                        
                      </span>
                    </div>
                  </div>
                  <div className="mb-2">
                    <div className="flex justify-between mb-3">
                      <label className="text-sm font-medium" htmlFor="rePassword">rePassword</label>
                      {formikRegister.errors.rePassword && formikRegister.touched.rePassword? <p className="text-sm text-red-600">{formikRegister.errors.rePassword}</p> : null }

                    </div>
                    <input onBlur={formikRegister.handleBlur} onChange={formikRegister.handleChange} value={formikRegister.values.rePassword} type="password" name="rePassword" id="rePassword" placeholder="******" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
                  </div>
                  <button disabled = {!formikRegister.isValid || !formikRegister.dirty?true:false} onClick={notify} type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer" >Sign Up</button>
                  <p className="mt-5 text-base font-medium">You have an account? <Link className="text-[#0AAD0A]" to="/login">Sign in</Link>
                  </p></form>
              </div></div>
          </div>
        </section>
      </main>
    </div>
  </>

}