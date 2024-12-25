import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useMutation, } from '@tanstack/react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import {  toast } from 'react-toastify';
import * as Yup from "yup"
import { Helmet } from 'react-helmet'

export default function ResetPassword() {
  let navi = useNavigate()
const [passwordVisible, setPasswordVisible] = useState(false);
  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values);
    },
    onSuccess: () => {
      // Display a success toast
      toast.success('Your Password is Reset Successfully, please signin again');
      navi('/login'); // Navigate to login page after success
      

    },
    onError: () => {
      // Handle error case and show a toast message
      toast.error("Failed to Reset Password"); // Display error toast
    },
  });

  let validationSchema = Yup.object().shape(
    {
      email: Yup.string().email("Email must be valid email").required("Email is required"),
      newPassword: Yup.string().matches(/^[A-Za-z0-9]{6,10}$/, "Password must include letters and numers min 6 max 10").required("Password is required"),

    }
  )

  let formikReset = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
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
  <Helmet> <title>Reset Password</title></Helmet>
<div className="bg-[url('/src/assets/light-patten.svg')] bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">Reset your account password</h2>
      <form onSubmit={formikReset.handleSubmit} className="select-none">
        <div className="mb-6">
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="email">Email</label>
              {formikReset.errors.email && formikReset.touched.email? <p className="text-sm text-red-600">{formikReset.errors.email}</p> : null }
            </div>
            <input onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} value={formikReset.values.email} type="email" name="email"  id="email" placeholder="Email..." className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
          </div>
          <div className="mb-6">
            <div className="flex justify-between mb-3">
              <label className="text-sm font-medium" htmlFor="newPassword">New Password</label>
              {formikReset.errors.newPassword && formikReset.touched.newPassword? <p className="text-sm text-red-600">{formikReset.errors.newPassword}</p> : null }
            </div>
            <div className="flex">
              <input onBlur={formikReset.handleBlur} onChange={formikReset.handleChange} value={formikReset.values.password} type={passwordVisible ? "text" : "password"} name="newPassword"  id="newPassword" placeholder="******" className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2" />
              <span className="flex items-center justify-around cursor-pointer">
              {passwordVisible?<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>:<svg onClick={togglePassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                          </path>
                        </svg> }
              </span>
            </div>
          </div>
          <button  disabled = {!formikReset.isValid || !formikReset.dirty?true:false} onClick={notify}  type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c]  disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto md:w-[75%] block mt-12 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A]  rounded-lg cursor-pointer">Verify</button>
        </div>
      </form>
    </section>
  </main>
</div>

  </>
}
