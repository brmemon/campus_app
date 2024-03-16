import React from "react";
import { useSelector } from "react-redux";
import "../../../../styles/scss/MapData.scss";
import Image from "next/image";
import avater from "../Assets/noData.png";
const MapData = ({ dataJobs }) => {
  const userCurrentData = useSelector((state) => state.campus.userType);
  const filteredJobs = dataJobs.filter((item) => item?.companyId === userCurrentData?.uid);

  return (
    <>
      <div className="job_post_first">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((item, index) => (
            <div key={index} className="job_post_second">
              <div className="job_post_third">
                <div className="job_post_ite">
                  <p className="tittle">{userCurrentData?.name}</p>
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
    </>
  );
};

export default MapData;
