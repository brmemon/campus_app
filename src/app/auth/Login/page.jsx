"use client";
import React, { useEffect } from "react";
import "../../../../styles/scss/LoginAndAuthContainer.scss";
import Input from "@/app/Components/Input";
import Link from "next/link";
import MainButton from "@/app/Components/MainButton";
import FormControlInput from "@/app/Components/formControlInput";
import AuthContainer from "../SideContainers/AuthContainer";
import { FaRegHandshake } from "react-icons/fa6";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { loginUser } from "@/app/Helper/helper";
import { loginInitialValues, loginSchema } from "@/app/Helper/schema";
import { onValue, ref } from "firebase/database";
import { db } from "@/app/firebase";
import withAuth from "@/app/Auth";
import logo from "../../Components/Assets/logo.png";
import Image from "next/image";

const Login = () => {
  const router = useRouter();

  let statusVerified, statusBlocked, userEmail;
  useEffect(() => {
    onValue(ref(db, "/users"), async (data) => {
      if (data.val()) {
        let myVal = Object?.values(data.val());
        let ind = myVal.findIndex((item) => item?.email === values.email);

        statusVerified = myVal[ind]?.adminVerifiedUser;
        statusBlocked = myVal[ind]?.adminBlockedUser;
        userEmail = myVal[ind]?.email;
      }
    });
  });

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: () => loginSchema(values),

    onSubmit: async (values) => {
      if (values.email === userEmail) {
        if (statusVerified && !statusBlocked) {
          const { success, message } = await loginUser(
            values.email,
            values.password
          );

          if (success) {
            toast.success(message);
            router.push("/profile");
          } else {
            toast.error("Invalid Email/Password");
          }
        } else if (values.email === userEmail && !statusVerified) {
          toast.error("You Are Not Verify By Admin");
        } else if (statusBlocked) {
          toast.error("Your Account Is Blocked");
          router.push("/BlockedPage");
        }
      }
    },
  });
  const { values, errors, touched, handleSubmit } = formik;

  return (
    <div className="container">
      <AuthContainer />
      <ToastContainer />
      <div className="main_container">
        <div className="sub_container_two">
          {/* <FaRegHandshake className="media_logo" /> */}
          <Image
            src={logo}
            alt="App Logo"
            width={"180"}
            height={"110"}
            className="media_logo"
            priority={true}
          />
          <h1 className="login_logo"> Login </h1>
          <h2 className="login_welcome">Welcome Back! Login To Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="login_input">
              <Input
                label="Email"
                type={"email"}
                onChange={formik.handleChange}
                value={values.email}
                className={"input"}
                name="email"
                id="email"
              />
              {errors.email && touched.email && (
                <div className="error">{errors.email}</div>
              )}

              <FormControlInput
                label={"Password"}
                onChange={formik.handleChange}
                value={values.password}
                type="password"
                name="password"
                id="password"
              />
              {errors.password && touched.password && (
                <div className="error">{errors.password}</div>
              )}
            </div>

            <span className="forget">
              <Link href="/auth/ForgetPassword" className="forget_button">
                Forgot Password?
              </Link>
            </span>

            <div className="MainButton_Parent">
              <MainButton type="submit" text="Log In" />
            </div>
          </form>

          <p className="sinUp_text">
            Don't Have An Account ?
            <Link className="link" href="/auth/Signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Login);
