// AppliedJobs.js
"use client";
import React from "react";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import { useSelector } from "react-redux";
import "../../../styles/scss/AppliedJobs.scss";
import withAuth from "../Auth";

const AppliedJobs = () => {
  const appliedJobs = useSelector((state) => state.campus.applyJobs);
  console.log(appliedJobs);
  // const jobData = useSelector((state) => state.campus.jobData);
  // const usersData = useSelector((state) => state.campus.userData);
  // const userUid = useSelector((state) => state.campus.userType);
  // const id = userUid?.uid;
  // console.log(id, "hellow world");

  // let jobs = Object.values(jobData);

  // let showData = usersData;
  // let tempArr = showData && Object.values(showData);
  // console.log(showData, "showData");
  // console.log(tempArr, "tempArr");

  // let result = [jobs, tempArr].reduce((includ, current) =>
  //   includ?.filter((a) => current?.includes(a.jobId))
  // );

  // console.log(result, "result world");

  // const getAppliedJobDetails = (jobId) => {
  //   if (Array.isArray(jobData)) {
  //     return jobData.filter(job => job.id === jobId);
  //   } else {
  //     return null;
  //   }
  // };
  // console.log(jobData , "getAppliedJobDetails ");

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className="all_path">
        <h1 className="top_heading">Applied Jobs</h1>
        <Logout />
      </div>
    </CustomLayout>
  );
};

export default withAuth(AppliedJobs);
