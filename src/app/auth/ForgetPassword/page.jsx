"use client"
import React from 'react'
import "../../../../styles/scss/ForgetPassword.scss"
import { Button } from '@mui/material'
import Input from '@/app/Components/Input'
import Link from 'next/link'
import MainButton from '@/app/Components/MainButton'
import AuthContainer from '../SideContainers/AuthContainer'
import { FaRegHandshake } from 'react-icons/fa6'

const Forgetpassword = () => {
  return (
    <div className='container'>
      <AuthContainer/>
      <div className='main_container'>
        <div className='sub_container_two'>
        <FaRegHandshake className="media_logo" />
          <h1 className='login_logo'>Forgot Password</h1>
          <h2 className='login_welcome'>Get Back Your Acount Quickly And Easily</h2>
          <div className='forget_input' >
            <Input className={"input"} label="Email" />
          </div>
          <div className='MainButton_Parent'>
            <MainButton text={"Forgot Password"} />
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
    </div>
  )
}

export default Forgetpassword