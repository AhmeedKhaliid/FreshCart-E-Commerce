import {  useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useMutation, } from '@tanstack/react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { Helmet } from 'react-helmet'


export default function ResetCode() {
  let navi = useNavigate()

  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values);
    },
    onSuccess: () => {
      // Display a success toast
      toast.success('Your Code is Verified Successfully');
      navi('/resetpassword'); // Navigate to login page after success
     

    },
    onError: (error) => {
      // Handle error case and show a toast message
   
      toast.error(error.response.data.message); // Display error toast
    },
  });

  let validationSchema = Yup.object().shape(
    {
      resetCode: Yup.string().matches(/^[0-9]{5}$/, "Code must be valid 5 number").required("Code is required"),

    }
  )

  let formikCode = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: (values) => {
      mutation.mutate(values);
    },
    validationSchema
  })

  if (mutation.isPending) {
    return <LoadingScreen />
  }

  const notify = () => toast();

  return <>
  <Helmet> <title>Reset Code</title></Helmet>
<div className=" bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">Enter Your Reset Code</h2>
      <form onSubmit={formikCode.handleSubmit} className="select-none">
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium" htmlFor="resetCode">Reset Code</label>
            {formikCode.errors.resetCode && formikCode.touched.resetCode? <p className="text-sm text-red-600">{formikCode.errors.resetCode}</p> : null }
          </div>
          
          <input onBlur={formikCode.handleBlur} onChange={formikCode.handleChange} value={formikCode.values.email} type="text" name="resetCode" id="resetCode" placeholder="Your reset code..." className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"  />
          <button  disabled = {!formikCode.isValid || !formikCode.dirty?true:false} onClick={notify}  type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c]  disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto md:w-[75%] block mt-12 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A]  rounded-lg cursor-pointer">Verify</button>
        </div>
      </form>
    </section>
  </main>
</div>

  </>
}
