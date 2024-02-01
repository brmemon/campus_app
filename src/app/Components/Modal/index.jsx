"use client"
import React, { useEffect, useState } from 'react';
import "../../../../styles/scss/Modal.scss";
import { FaRegHandshake } from 'react-icons/fa6';
import { BiAlignLeft } from "react-icons/bi";
import MainButton from '../MainButton';
import Image from 'next/image'
import avater from "../Assets/avater.png"
import { RxCross2 } from "react-icons/rx";
import { useRouter } from 'next/navigation';

const CustomModal = ({ SideNavbarData, profilePic }) => {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const [pathname, setPathname] = useState()

  // useEffect(() => {
  //   if (showModal)
  //   document.body.style.overflow = 'hidden';
  // else
  //     document.body.style.overflow = 'unset';
  // }, [showModal]);

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className='modal_first'>
      <div className='modal_button' onClick={openModal}><BiAlignLeft /></div>
      <div className={`${showModal ? "modal_sideNavbar" : "modal_sideNavbar nonclass"}`}>
        <div className='modal_Side_Navbar'>
          <div className="cross_button" onClick={closeModal}><RxCross2 /></div>
          <div className='logo_heading'>
            <FaRegHandshake className="campus_logo" />
            <h1 className='campus_heading'>Campus App</h1>
            <div className='avater_div'>
              {profilePic ? (
                <Image src={profilePic} className="navbar_avater" alt="Avatar" width={"100"} height={"100"} />
              ) : (
                <Image priority={true} src={avater} className='navbar_avater' alt='Avater' />
              )}
              <p className='user_name'>Bilal Raza</p>
            </div>
            <div className='data_div'>
              {SideNavbarData.map((item) =>
                <MainButton
                  key={item.route}
                  className={item?.path === pathname ? "main_mapmenu" : "map_menu"}
                  onClick={() => router.push(item?.path)}
                  icon={item?.icon}
                  text={item?.route}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className={`${showModal ? "modal_second" : "modal_none modal_second"}`}> </div>
    </div>
  );
};

export default CustomModal;
