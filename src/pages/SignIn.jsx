import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {Input, Button} from "../components/index"
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authService from "../appwrite/auth";
import { login as authLogin } from '../store/authSlice';

const SignIn = () => {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("")

  const login = async(data) => {
    console.log("login data", data);
    setError("");
    try {
      const session = await authService.login(data);
    if(session) {
      const userData = await authService.getCurrentUser();
      console.log(userData);
      if(userData){
        dispatch(authLogin({userData}));
      }
      navigate("/")
    }
    } catch (error) {
      console.log("error is in signIn", error);
      setError(error.message);
    }
  }

  return (
    <div className='bg-gray-400 h-screen flex justify-center'>
      <div className='w-1/2 bg-white h-fit mt-20 p-4 rounded-lg'>
        <h1 className='text-center text-2xl font-semibold p-3 underline'>Login In form here</h1>
        
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit(login)}>

        <Input
        className=""
        label="Email"
        type="email"
        {...register("email", {
          required: true,
          validate: {
            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
          }
        })}
        placeholder="Enter email here"
        />

        <Input
        label="Password"
        type="password"
        placeholder="enter password"
        {...register("password", {
          required: true
        })}
        />

        <Button type='submit' className='w-full bg-gray-500 text-white p-2 mt-4 mb-2'>Sign In</Button>
        <div className=''>
          <p className='text-center text-sm font-semibold text-gray-500'>Don't have an account? 
        <Link className='text-red-500' to={"/signup"}> SignUp</Link>
        </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn