// AppliedJobs.js
"use client"
import React from 'react';
import CustomLayout from '../Components/Layout';
import { StudentNavbarData } from '../Helper/constant';
import Logout from '../Components/LogoutButton';
import { useSelector } from 'react-redux';
import "../../../styles/scss/AppliedJobs.scss"

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
        <div>
          <ul>
            {appliedJobs.map((jobId, index) => {
              const job = getAppliedJobDetails(jobId);
              return (
                <li key={index}>
                  {job ? (
                    <>
                      <p>Title: {job?.title}</p>
                      <p>Category: {job?.category}</p>
                    </>
                  ) : (
                    <p>Job details not found</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </CustomLayout>
  );
};

export default AppliedJobs;
