"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/PostedJobs.scss"
import { CompanyNavbarData, Table } from '../Helper/constant'
import MyTable from '../Components/Table'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'
import { useSelector } from 'react-redux'

const PostedJobs = () => {
  const [pathname, setPathname] = useState()

  const jobPosts = useSelector((state) => state.campus.jobPosts);

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  console.log('Job posts from Redux:', jobPosts);
  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Posted Jobs</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
        </div>
      </CustomLayout>
      {jobPosts.map((item, index) => {
        console.log(item.title, "hellow");
        return (
          <p>
            {item.title}
          </p>
        )
      })}
    </div>
  )
}

export default PostedJobs
