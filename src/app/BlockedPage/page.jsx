import React from 'react'
import "../../../styles/scss/BlockPage.scss"
import "../../../styles/scss/LogoutButton.scss"
import "../../../styles/scss/LoginAndAuthContainer.scss"
import AuthContainer from '../auth/SideContainers/AuthContainer'
import { ToastContainer } from 'react-toastify'
import { FaRegHandshake } from 'react-icons/fa6'
import MainButton from '../Components/MainButton'
import Link from 'next/link'
import { MdBlock } from 'react-icons/md'
const BlockPage = () => {
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
          <h2 className='login_welcome'>You Are Blocked By Admin</h2>
          <div className='MainButton_Parent'>
            <Link
              className='link'
              href="/auth/Login">
              <MainButton
                type="submit"
                text="LogOut" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlockPage