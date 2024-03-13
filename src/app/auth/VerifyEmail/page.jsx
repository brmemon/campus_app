"use client";
import React from "react";
import "../../../../styles/scss/VerifyEmail.scss";
import { FaRegHandshake } from "react-icons/fa6";
import MainButton from "@/app/Components/MainButton";
import { useRouter } from "next/navigation";
import withAuth from "@/app/Auth";
import { useSelector } from "react-redux";

const VerificationEmail = () => {
  const userCurrentData = useSelector((state) => state.campus.userType);
  const router = useRouter();

  const handleLogout = () => {
    router.push("/auth/Login");
  };


  return (
    <div className="varify_email_container">
      <div className="verify_email">
        <FaRegHandshake className="campus_logos" />
        <h1 className="text">Campus App</h1>
        <p className="email_text">
          Hi:<span className="name_email">{userCurrentData?.name}</span>
        </p>
        <p className="email_text">
          You Are Logged In As:
          <span className="name_email">{userCurrentData?.email}</span>
        </p>
        <p className="email_text">You Are Not Verified By Admin Please Wait</p>
        <div className="Button_Parent">
          <MainButton text={"Log Out"} onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default withAuth(VerificationEmail);
