"use client"
import { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'
import { StudentNavbarData } from '../Helper/constant'
import "../../../styles/scss/globals.scss"
import "../../../styles/scss/AppliedJobs.scss"

const AppliedJobs = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])
  return (
    <div>
      <CustomLayout SideNavbarData={StudentNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Applied Jobs</h1>
          <CustomModal SideNavbarData={StudentNavbarData} />
          <Logout />
        </div>
      </CustomLayout>
    </div>
  )
}

export default AppliedJobs
