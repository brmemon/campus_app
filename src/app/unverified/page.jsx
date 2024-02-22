"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/UnVerified.scss"
import { AdminNavbarData, Table } from '../Helper/constant'
import "../../../styles/scss/globals.scss"
import MyTable from '../Components/Table'
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'
import { useSelector } from 'react-redux'
import withAuth from '../Auth'

const Unverified = () => {
  const [pathname, setPathname] = useState()

  const selectorData = useSelector((state) => state.campus.unVerified);
  let Data = Object.values(selectorData);

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
          <MyTable tableData={Table} values={Data} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default withAuth(Unverified)
