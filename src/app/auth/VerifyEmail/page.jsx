"use client"
import React from 'react'
import "../../../../styles/scss/VerifyEmail.scss"
import { FaRegHandshake } from 'react-icons/fa6'
import MainButton from '@/app/Components/MainButton'
import { useRouter } from 'next/navigation'

const VerificationEmail = () => {

    const router = useRouter();

    const handleLogout = () => {
        router.push('/auth/Login');
    };

    const handleResendVerification = () => {
        router.push('/');
    };

    return (
        <div className='varify_email_container'>
            <div className='verify_email'>
                <FaRegHandshake className="campus_logos" />
                <h1 className="text">Campus App</h1>
                <p className='email_text'>You are logged in as: bmemon123@gmail.com</p>
                <p className='email_text'>Email Verification link has been sent to your registered email,Kindly check your email in spam / junk.</p>
                <div className='Button_Parent'>
                    <MainButton text={"Log Out"} onClick={handleLogout} />
                </div>
                <MainButton text={"Resend Email Verification Link"} onClick={handleResendVerification}></MainButton >
            </div>
        </div>
    )
}

export default VerificationEmail
