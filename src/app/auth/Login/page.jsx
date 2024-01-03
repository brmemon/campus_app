"use client"
import React, { useState } from 'react';
import './style.scss';
import Input from '@/app/Components/Input';
import Link from 'next/link';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import AuthContainer from '../SideContainers/AuthContainer';
import { FaRegHandshake } from 'react-icons/fa6';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <AuthContainer />
      <div className='main_container'>
        <div className="sub_container_two">
        <FaRegHandshake className="media_logo" />
          <h1 className="login_logo">
            Login
          </h1>
          <h2 className='login_welcome'>
            Welcome Back! Login To Your Account
          </h2>
          <div className="login_input">
            <Input className="input" label="Email" />
            <FormControlInput label={"Password"} />
          </div>
          <span className="forget">
            <Link
              href="/auth/ForgetPassword"
              className="forget_button">
              Forgot Password?
            </Link>
          </span>
          <div className='MainButton_Parent'>
            <MainButton text={"Login"} />
          </div>
          <p className='sinUp_text'>
            Don't Have An Account ?
            <Link
              className='link'
              href="/auth/Signup"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
