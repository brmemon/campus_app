"use client";
import React, { useEffect, useState } from "react";
import "../../../../styles/scss/Layout.scss";
import { useRouter } from "next/navigation";
import { FaRegHandshake } from "react-icons/fa6";
import MainButton from "../MainButton";
import Image from "next/image";
import avater from "../Assets/avater.png";
import { useSelector } from "react-redux";
import logo from "../../Components/Assets/logo.png";

const CustomLayout = ({ children, SideNavbarData, profilePic }) => {
  const router = useRouter();
  const [pathname, setPathname] = useState();
  const userCurrentData = useSelector((state) => state.campus.userType);
  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);
  return (
    <div className="Main_sideNavbar">
      <div className="Side_Navbar">
        <div className="logo_heading">
          <Image
            src={logo}
            alt="App Logo"
            className="campus_logo"
            priority={true}
          />
          <h1 className="campus_heading">Campus App</h1>
          <div className="avater_div">
            {/* <Image
                            src={profilePic ? profilePic : avater}
                            className={"navbar_avater"} alt={"Avater"}
                            width={100} height={100}
                            priority={true}
                        /> */}
            <div className="user_name">
              <p className="hi_message">Hi!</p>
              <p className="avater_name">{userCurrentData?.name}</p>
            </div>
          </div>
          <div className="data_div">
            {SideNavbarData.map((item) => (
              <MainButton
                key={item.route}
                className={
                  item?.path === pathname ? "main_mapmenu" : "map_menu"
                }
                onClick={() => router.push(item?.path)}
                icon={item?.icon}
                text={item?.route}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="children">{children}</div>
    </div>
  );
};

export default CustomLayout;
