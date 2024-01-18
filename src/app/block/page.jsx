"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/Block.scss"
import { AdminNavbarData, Table } from '../Helper/constant'
import MyTable from '../Components/Table'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'

const Block = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  return (
    <div>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Block</h1>
          <CustomModal SideNavbarData={AdminNavbarData} />
          <Logout />
          <MyTable tableData={Table} />
        </div>
      </CustomLayout>
    </div>
  )
}

export default Block
