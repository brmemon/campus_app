"use client";
import React from "react";
import { useSelector } from "react-redux";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import "../../../styles/scss/Jobs.scss";
import withAuth from "../Auth";
import Image from "next/image";
import avater from "../Components/Assets/noData.png";
import MainButton from "../Components/MainButton";

const Jobs = () => {
  const selectorJobData = useSelector((state) => state.campus.jobData);
  const jobs = Object.values(selectorJobData);

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className="all_path">
        <h1 className="top_heading">Jobs</h1>
        <Logout />
        <div className="job_post_first">
          {jobs.length > 0 ? (
            jobs.map((item, index) => (
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
                    <MainButton className="Apply_Button" text={"Apply"} />
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

export default withAuth(Jobs);
