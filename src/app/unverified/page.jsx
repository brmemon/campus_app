"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "./style.scss"
import { AdminNavbarData, Table} from '../Helper/constant'
import "../globals.scss"
import MyTable from '../Components/Table'
import Logout from '../Components/LogoutButton/page'
import CustomModal from '../Components/Modal'

const Unverified = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
    useEffect(() => {
        setPathname(window.location.pathname)
    }, [temper])

  return (
    <div>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname}>
        <div className='all_path'>
        <h1 className='top_heading'>UnVerified Users</h1>
        <CustomModal SideNavbarData={AdminNavbarData} />
        <Logout />
          <MyTable tableData={Table}/>
        </div>
      </CustomLayout>
    </div>
  )
}

export default Unverified
