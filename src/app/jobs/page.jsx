"use client"
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CustomLayout from "../Components/Layout";
import { StudentNavbarData } from "../Helper/constant";
import Logout from "../Components/LogoutButton";
import "../../../styles/scss/Jobs.scss";
import withAuth from "../Auth";
import Image from "next/image";
import avater from "../Components/Assets/noData.png";
import MainButton from "../Components/MainButton";
import { ref, set, get } from "firebase/database"; 
import { auth, db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import CustomModal from "../Components/Modal";

const Jobs = () => {
  const dataOfJob = useSelector((state) => state.campus.jobData);
  const jobs = Object.entries(dataOfJob);
  const currentUser = useSelector((state) => state.campus.userType);
  const [appliedJobs, setAppliedJobs] = useState([]); 
  useEffect(() => {
    const userRef = ref(db, `/users/${auth.currentUser?.uid}/appliedJobs`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const appliedJobsData = snapshot.val();
          const appliedJobsList = Object.values(appliedJobsData);
          setAppliedJobs(appliedJobsList);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const jobApply = (item, key) => {
    const job = item?.id;
    set(ref(db, `/users/${auth.currentUser?.uid}/appliedJobs/${job}`), job)
      .then(() => {
        set(
          ref(db, `/jobs/${key}/studentApplied/${auth.currentUser?.uid}`),
          currentUser
        );
        toast.success("Applied Job Successfully");
        setAppliedJobs([...appliedJobs, job])
      })
      .catch((error) => toast.error(error));
  };

  return (
    <CustomLayout SideNavbarData={StudentNavbarData}>
      <ToastContainer />
      <div className="all_path">
        <h1 className="top_heading">Jobs</h1>
        <Logout />
        <CustomModal SideNavbarData={StudentNavbarData} />
        <div className="job_post_first">
          {jobs.length > 0 ? (
            jobs.map(([key, item]) => (
              <div key={key} className="job_post_second">
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
                      text={appliedJobs.includes(item?.id) ? "Applied" : "Apply"} 
                      disabled={appliedJobs.includes(item?.id)} 
                      onClick={() => jobApply(item, key)}
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

export default withAuth(Jobs);
