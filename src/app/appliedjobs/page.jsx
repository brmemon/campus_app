// AppliedJobs.js
"use client"
import React from 'react';
import CustomLayout from '../Components/Layout';
import { StudentNavbarData } from '../Helper/constant';
import Logout from '../Components/LogoutButton';
import { useSelector } from 'react-redux';
import "../../../styles/scss/AppliedJobs.scss"
import withAuth from '../Auth';

const AppliedJobs = () => {
  const appliedJobs = useSelector((state) => state.campus.appliedJobs);
  const jobData = useSelector((state) => state.campus.jobData);

  const getAppliedJobDetails = (jobId) => {
    if (Array.isArray(jobData)) {
      return jobData.filter(job => job.id === jobId);
    } else {
      return null;
    }
  };

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className='all_path'>
        <h1 className='top_heading'>Applied Jobs</h1>
        <Logout />
      </div>
    </CustomLayout>
  );
};

export default withAuth(AppliedJobs);
