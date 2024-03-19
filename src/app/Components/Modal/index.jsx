"use client";
import React, { useEffect, useState } from "react";
import "../../../../styles/scss/Modal.scss";
import { FaRegHandshake } from "react-icons/fa6";
import { BiAlignLeft } from "react-icons/bi";
import MainButton from "../MainButton";
import Image from "next/image";
import avater from "../Assets/avater.png";
import { RxCross2 } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const CustomModal = ({ SideNavbarData, profilePic }) => {
  const userCurrentData = useSelector((state) => state.campus.userType);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [pathname, setPathname] = useState();

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="modal_first">
      <div className="modal_button" onClick={openModal}>
        <BiAlignLeft />
      </div>
      <div
        className={`${
          showModal ? "modal_sideNavbar" : "modal_sideNavbar nonclass"
        }`}>
        <div className="modal_Side_Navbar">
          <div className="cross_button" onClick={closeModal}>
            <RxCross2 />
          </div>
          <div className="logo_heading">
            <FaRegHandshake className="campus_logo" />
            <h1 className="campus_heading">Campus App</h1>
            <div className="avater_div">
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
      </div>
      <div
        className={`${showModal ? "modal_second" : "modal_none modal_second"}`}>
        {" "}
      </div>
    </div>
  );
};

export default CustomModal;
