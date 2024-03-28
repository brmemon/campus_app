"use client";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "../../../styles/scss/Profile.scss";
import withAuth from "../Auth";
import avater from "../Components/Assets/avater.png";
import Input from "../Components/Input";
import CustomLayout from "../Components/Layout";
import Logout from "../Components/LogoutButton";
import Loader from "../Components/MUILoader/Loader";
import MainButton from "../Components/MainButton";
import CustomModal from "../Components/Modal";
import {
  AdminNavbarData,
  CompanyNavbarData,
  StudentNavbarData,
} from "../Helper/constant";
import { profileInitialValues, profileSchema } from "../Helper/schema";
import { auth, db } from "../firebase";
import { ref, update } from "firebase/database";
import FormControlInput from "../Components/formControlInput";

const Profile = () => {
  const [pathname, setPathname] = useState("");
  const userCurrentData = useSelector((state) => state.campus.userType);

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);
  const formik = useFormik({
    initialValues: profileInitialValues(userCurrentData),
    validationSchema: profileSchema(),
    onSubmit: async (values, { resetForm }) => {
      try {
        const displayName = values.name;
        const userId = userCurrentData?.uid;
        const userRef = ref(db, `users/${userId}`);
        await update(userRef, { name: displayName });

        toast.success("Profile updated successfully!");
      } catch (error) {
        console.error("Failed updating profile:", error.message);
        toast.error("Failed to update profile. Please try again later.");
      }
      resetForm();
    },
  });

  if (!userCurrentData) {
    return <Loader />;
  }

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
              {/* <div className="avater_and_name"> */}
              <Logout />
              {/* <label htmlFor="profilePicInput" className="avater_pencilicon">
                  <Image
                    src={avater}
                    className={"navbar_avater"}
                    alt={"Avater"}
                    width={100}
                    height={100}
                    priority={true}
                  />
                  <MdOutlinePhotoCameraFront className="pencil_icon" />
                </label> */}
              <div className="user_name">
                <p className="hi_message">Hi!</p>
                <p className="avater_name">{userCurrentData?.name}</p>
              </div>
              {/* </div> */}

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
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
                  onChange={formik.handleChange}
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
                  disabled={formik.isSubmitting || !formik.isValid}
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
