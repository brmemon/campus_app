"use client";
import React from "react";
import CustomLayout from "../Components/Layout";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import { CompanyNavbarData } from "../Helper/constant";
import "../../../styles/scss/StudentApplied.scss";
import withAuth from "../Auth";
import { useSelector } from "react-redux";
import Image from "next/image";
import avater from "../Components/Assets/noData.png";

const StudentApplied = () => {
  const allUsers = useSelector((state) => state.campus.userData);
  const dataOfJob = useSelector((state) => state.campus.jobData);
  let jobs = Object.values(dataOfJob);
  console.log(jobs, "jobs ha bhai ya ");

  const val = Object.values(allUsers)?.flatMap(
    (item) => !!item?.appliedJobs && item?.appliedJobs
  );
  const appliedData = val.filter((item) => item);

  const main = appliedData.flat((hello) => jobs.includes(hello))
  // let res = [appliedData, jobs].reduce((include, current) =>
  // include?.filter((a) => current?.includes(a))
  // );
  console.log(main, "main");
  console.log(appliedData, "appliedData ");
  // console.log(res, "res");

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData}>
        <div className="all_path">
          <h1 className="top_heading">Student Applied</h1>
          <div className="applied-jobs-container"></div>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
          {/* 
          <div className="job_post_first">
            {res?.length > 0 ? (
              res.map((item, index) => (
                <div key={index} className="job_post_second">
                  <div className="job_post_third">
                    <div className="job_post_ite">
                      <p className="tittle">{item?.title}</p>
                    </div>
                    <div className="job_post_item">
                      <p className="job_post_para">Qualification:</p>
                      <p className="tittle">{item?.minimumQualification}</p>
                    </div>
                    <div className="job_post_item">
                      <p className="job_post_para">Category:</p>
                      <p className="tittle">{item?.category}</p>
                    </div>
                    <div className="job_post_item">
                      <p className="job_post_para">Skills:</p>
                      <p className="tittle">{item?.skills}</p>
                    </div>
                    <div className="job_post_item">
                      <p className="job_post_para">Salary:</p>
                      <p className="tittle">{item?.salary}</p>
                    </div>
                    <div className="job_post_item">
                      <p className="job_post_para">Description:</p>
                      <p className="tittle">{item?.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty_div">
                <Image src={avater} alt="No Data" width={350} height={350} />
                <h1 className="empty_data">No Data Found</h1>
              </div>
            )}
          </div> */}
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(StudentApplied);
