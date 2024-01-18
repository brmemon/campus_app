"use client"
import "../../../../styles/scss/ForgetPassword.scss"
import { Button } from '@mui/material'
import Input from '@/app/Components/Input'
import Link from 'next/link'
import AuthContainer from '../SideContainers/AuthContainer'
import { FaRegHandshake } from 'react-icons/fa6'
import { auth } from '@/app/firebase'
import React, { useEffect } from 'react';
import MainButton from "@/app/Components/MainButton"

const ForgetPassword = () => {
  useEffect(() => {
    const emailInput = document.getElementById('email');
    if (emailInput) {
    }
  }, []);

  const handleForgotPassword = async () => {
    try {
      const emailInput = document.getElementById('email');
      const email = emailInput ? emailInput.value : '';

      if (email) {
        await auth.sendPasswordResetEmail(email);
        console.log('Password reset email sent successfully');
      } else {
        console.error('Email input empty');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
    }
  };
  return (
    <div className='container'>
      <AuthContainer />
      <div className='main_container'>
        <div className='sub_container_two'>
          <FaRegHandshake className="media_logo" />
          <h1 className='login_logo'>Forgot Password</h1>
          <h2 className='login_welcome'>Get Back Your Acount Quickly And Easily</h2>
          <div className='forget_input' >
            <Input id="email" className={"input"} label="Email" />
          </div>
          <div className='MainButton_Parent'>
            <MainButton onClick={handleForgotPassword} text={"Forgot Password"}></MainButton >
          </div>
          <Button>
            <Link
              className='link'
              href="/auth/Login"
            >Back To Login
            </Link>
          </Button>
        </div>
      </div>
    </div >
  )
}

export default ForgetPassword