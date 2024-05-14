import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { Button, Input } from '../components';
import { login } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [error, setError] = useState("");
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signUp = async(data) => {
    console.log("data", data)
    setError("");
    try {
      const user = await authService.createAccount(data);
      if(user) {
        const userData = await authService.getCurrentUser();
        if(userData) {
          dispatch(login({userData}));
          navigate("/");
        }
      }
    } catch (error) {
      console.log("signUp error", error)
      setError(error.message);
    }
  }

  return (
    <div className='bg-gray-400 h-screen flex justify-center'>
      <div className='w-1/2 bg-white h-fit mt-20 p-4 pl-5 rounded-lg'>
        <h1 className='text-center text-2xl font-semibold p-3 underline'>Sign Up Form here</h1>
        
      {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(signUp)} >
          <Input
            label="Full name"
            placeholder="Enter Your Name"
            type="text"
            {...register("name",{
              required:true
            })}
          />
          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register("email", {
              required: true,
              validate: {
                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
              }
            })}
          />
          <Input 
            label="password"
            placeholder="Enter your password"
            type="password"
            {...register("password", {
              required: true
            })}
          />
          <Button type='submit' className='text-white w-full mt-4 mb-2 p-2 bg-gray-500'>SignUp</Button>
          <div className=''>
          <p className='text-center text-sm font-semibold text-gray-500'>Already have an account? 
        <Link className='text-red-500' to={"/login"}> SignIn</Link>
        </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp