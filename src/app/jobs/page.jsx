"use client"
import React from 'react';
import { useSelector } from 'react-redux';
import CustomLayout from '../Components/Layout';
import { StudentNavbarData } from '../Helper/constant';
import Logout from '../Components/LogoutButton';
import MapData from '../Components/MapData';
import "../../../styles/scss/Jobs.scss"

const Jobs = () => {
  const selectorJobData = useSelector((state) => state.campus.jobData);
  const jobs = Object.values(selectorJobData);

  return (
    <div>
      <CustomLayout SideNavbarData={StudentNavbarData}>
        <div className='all_path'>
          <h1 className='top_heading'>Jobs</h1>
          <Logout />
          <MapData dataJobs={jobs} />
        </div>
      </CustomLayout>
    </div>
  );
}

export default Jobs;
