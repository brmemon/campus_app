"use client"
import React, { useEffect, useState } from 'react';
import "./style.scss";
import { FaRegHandshake } from 'react-icons/fa6';
import { BiAlignLeft } from "react-icons/bi";
import MainButton from '../MainButton';
import Image from 'next/image'
import avater from "../Assets/avater3png.png"

const CustomModal = ({ SideNavbarData, children }) => {
  const [showModal, setShowModal] = useState(false);

  const [pathname, setPathname] = useState()

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
    <>
      {/* <div className='modal'> */}
      <div className='modal_first'>
        <div className='modal_button' onClick={openModal}><BiAlignLeft /></div>
        {showModal && (
          <div className="">
            <div className='Main_sideNavbar'>
              <div className='modal_Side_Navbar'>
            <div className="modal" onClick={closeModal}>x</div>
                <div className='logo_heading'>
                  <FaRegHandshake className="campus_logo" />
                  <h1 className='campus_heading'>Campus App</h1>
                  <div className='avater_div'>
                    <Image src={avater} className='navbar_avater' alt='Avater' />
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
              {/* <div className='children'>
              {children}
            </div> */}
            </div>
            {/* <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} /> */}
            {/* <div className="modal-content"> */}
            {/* </div> */}
          </div>
        )}
      </div>
      {/* </div> */}
    </>
  );
};

export default CustomModal;
