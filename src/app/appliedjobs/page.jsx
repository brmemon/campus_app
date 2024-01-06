"use client"
import { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import Logout from '../Components/LogoutButton/page'
import CustomModal from '../Components/Modal'
import MyTable from '../Components/Table'
import { StudentNavbarData, Table } from '../Helper/constant'
import "../globals.scss"
import "./style.scss"

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
          <MyTable tableData={Table} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default AppliedJobs
