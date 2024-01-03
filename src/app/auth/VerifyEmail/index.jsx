import React from 'react'
import "./style.scss"
import { FaRegHandshake } from 'react-icons/fa6'
import Link from 'next/link'
import MainButton from '@/app/Components/MainButton'

const VerifyEmail = () => {
    return (
        <div className='varify_email_container'>
            <div className='verify_email'>
                <FaRegHandshake className="campus_logos" />
                <h1 className="text">Campus App</h1>
                <p className='email_text'>You are logged in as: bmemon123@gmail.com</p>
                <p className='email_text'>You are not verified yet! wait until you get verified by your Admin</p>
                <div className='Button_Parent'>
                    <Link
                        className='link'
                        href="/auth/Login"
                    >
                        <MainButton text={"Log Out"} />
                    </Link>
                </div>
                <MainButton text={"Resend Email Verification Link"}></MainButton >
            </div>
        </div>
    )
}

export default VerifyEmail
