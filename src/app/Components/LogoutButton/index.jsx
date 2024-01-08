import React from 'react'
import MainButton from '../MainButton'
import "../../../../styles/scss/LogoutButton.scss"
import Link from 'next/link'
const Logout = () => {
  return (
    <div className='Main_logout_button'>
      <Link
        href="/auth/Login"
      >
        <MainButton text={"Log Out"} />
      </Link>
    </div>
  )
}

export default Logout
