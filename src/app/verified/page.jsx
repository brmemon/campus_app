"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/Verified.scss"
import { AdminNavbarData, Table } from '../Helper/constant'
import MyTable from '../Components/Table'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'
import { useSelector } from 'react-redux'

const Verified = () => {
  const [pathname, setPathname] = useState()

  const selectorData = useSelector((state) => state.campus.verified);
  let Data = Object.values(selectorData);

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
          <MyTable tableData={Table} values={Data} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default Verified
