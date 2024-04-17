"use client";
import React from "react";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import "../../../styles/scss/AppliedJobs.scss";
import withAuth from "../Auth";
import { useSelector } from "react-redux";
import avater from "../Components/Assets/noData.png";
import Image from "next/image";
import CustomModal from "../Components/Modal";

const AppliedJobs = () => {
  const dataOfJob = useSelector((state) => state.campus.jobData);
  const currentUserData = useSelector((state) => state.campus.userType);

  let jobs = !!dataOfJob && Object.values(dataOfJob);
  let userApplied =
    !!currentUserData?.appliedJobs &&
    Object?.values(currentUserData?.appliedJobs);

  let res = [jobs, userApplied].reduce((include, current) =>
    include?.filter((a) => !!current && current?.includes(a.id))
  );
  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className="all_path">
        <h1 className="top_heading">Applied Jobs</h1>
        <CustomModal SideNavbarData={StudentNavbarData} />
        <Logout />
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
              <Image
                src={avater}
                alt="No Data"
                width={350}
                height={350}
                priority={true}
              />
              <h1 className="empty_data">No Data Found</h1>
            </div>
          )}
        </div>
      </div>
    </CustomLayout>
  );
};

export default withAuth(AppliedJobs);
