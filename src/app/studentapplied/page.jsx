"use client";
import React, { useState } from "react";
import CustomLayout from "../Components/Layout";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import { CompanyNavbarData, Table } from "../Helper/constant";
import "../../../styles/scss/StudentApplied.scss";
import "../../../styles/scss/Jobs.scss";
import withAuth from "../Auth";
import { useSelector } from "react-redux";
import Image from "next/image";
import avater from "../Components/Assets/noData.png";
import MainButton from "../Components/MainButton";
import { Box, Modal } from "@mui/material";
import StudentDetails from "../Components/StudentAppliedTable";

const StudentApplied = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const userCurrentData = useSelector((state) => state.campus.userType);
  const allUsers = useSelector((state) => state.campus.userData);
  const dataOfJob = useSelector((state) => state.campus.jobData);
  let jobs = Object.values(dataOfJob);

  const val = Object.values(allUsers)
    ?.flatMap((item) => !!item?.appliedJobs && Object.values(item.appliedJobs))
    .filter((item) => item !== false);

  let res = [jobs, val].reduce((include, current) =>
    include?.filter((a) => current?.includes(a.id))
  );

  const filteredJobs = res.filter(
    (item) => item?.companyId === userCurrentData?.uid
  );

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData}>
        <div className="all_path">
          <h1 className="top_heading">Student Applied</h1>
          <div className="applied-jobs-container"></div>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />

          <div className="job_post_first">
            {filteredJobs?.length > 0 ? (
              filteredJobs.map((item, index) => (
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
                    <div className="main_div_Apply_Button_studentapplied">
                      <MainButton
                        className="Apply_Button_studentapplied"
                        onClick={handleOpen}
                        text={"Student Details"}
                      />
                    </div>
                    <Modal
                      className="logout_modal"
                      open={open}
                      onClose={handleClose}>
                      <Box className="box_class">
                        <StudentDetails />
                      </Box>
                    </Modal>
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
    </div>
  );
};

export default withAuth(StudentApplied);
