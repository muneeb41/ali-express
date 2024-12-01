import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../lib/apiClient';
import { useDispatch  } from 'react-redux';
import { signup } from '../../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/ui/loading/Loading.jsx';
import { SIGNUP_ROUTES } from '../../utils/constants';


const Signup = () => {
    /////////////////////////////////////////////////// STATE INITIALIZATION ///////////////////////////////////////////////
  const [formData, setFormData] = useState({
    name:'',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateSignupData = (data) =>{
    if(data.email === '' || data.password === '' || data.confirmPassword === '' || data.name === ''){
      toast.error('All fields are required')
      return false;
    }
    if(data.password.length < 4){
      toast.error('Password must be at least 4 characters long')
      return false;
    }
    if(data.password!== data.confirmPassword){
      toast.error('Passwords do not match')
      return false;
    }
    return true;
  }



  /////////////////////////////////////////////////// FORM SUBMIT ///////////////////////////////////////////////
  const handleSubmit = async (e) => {
    e.preventDefault();

    // validation of form data 
   if(!validateSignupData(formData)) return;

  
    try {
      setLoading(true);
      const { email, password , name} = formData;
      const response = await apiClient.post(SIGNUP_ROUTES, {email , password,name});
      console.log(response);
      toast.success('Signup successful')
      setFormData({
        name : '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      dispatch(signup(response.data.user))
      navigate('/');
        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // Handle 400 errors (Bad Request)
            const { message } = error.response.data;
            toast.warn(message);
          } else {
            // Handle other errors (e.g., network issues)
            toast.error('Something went wrong! Please try again.');
            console.error('Error during sign-up:', error);
          }
    }finally{
      setLoading(false);
    }
  };


/////////////////////////////////////////////////// LOADING COMPONENT ///////////////////////////////////////////////
  // loading state check  and return loading component if loading is true
  if(loading) return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900'>
       <Loading />
    </div>
  )
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 transition-all">
          {/*///////////////////////////////////////// BACK TO HOME BUTTON ///////////////////////////////////////////////  */}
          <div className='absolute top-6 left-8'>
            <Link to="/" className="text-sm text-gray-700   hover:text-blue-500">
              <span className='font-bold text-5xl my-auto relative top-2 '>&larr;</span>
              <span className='font-semibold text-xl'>Back to Home</span>
            </Link>
         </div>
  {/* //////////////////////////////////////////////////////// SIGNUP FORM ////////////////////////////////////////////////////////// */}
      <div className="w-full max-w-md bg-white  p-8 rounded-lg  mt-52 sm:mt-10 box-shadow-main animate-slide-from-down">
        <h2 className="text-2xl font-bold text-center text-gray-700  mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
           {/* Name Field */}
           <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50  border border-gray-300  rounded-lg text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 "
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50  border border-gray-300  rounded-lg text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50  border border-gray-300  rounded-lg text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 "
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 bg-gray-50  border border-gray-300  rounded-lg text-gray-700  focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700   transition-colors duration-300"
            >
              Sign Up
            </button>
          </div>
          <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          <p className=" text-center">Already have an account?</p>
          <Link to="/login"
           className=" text-blue-400 cursor-pointer hover:underline font-bold"
          >
                Login
          </Link>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;