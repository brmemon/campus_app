import React from "react";
import { useSelector } from "react-redux";
import "../../../../styles/scss/MapData.scss";
import { RiQuestionMark } from "react-icons/ri";
import { BsEmojiDizzy } from "react-icons/bs";
import Image from "next/image";
import avater from "../Assets/noData.png";
const MapData = ({ dataJobs }) => {
  const userCurrentData = useSelector((state) => state.campus.userType);

  const filteredJobs = dataJobs.filter(
    (item) => item?.companyId === userCurrentData?.uid
  );
  console.log(userCurrentData?.uid);
  console.log(filteredJobs);

  return (
    <>
      <div className="job_post_first">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((item, index) => (
            <div key={index} className="job_post_second">
              <div className="job_post_third">
                <div className="job_post_ite">
                  <p className="tittle">{item?.title}</p>
                </div>
                {/* <p className="tittle">Job ID: {item?.companyId}</p> */}
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
                  {/* <MainButton className="Apply_Button" text={"Apply"}></MainButton> */}
                </div>
              </div>
            </div>
          ))
          ) : (
            <div className="empty_div">
            <Image src={avater} alt="No Data" width={350} height={350}/>
            <h1 className="empty_data">No Data Found</h1>
            </div>
        // <div className="emoji_main_div">
        //   <div className="div_emoji">
        //     <span className="emoji_one">
        //       <BsEmojiDizzy />
        //     </span>
        //     <span className="emoji_two">
        //       <RiQuestionMark />
        //     </span>
        //   </div>
        // </div>
      )}
      </div>
    </>
  );
};

export default MapData;
