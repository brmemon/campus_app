"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "./style.scss"
import { AdminNavbarData, Table } from '../Helper/constant'
import MyTable from '../Components/Table'
import "../globals.css"
import Logout from '../Components/LogoutButton/page'
import CustomModal from '../Components/Modal'

const Verified = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  return (
    <div className='hey'>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Verified Users</h1>
          <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
          <Logout />
          <MyTable tableData={Table} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default Verified
