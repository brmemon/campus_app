"use client";
import React from "react";
import { useSelector } from "react-redux";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import MapData from "../Components/MapData";
import "../../../styles/scss/Jobs.scss";
import withAuth from "../Auth";
import { getAuth } from "firebase/auth";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import MainButton from "../Components/MainButton";

const Jobs = () => {
  const auth = getAuth();

  const jobsData = useSelector((state) => state.campus.allJobsData);
  const allUsers = useSelector((state) => state.campus.data);
  const userUid = useSelector((state) => state.campus.userUid);

  let jobApplied = {
    userName: allUsers[userUid]?.name,
    userEmail: allUsers[userUid]?.email,
  };

  let allJobs = Object?.values(jobsData);

  const applyJob = (job) => {
    set(ref(db, `/users/${auth.currentUser.uid}/appliedJobs/${job}`), job)
      .then((value) => {
        set(
          ref(db, `/Jobs/${job}/studentApplied/${auth.currentUser.uid}`),
          jobApplied
        );
        toast.success("Applied Successfully", {});
      })
      .catch((err) => toast.error("Something went wrong", {}));
  };

  return (
    <div>
      <CustomLayout SideNavbarData={StudentNavbarData}>
        <div className="all_path">
          <h1 className="top_heading">Jobs</h1>
          <Logout />

          <div className="postedJobs">
            {allJobs.map((item) => (
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
                        text="Apply"
                        className="applyJob"
                        vairant="outlined"
                        click={() => applyJob(item.jobId)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(Jobs);
