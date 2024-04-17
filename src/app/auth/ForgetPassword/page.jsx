"use client";
import { useState } from "react";
import { Button } from "@mui/material";
import Input from "@/app/Components/Input";
import Link from "next/link";
import AuthContainer from "../SideContainers/AuthContainer";
import { FaRegHandshake } from "react-icons/fa6";
import MainButton from "@/app/Components/MainButton";
import "../../../../styles/scss/ForgetPassword.scss";
import { forgotPassword } from "@/app/Helper/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../Components/Assets/logo.png";
import Image from "next/image";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async () => {
    const { success, message } = await forgotPassword(email);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className="container">
      <AuthContainer />
      <ToastContainer />
      <div className="main_container">
        <div className="sub_container_two">
          <Image
            src={logo}
            alt="App Logo"
            width={"180"}
            height={"110"}
            className="media_logo"
            priority={true}
          />
          <h1 className="login_logo">Forgot Password</h1>
          <h2 className="login_welcome">
            Get Back Your Account Quickly And Easily
          </h2>
          <div className="forget_input">
            <Input
              id="userEmail"
              className={"input"}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="MainButton_Parent">
            <MainButton
              id={"reset"}
              text={"Forgot Password"}
              onClick={handleForgotPassword}></MainButton>
          </div>
          <Button>
            <Link href="/auth/Login">Back To Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
