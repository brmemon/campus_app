"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "../Components/Layout";
import "../../../styles/scss/JobsPost.scss";
import { CompanyNavbarData } from "../Helper/constant";
import "../../../styles/scss/globals.scss";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import StyleInput from "../Components/styleInput";
import MainButton from "../Components/MainButton";
import { useFormik } from "formik";
import { jobPostInitialValues, jobPostSchema } from "../Helper/schema";
import { ToastContainer, toast } from "react-toastify";
import { push, ref, set } from "firebase/database";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import withAuth from "../Auth";
import { useSelector } from "react-redux";

const JobsPost = () => {
  const [pathname, setPathname] = useState();
  const userCurrentData = useSelector((state) => state.campus.userType);

  const formik = useFormik({
    initialValues: jobPostInitialValues,
    validationSchema: () => jobPostSchema(values),
    onSubmit: async (values) => {
      try {
        const jobsRef = ref(db, "jobs");
        const newJobRef = push(jobsRef);
        const jobId = uuidv4();
        const jobData = {
          id: jobId,
          companyId: userCurrentData?.uid,
          title: values.tittle,
          minimumQualification: values.minimumQualification,
          category: values.category,
          skills: values.skills,
          salary: values.salary,
          description: values.discription,
        };

        await set(newJobRef, jobData);
        toast.success("Job posted successfully!");
      } catch (error) {
        toast.error("Error posting job. Please try again.");
      }
    },
  });

  const { values, errors, touched, handleSubmit } = formik;

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className="all_path">
          <h1 className="top_heading">Jobs Post</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
          <form onSubmit={handleSubmit}>
            <div className="style_iput_main_div">
              <div className="formik_input">
                <StyleInput
                  label={"Tittle"}
                  className={"style_Input_class"}
                  onChange={formik.handleChange}
                  value={values.tittle}
                  type="tittle"
                  name="tittle"
                  id="tittle"
                />
                {errors.tittle && touched.tittle && (
                  <div className="error">{errors.tittle}</div>
                )}
              </div>
              <div className="formik_input">
                <StyleInput
                  className={"style_Input_class"}
                  label={"Category"}
                  onChange={formik.handleChange}
                  value={values.category}
                  type="category"
                  name="category"
                  id="category"
                />
                {errors.category && touched.category && (
                  <div className="error">{errors.category}</div>
                )}
              </div>

              <div style={{ display: "flex", width: "100%" }}>
                <div className="formik_input">
                  <StyleInput
                    className={"style_Input_class"}
                    label={"Minimum Qualification"}
                    onChange={formik.handleChange}
                    value={values.minimumQualification}
                    type="minimumQualification"
                    name="minimumQualification"
                    id="minimumQualification"
                  />
                  {errors.minimumQualification &&
                    touched.minimumQualification && (
                      <div className="error">{errors.minimumQualification}</div>
                    )}
                </div>
                <div className="formik_input">
                  <StyleInput
                    className={"style_Input_class"}
                    label={"Salary"}
                    onChange={formik.handleChange}
                    value={values.salary}
                    type="salary"
                    name="salary"
                    id="salary"
                  />
                  {errors.salary && touched.salary && (
                    <div className="error">{errors.salary}</div>
                  )}
                </div>
              </div>

              <div className="formik_input">
                <StyleInput
                  className={"style_Input_class"}
                  label={"Skills"}
                  onChange={formik.handleChange}
                  value={values.skills}
                  type="skills"
                  name="skills"
                  id="skills"
                />
                {errors.skills && touched.skills && (
                  <div className="error">{errors.skills}</div>
                )}
              </div>
              <div className="formik_input">
                <StyleInput
                  className={"style_Input_class_change"}
                  label={"Discription"}
                  onChange={formik.handleChange}
                  value={values.discription}
                  type="discription"
                  name="discription"
                  id="discription"
                />
                {errors.discription && touched.discription && (
                  <div className="error">{errors.discription}</div>
                )}
              </div>

              <ToastContainer />
              <div className="Style_input_main_button">
                <MainButton
                  type="submit"
                  className={"Style_input_button"}
                  text={"Job Post"}
                />
              </div>
            </div>
          </form>
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(JobsPost);
