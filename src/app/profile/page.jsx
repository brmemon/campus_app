"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../Components/MUILoader/Loader";
import {
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { ref, update } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { profileInitialValues, profileSchema } from "../Helper/schema";
import { db } from "../firebase";
import CustomLayout from "../Components/Layout";
import {
  AdminNavbarData,
  CompanyNavbarData,
  StudentNavbarData,
} from "../Helper/constant";
import withAuth from "../Auth";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import MainButton from "../Components/MainButton";
import Input from "../Components/Input";
import FormControlInput from "../Components/formControlInput";
import "../../../styles/scss/Profile.scss"
const Profile = () => {
  const [pathname, setPathname] = useState("");
  const [isEdited, setIsEdited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const userCurrentData = useSelector((state) => state.campus.userType);
  const authUser = getAuth().currentUser;

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  const formik = useFormik({
    initialValues: profileInitialValues(userCurrentData),
    validationSchema: profileSchema(),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsLoading(true);

        await updateProfile(authUser, {
          displayName: values.name,
        });

        if (values.newPassword) {
          const credential = EmailAuthProvider.credential(
            authUser.email,
            values.oldPassword
          );
          await reauthenticateWithCredential(authUser, credential);

          await updatePassword(authUser, values.newPassword);
        }

        const userRef = ref(db, `users/${authUser.uid}`);
        update(userRef, {
          name: values.name,
        });

        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      } finally {
        setIsLoading(false);
        resetForm();
        setIsEdited(false);
      }
    },
  });

  useEffect(() => {
    const isFormEdited = Object.keys(formik.touched).some(
      (key) => formik.touched[key]
    );
    setIsEdited(isFormEdited);
  }, [formik.touched]);

  if (!userCurrentData || isLoading) {
    return <Loader />;
  }

  // {isLoading && <Loader />}
  return (
    <div>
      <ToastContainer />
      <CustomLayout
        SideNavbarData={
          userCurrentData?.userType === "admin"
            ? AdminNavbarData
            : userCurrentData?.userType === "Company"
            ? CompanyNavbarData
            : userCurrentData?.userType === "student"
            ? StudentNavbarData
            : StudentNavbarData
        }
        pathname={pathname}
        className={"hiden"}>
        <div className="modal_styles">
          <div className="all_path">
            <CustomModal
              SideNavbarData={
                userCurrentData?.userType === "admin"
                  ? AdminNavbarData
                  : userCurrentData?.userType === "Company"
                  ? CompanyNavbarData
                  : userCurrentData?.userType === "student"
                  ? StudentNavbarData
                  : StudentNavbarData
              }
              pathname={pathname}
            />
            <h1 className="top_heading">Profile</h1>

            <div className="profile">
              <Logout />
              <div className="user_name">
                <p className="hi_message">Hi!</p>
                <p className="avater_name">{userCurrentData?.name}</p>
              </div>
              <div className="profile_input">
                <Input
                  disabled
                  id="email"
                  name="email"
                  label="Email"
                  className="input_profile"
                  value={formik.values.email}
                />
              </div>

              <div className="profile_input">
                <Input
                  className="input_profile"
                  label="Name"
                  name="name"
                  id="name"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setIsEdited(true);
                  }}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  value={formik.values.name}
                />

                {formik.touched.name && formik.errors.name && (
                  <div className="error">{formik.errors.name}</div>
                )}
              </div>

              <div className="profile_input">
                <FormControlInput
                  label="Password"
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                  className="input_profile"
                  onChange={(e) => {
                    formik.handleChange(e);
                    // setIsEdited(true);
                  }}
                  value={formik.values.oldPassword}
                  error={
                    formik.touched.oldPassword &&
                    Boolean(formik.errors.oldPassword)
                  }
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <div className="error_oldPassword">
                    {formik.errors.oldPassword}
                  </div>
                )}

                <FormControlInput
                  label="New Password"
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  className="input_profile"
                  onChange={(e) => {
                    formik.handleChange(e);
                    setIsEdited(true);
                  }}
                  value={formik.values.newPassword}
                  error={
                    formik.touched.newPassword &&
                    Boolean(formik.errors.newPassword)
                  }
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="error_oldPassword">
                    {formik.errors.newPassword}
                  </div>
                )}
              </div>

              <div className="parent_profilebutton">
                <MainButton
                  type="submit"
                  text="Save Changes"
                  className="profile_button"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting || !formik.isValid || !isEdited}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(Profile);
