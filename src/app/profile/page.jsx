"use client"
import React, { useEffect, useState } from 'react'
import CustomLayout from '../Components/Layout'
import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material'
import "../../../styles/scss/Profile.scss"
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import { AdminNavbarData } from '../Helper/constant';
import Image from 'next/image';
import avater from "../Components/Assets/avater3png.png"
import Logout from '../Components/LogoutButton';
import CustomModal from '../Components/Modal';
import { BsCamera } from "react-icons/bs";
import MuiModal from '../Components/LogoutModal';

const Profile = () => {
  const [pathname, setPathname] = useState()

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])
  return (
    <div>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={"hiden"}>
        <div className='modal_styles'>
          <div className='all_path'>
            <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
            <div className='profile'>
              <div className='avater_and_name'>
                <MuiModal />
                <Logout />
                <span className='avater_pencilicon'>
                  <Image src={avater} className='avater' alt='Avater' />
                  <BsCamera className='pencil_icon' />
                </span>
                <p className='avater_name'>Raza</p>
              </div>

              <div className='profile_input'>
                <Input label={"Raza123@gmail.com"} className='input_profile' disabled={true} />
                <Input label={"Name"} className='input_profile' />
              </div>
              <div className='profile_input'>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Select Gender"
                    className={"input_profile"}
                  >
                    <MenuItem value={"Male"}>Male</MenuItem>
                    <MenuItem value={"Female"}>Female</MenuItem>
                    <MenuItem value={"Other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className='profile_input'>
                <Input label={"Old Password"} className='input_profile' />
                <Input label={"New Password"} className='input_profile' />
              </div>
              <div className='parent_profilebutton'>
                <MainButton text={"Save Changes"} className={"profile_button"} />
              </div>
            </div>
          </div>
        </div>
      </CustomLayout>
    </div >
  )
}

export default Profile
