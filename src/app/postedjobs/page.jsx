"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "../Components/Layout";
import "../../../styles/scss/PostedJobs.scss";
import { CompanyNavbarData, Table } from "../Helper/constant";
import "../../../styles/scss/globals.scss";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import MapData from "../Components/MapData";
import { useSelector } from "react-redux";
import withAuth from "../Auth";
import MainButton from "../Components/MainButton";
import { TableBody, TableCell, TableRow } from "@mui/material";
import Modal from "react-responsive-modal";

const PostedJobs = () => {
  const [pathname, setPathname] = useState();
  // const [students, setStudents] = useState([]);

  // const [open, setOpen] = useState(false);
  // const onCloseModal = () => setOpen(false);

  const userUID = useSelector((state) => state.campus.userUid);

  const allJobs = useSelector((state) => state.campus.allJobsData);
  let checking = Object.values(allJobs);

  let tempData = checking.filter((val) => val.companyId == userUID);

  // const showStudents = (val) => {
  //   setOpen(true);
  //   if (val) {
  //     let temp = Object?.values(val);
  //     setStudents(temp);
  //   }
  // };

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className="all_path">
          <h1 className="top_heading">Posted Jobs</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />

          {/* <Modal open={open} onClose={onCloseModal} center>
            <p className="modalHeading">Student Applied</p>
            <TableBody className="modalTable">
              <TableRow>
                <TableCell>Student Name</TableCell>
                <TableCell>Student Email</TableCell>
              </TableRow>
              {students.map((item) => {
                console.log(item, "posted jobs");
                return (
                  <TableRow key={Object.keys(item)[0]}>
                    <TableCell>{item.userName}</TableCell>
                    <TableCell>{item.userEmail}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Modal> */}
        </div>

        <div className="postedJobs">
          {tempData &&
            tempData.map((item) => (
              <div key={Object.keys(item)[0]} class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <h2>{item.title}</h2>
                    <h4>Salary: {item.salary}</h4>
                  </div>
                  <div class="flip-card-back">
                    <div className="rowJob">
                      <div className="jobCol1">Field: </div>
                      <div className="jobCol2">{item.category}</div>
                    </div>
                    <div className="rowJob">
                      <div className="jobCol1">Min Education: </div>
                      <div className="jobCol2">{item.qualification}</div>
                    </div>
                    <div className="rowJob">
                      <div className="jobCol1">Skills: </div>
                      <div className="jobCol2">{item.skills}</div>
                    </div>
                    <div className="rowJob">
                      <div className="jobCol1">Comments: </div>
                      <div className="jobCol2">{item.desc}</div>
                    </div>
                    <div className="rowJob">
                      <div className="jobCol1">Gender: </div>
                      <div className="jobCol2">{item.gender}</div>
                    </div>
                    <div className="rowJob">
                      <div className="jobCol1">Timing: </div>
                      <div className="jobCol2">{item.timings}</div>
                    </div>

                    <div className="applyJobBtn">
                      <MainButton
                        btnText="Student Applied"
                        myclass="profileBtn"
                        vairant="outlined"
                        click={() => showStudents(item.studentApplied)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(PostedJobs);
