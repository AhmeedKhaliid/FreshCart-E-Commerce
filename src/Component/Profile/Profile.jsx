import { useContext, useState, } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { userContext } from '../../Context/UserContext';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Helmet } from 'react-helmet';
import {  useNavigate } from 'react-router-dom';
export default function Profile() {
  const [isPasswordSectionOpen, setIsPasswordSectionOpen] = useState(false); // State to toggle the password section visibility
  const [isUserSectionOpen, setIsUserSectionOpen] = useState(false); // State to toggle the password section visibility
  let { setname, setemail, setPhone,name } = useContext(userContext)
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  let navi = useNavigate()
  const token = localStorage.getItem('token');
  // Password Change Mutation

  const changePasswordMutation = useMutation({
    mutationFn: (data) => {
      return axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', data, { headers: { token } }
      );
    },
    onSuccess: () => {

      toast.success('Password updated successfully!');
      passwordFormik.resetForm()
      localStorage.removeItem("token")
      navi("/login")


    },
    onError: (err) => {
      toast.error(err.response?.data?.errors?.msg || 'Error occurred while changing password');
      
      // Display error toast
    },
  });
  // User Data Update Mutation
  const updateUserMutation = useMutation({

    mutationFn: (data) => {
      return axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', data, { headers: { token } }
      );
    },
    onSuccess: (data) => {

      toast.success('User information updated successfully!');
      setname(data?.data?.user?.name);
      setemail(data.data.user.email);
      localStorage.setItem("name", data?.data?.user?.name);
      localStorage.setItem("email", data.data.user.email);
      userFormik.resetForm()


      

    },
    onError: (err) => {
      toast.error(err.response?.data?.errors?.msg || 'Error occurred while updating user information'); // Display error toast
    },
  });


  // Form validation for password change
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: ""
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Current password is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
      rePassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password')
    }),
    onSubmit: (values) => {
      changePasswordMutation.mutate(values);
    }
  });

  // Form validation for user info update
  const userFormik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string().required('Phone number is required')
    }),
    onSubmit: (values) => {
      updateUserMutation.mutate(values);
    }
  });
  const toggleCurrentPassword = () => {
    setCurrentPasswordVisible((prev) => !prev);
  };

  const toggleNewPassword = () => {
    setNewPasswordVisible((prev) => !prev);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordVisible((prev) => !prev);
  };
  const notify = () => toast();
  const capitalizeFirstLetter = (name) => {
    return String(name).charAt(0).toUpperCase() + String(name).slice(1);
}
  if (updateUserMutation.isPending || changePasswordMutation.isPending) {
    return <LoadingScreen />
  }
  return <>
  <Helmet> <title>Profile</title></Helmet>
    <div className="bg-center flex-1 mt-16">
      <main className="container px-4 mx-auto overflow-hidden">
        <section className="md:my-16 my-8">
          <h1 className='text-center mb-8 text-7xl font-medium text-[#0aad0a]' >Welcome </h1>
          <h2 className="text-center mb-8 text-3xl font-medium text-gray-500">{capitalizeFirstLetter(name)}</h2>
          <h2 className="mb-8 text-3xl font-medium text-gray-500">Update Profile</h2>

          <button
            className= "sm:py-2 sm:px-4 bg-transparent border-2 border-[#0aad0a] rounded-lg text-gray-500 sm:text-base hover:bg-[#0aad0a] hover:text-white text-sm pb-[5px] w-full pt-1 px-2 transition-all duration-300 transform mb-4 "
            onClick={() => setIsPasswordSectionOpen((prev) => !prev)}
          >
            {isPasswordSectionOpen ? 'Hide Change Password' : 'Change Password'}
          </button>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isPasswordSectionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <form onSubmit={passwordFormik.handleSubmit} className="mb-8 bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-500">Change Password</h3>
              <div className='mb-4'>
                <div className="flex justify-between mb-3">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>

                  {passwordFormik.touched.currentPassword && passwordFormik.errors.currentPassword ? (
                    <div className="text-red-600 text-sm">{passwordFormik.errors.currentPassword}</div>
                  ) : null}
                </div>
                < div className="flex">
                  <input
                    id="currentPassword"
                    name="currentPassword"
                    type={currentPasswordVisible  ? "text" : "password"}
                    className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                    value={passwordFormik.values.currentPassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  <span className="flex items-center justify-around cursor-pointer">
                    {currentPasswordVisible  ? <svg onClick={toggleCurrentPassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg onClick={toggleCurrentPassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                      </path>
                    </svg>}
                  </span>
                </div>
              </div>
              <div className='mb-4'>
                <div className="flex justify-between mb-3">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Current Password</label>

                  {passwordFormik.touched.password && passwordFormik.errors.password ? (
                    <div className="text-red-600 text-sm">{passwordFormik.errors.password}</div>
                  ) : null}
                </div>
                < div className="flex">
                  <input
                    id="password"
                    name="password"
                    type={newPasswordVisible  ? "text" : "password"}
                    className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                    value={passwordFormik.values.password}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  <span className="flex items-center justify-around cursor-pointer">
                    {newPasswordVisible  ? <svg onClick={toggleNewPassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg onClick={toggleNewPassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                      </path>
                    </svg>}
                  </span>
                </div>
              </div>
              <div className='mb-4'>
                <div className="flex justify-between mb-3">
                  <label htmlFor="rePassword" className="block text-sm font-medium text-gray-700">Current Password</label>

                  {passwordFormik.touched.rePassword && passwordFormik.errors.rePassword ? (
                    <div className="text-red-600 text-sm">{passwordFormik.errors.rePassword}</div>
                  ) : null}
                </div>
                < div className="flex">
                  <input
                    id="rePassword"
                    name="rePassword"
                    type={confirmPasswordVisible ? "text" : "password"}
                    className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                    value={passwordFormik.values.rePassword}
                    onChange={passwordFormik.handleChange}
                    onBlur={passwordFormik.handleBlur}
                  />
                  <span className="flex items-center justify-around cursor-pointer">
                    {confirmPasswordVisible ? <svg onClick={toggleConfirmPassword} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> : <svg onClick={toggleConfirmPassword} stroke="currentColor" fill="none" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true" className="absolute mr-12" height={25} width={25} xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21">
                      </path>
                    </svg>}
                  </span>
                </div>
              </div>
              <button disabled={!passwordFormik.isValid || !passwordFormik.dirty ? true : false} onClick={notify} type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer">Update Password</button>
            </form>
          </div>
          <button
            className= "sm:py-2 sm:px-4 bg-transparent border-2 border-[#0aad0a] rounded-lg text-gray-500 sm:text-base hover:bg-[#0aad0a] hover:text-white text-sm pb-[5px] w-full pt-1 px-2 transition-all duration-300 transform "
            onClick={() => setIsUserSectionOpen((prev) => !prev)}
          >
            {isUserSectionOpen ? 'Hide Update Personal' : 'Update Personal Information'}
          </button>
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isUserSectionOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>

          <form onSubmit={userFormik.handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-500">Update Personal Information</h3>
            <div className="mb-4">
            <div className="flex justify-between mb-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              {userFormik.touched.name && userFormik.errors.name ? (
                <div className="text-red-500 text-sm">{userFormik.errors.name}</div>
              ) : null}
              </div>
              <input
                id="name"
                name="name"
                type="text"
                className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                value={userFormik.values.name}
                onChange={userFormik.handleChange}
                onBlur={userFormik.handleBlur}
              />
             
            </div>
            <div className="mb-4">
            <div className="flex justify-between mb-3">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              {userFormik.touched.email && userFormik.errors.email ? (
                <div className="text-red-500 text-sm">{userFormik.errors.email}</div>
              ) : null}
              </div>
              <input
                id="email"
                name="email"
                type="email"
                className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                value={userFormik.values.email}
                onChange={userFormik.handleChange}
                onBlur={userFormik.handleBlur}
              />
            
            </div>
            <div className="mb-4">
            <div className="flex justify-between mb-3">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              {userFormik.touched.phone && userFormik.errors.phone ? (
                <div className="text-red-500 text-sm">{userFormik.errors.phone}</div>
              ) : null}
              </div>
              <input
                id="phone"
                name="phone"
                type="text"
                className="h-[40px] w-full rounded-lg border border-solid border-gray-300 px-4 focus:shadow-input-focus focus:outline-none font-medium py-2"
                value={userFormik.values.phone}
                onChange={userFormik.handleChange}
                onBlur={userFormik.handleBlur}
              />
            
            </div>
            <button disabled={!userFormik.isValid || !userFormik.dirty ? true : false} onClick={notify} type="submit" className="hover:bg-[#088A08] focus:ring-[#6cce6c] disabled:opacity-65 disabled:cursor-not-allowed w-full px-4 py-2 mx-auto mt-5 font-semibold text-center text-white transition-all duration-300 bg-[#0AAD0A] rounded-lg cursor-pointer">Update Personal Information</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  </>

};


