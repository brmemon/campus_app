"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/Jobs.scss"
import { StudentNavbarData, Table } from '../Helper/constant'
import MyTable from '../Components/Table'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton/page'
import CustomModal from '../Components/Modal'

const Jobs = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  return (
    <div>
      <CustomLayout SideNavbarData={StudentNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Jobs</h1>
          <CustomModal SideNavbarData={StudentNavbarData} />
          <Logout />
          <MyTable tableData={Table} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default Jobs
