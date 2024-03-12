"use client"
import React from "react";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import "../../../styles/scss/AppliedJobs.scss";
import withAuth from "../Auth";
import { useSelector } from "react-redux";
import MainButton from "../Components/MainButton";
import avater from "../Components/Assets/noData.png";
import Image from "next/image";

const AppliedJobs = () => {
  const dataOfJob = useSelector((state) => state.campus.jobData);
  const currentUserData = useSelector((state) => state.campus.userType);
  
  const currentUserJobIds = Object.values(currentUserData?.appliedJobs);
  const allJobIds = Object.values(dataOfJob);
  console.log(currentUserJobIds, "currentUserJobIds ");
  console.log(allJobIds, "allJobIds ");
  const matchingIds = currentUserJobIds.reduce(data => allJobIds.includes(data));
  console.log("Matching Job ID:", matchingIds);

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className="all_path">
        <h1 className="top_heading">Applied Jobs</h1>
        <Logout />
        <div className="job_post_first">
          {matchingIds.length > 0 ? (
            matchingIds.map((item, index) => (
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
                  <div className="main_div_Apply_Button">
                    <MainButton
                      className="Apply_Button"
                      text={"Apply"}
                      onClick={() => jobApply(item?.id)}
                    />
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
        </div>
      </div>
    </CustomLayout>
  );
};

export default withAuth(AppliedJobs);
