import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useMutation, } from '@tanstack/react-query'
import LoadingScreen from '../LoadingScreen/LoadingScreen'
import { toast } from 'react-toastify';
import * as Yup from "yup"
import { Helmet } from 'react-helmet'
export default function ForgetPassword() {
    let navi = useNavigate()

  const mutation = useMutation({
    mutationFn: (values) => {
      return axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values);
    },
    onSuccess: () => {
      // Display a success toast
      toast.success('Reset code was sent to your email Successfully');
      navi('/resetcode'); // Navigate to login page after success

    },
    onError: (error) => {
      // Handle error case and show a toast message
      toast.error(error.response.data.message); // Display error toast
    },
  });

  let validationSchema = Yup.object().shape(
    {
      email: Yup.string().email("Email must be valid email").required("Email is required"),

    }
  )

  let formikForget = useFormik({
    initialValues: {
      email: "",
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
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
<div className=" bg-center flex-1 mt-16">
  <main className="container px-4 mx-auto overflow-hidden">
    <section className="px-2 py-12">
      <h2 className="mb-8 text-3xl font-medium text-gray-500">Please Enter Your Email</h2>
      <form onSubmit={formikForget.handleSubmit} className="select-none">
        <div className="mb-6">
          <div className="flex justify-between mb-3">
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            {formikForget.errors.email && formikForget.touched.email? <p className="text-sm text-red-600">{formikForget.errors.email}</p> : null }
          </div>
          <input onBlur={formikForget.handleBlur} onChange={formikForget.handleChange} value={formikForget.values.email} type="email" name="email" id="email" placeholder="Your Email..." className="h-[45px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"  />
          <button  disabled = {!formikForget.isValid || !formikForget.dirty?true:false} onClick={notify}  type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c]  disabled:opacity-65 disabled:cursor-not-allowed flex-1 w-full px-4 py-2 mx-auto md:w-[75%] block mt-12 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A]  rounded-lg cursor-pointer">Verify</button>
        </div>
      </form>
    </section>
  </main>
</div>

    </>
  
}