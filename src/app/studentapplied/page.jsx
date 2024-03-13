"use client"
import React from 'react';
import CustomLayout from '../Components/Layout';
import Logout from '../Components/LogoutButton';
import CustomModal from '../Components/Modal';
import { CompanyNavbarData } from '../Helper/constant';
import "../../../styles/scss/StudentApplied.scss";
import withAuth from '../Auth';

const StudentApplied = () => {
  const selectorJobData = useSelector((state) => state.campus.jobData);
  const dataJobs = Object.values(selectorJobData);
  
  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData}>
        <div className='all_path'>
          <h1 className='top_heading'>Student Applied</h1>
          <div className="applied-jobs-container">
          </div>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(StudentApplied);
