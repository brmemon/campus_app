// import React from "react";
// import "../../../../styles/scss/MapData.scss";
// import { applyJob } from "@/app/Redux/userSlice";
// import { db } from "@/app/firebase";
// import { useDispatch } from "react-redux";
// import { ref, update } from "firebase/database";
// import { Button } from "@mui/material";
// import MainButton from "../MainButton";

// const MapData = ({ dataJobs }) => {
//   return (
//     <div className="job_post_first">
//       {dataJobs.map((item, index) => (
//         <div key={index} className="job_post_second">
//           <div className="job_post_third">
//             <div className="job_post_ite">
//               <p className="tittle">{item?.title}</p>
//             </div>
//             {/* <p className='tittle'>Job ID: {item?.id}</p> */}
//             <div className="job_post_item">
//               <p className="job_post_para">Qualification:</p>
//               <p className="tittle">{item?.minimumQualification}</p>
//             </div>

//             <div className="job_post_item">
//               <p className="job_post_para">Category:</p>
//               <p className="tittle">{item?.category}</p>
//             </div>
//             <div className="job_post_item">
//               <p className="job_post_para">Skills:</p>
//               <p className="tittle">{item?.skills}</p>
//             </div>
//             <div className="job_post_item">
//               <p className="job_post_para">Salary:</p>
//               <p className="tittle">{item?.salary}</p>
//             </div>
//             <div className="job_post_item">
//               <p className="job_post_para">Description:</p>
//               <p className="tittle">{item?.description}</p>
//             </div>
//             <div className="main_div_Apply_Button">
//               {/* <MainButton className="Apply_Button" text={"Apply"}></MainButton> */}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MapData;
