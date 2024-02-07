"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/StudentApplied.scss"
import { CompanyNavbarData } from '../Helper/constant'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'

const StudentApplied = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Student Applied</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
        </div>
      </CustomLayout>
    </div>
  )
}

export default StudentApplied
