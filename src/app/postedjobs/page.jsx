"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import "../../../styles/scss/PostedJobs.scss"
import { CompanyNavbarData, Table } from '../Helper/constant'
import "../../../styles/scss/globals.scss"
import Logout from '../Components/LogoutButton'
import CustomModal from '../Components/Modal'
import { useSelector } from 'react-redux'

const PostedJobs = () => {
  const [pathname, setPathname] = useState()

  const selectorJobData = useSelector((state) => state.campus.jobData);
  const dataJobs = Object.values(selectorJobData);

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  console.log('Job posts from Redux:', selectorJobData);
  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className='all_path'>
          <h1 className='top_heading'>Posted Jobs</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
          <div
            className='job_post_first'
          >
            {dataJobs.map((item, index) => {
              console.log(item, "hellow");
              return (
                <div
                  key={index}
                  className='job_post_second'
                >
                  <div className='job_post_third'>
                    <div className='job_post_item'> <h4 className='job_post_para'>Id:</h4>            <p className='tittle'>{item?.id}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Tittle:</h4>        <p className='tittle'>{item?.title}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Qualification:</h4> <p className='tittle'>{item?.minimumQualification}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Category:</h4>      <p className='tittle'>{item?.category}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Skills:</h4>        <p className='tittle'>{item?.skills}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Salary:</h4>        <p className='tittle'>{item?.salary}</p></div>
                    <div className='job_post_item'> <h4 className='job_post_para'>Discription:</h4>   <p className='tittle'>{item?.description}</p></div>
                  </div>
                </div>
              )
            }
            )}
          </div>
        </div>
      </CustomLayout>
    </div>
  )
}

export default PostedJobs
