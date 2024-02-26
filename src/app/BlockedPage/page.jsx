"use client"
import React from 'react'
import "../../../styles/scss/BlockPage.scss"
import "../../../styles/scss/LogoutButton.scss"
import "../../../styles/scss/LoginAndAuthContainer.scss"
import AuthContainer from '../auth/SideContainers/AuthContainer'
import { ToastContainer } from 'react-toastify'
import { FaRegHandshake } from 'react-icons/fa6'
import MainButton from '../Components/MainButton'
import { MdBlock } from 'react-icons/md'
import { useRouter } from 'next/navigation';
import { auth } from '../firebase'
import withAuth from '../Auth'

const BlockPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    auth.signOut() 
      .then(() => { 
        router.push('/auth/Login');
      })
      .catch(error => {
        console.error('Error LogOut:', error);
      });
  };

  return (
    <div className="container">
      <AuthContainer />
      <ToastContainer />
      <div className='main_container'>
        <div className="sub_container_two">
          <FaRegHandshake className="media_logo" />
          <div className='logo_text_display'>
            <h1 className="login_logo"> Block </h1>
            <MdBlock className="campus_logo" />
          </div>
          <h2 className='login_welcome'>Your Account Is Blocked</h2>
          <div className='MainButton_Parent'>
            <MainButton
              onClick={handleLogout}
              text="LogOut" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(BlockPage)
