import React from "react";
import "../../../../styles/scss/LoginAndAuthContainer.scss";
import { FaRegHandshake } from "react-icons/fa6";
import Image from "next/image";
import logo from "../../Components/Assets/logo.png";
const AuthContainer = () => {
  return (
    <div className="sub_container_one">
      <span className="campus_logo_text">
        <Image
          src={logo}
          alt="App Logo"
          className="campus_logo"
          priority={true}
        />
        {/* <FaRegHandshake className="campus_logo" /> */}
        <h1 className="campus_text">Campus App</h1>
        <p className="campus_para">
          "Connecting Dreams, Bridging Careers Your Gateway to Opportunities!"
        </p>
      </span>
    </div>
  );
};

export default AuthContainer;
