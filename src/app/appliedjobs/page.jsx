// AppliedJobs.js
"use client";
import React from "react";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import { useSelector } from "react-redux";
import "../../../styles/scss/AppliedJobs.scss";
import withAuth from "../Auth";
import { getAuth } from "firebase/auth";
import MainButton from "../Components/MainButton";

const AppliedJobs = () => {
  const auth = getAuth();

  const jobsData = useSelector((state) => state.campus.allJobsData);
  const allUsers = useSelector((state) => state.campus.data);
  const userUid = useSelector((state) => state.campus.userUid);
  
  
  let jobs = Object.values(jobsData);
  
  let showData = allUsers[userUid]?.appliedJobs;
  let tempArr = showData && Object.values(showData);
  
  let result = [jobs, tempArr].reduce((includ, current) =>
  includ?.filter((a) => current?.includes(a.jobId))
  );
  console.log(jobs , "jobs" , <br/> , tempArr , "tempArr");

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <div className="all_path">
        <h1 className="top_heading">Applied Jobs</h1>
        <Logout />

        <div style={{backgroundColor: "black"}} className="postedJobs">
          <p>hellow</p>
          {result ? (
            result.map((item) => (
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
                        text="Applied"
                        className="applyJobDisable"
                        vairant="outlined"
                        disable={true}
                        click={() => applyJob(item.jobId)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="emptyText">
              <p>Not Applied On Any Job</p>
            </div>
          )}
        </div>
      </div>
    </CustomLayout>
  );
};

export default withAuth(AppliedJobs);
