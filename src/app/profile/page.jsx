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
import MuiModal from '../Components/LogoutModal';
import { MdOutlinePhotoCameraFront } from 'react-icons/md'
import { useFormik } from 'formik'
import * as Yup from 'yup';

const Profile = () => {
  const [pathname, setPathname] = useState()

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      oldPassword: '',
      newPassword: '',
    },

    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .trim('The contact name cannot include leading and trailing spaces'),
      // .required('Name is required'),
      // email: Yup.string()
      //   .email('Invalid email address')
      //   .trim('The contact name cannot include leading and trailing spaces')
      //   .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
      //   .required('Email is required'),
      oldPassword: Yup.string()
        .trim('The contact name cannot include leading and trailing spaces')
        .min(8, 'Password must be at least 8 characters')
        .matches(/[\W@_]/, 'Password must contain at least one special character'),
      // .required('Password is required'),
      newPassword: Yup.string().oneOf([Yup.ref('oldPassword'), null], 'old Password is required')
      .trim('The contact name cannot include leading and trailing spaces')
      // .required('Confirm Password is required'),
      // userType: Yup.string().required('Role is required'),
      // education: Yup.string().when((education, work) =>
      //   values.userType === 'student' ? work.required('Education is required') : undefined),
      // experience: Yup.string().when((experience, work) =>
      //   values.userType === 'student' ? work.required('Experience is required') : undefined)
    }),

    onSubmit: async (values) => {
      const { success, message } = await registerUser(values.email, values.password);

      if (success) {
        toast.success(message);
        // router.push('/auth/VerifyEmail');
      } else {
        toast.error(message);
      }
    },

  })

  const { values, errors, touched, handleSubmit } = formik;


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
              <form onSubmit={handleSubmit}>
                <div className='avater_and_name'>
                  <MuiModal />
                  <Logout />
                  <span className='avater_pencilicon'>
                    <Image src={avater} className='avater' alt='Avater' />
                    <MdOutlinePhotoCameraFront className='pencil_icon' />
                  </span>
                  <p className='avater_name'>Raza</p>
                </div>

                <div className='profile_input'>
                  <Input label={"Raza123@gmail.com"} className='input_profile' disabled={true} />
                  <Input
                    label="Name"
                    className='input_profile'
                    onChange={formik.handleChange}
                    value={values.name}
                    name="name"
                    id="name"
                  // className={'input'}
                  // label="Name"
                  />
                  {errors.name && touched.name && <div className="error">{errors.name}</div>}
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
                  <Input
                    label={"Old Password"}
                    className='input_profile'
                    onChange={formik.handleChange}
                    value={values.oldPassword}
                    type="oldPassword"
                    // label="Password"
                    name="oldPassword"
                    id="oldPassword"
                  />
                  {errors.oldPassword && touched.oldPassword && <div className="error">{errors.oldPassword}</div>}
                  <Input
                    label={"New Password"}
                    className='input_profile'
                    onChange={formik.handleChange}
                    value={values.newPassword}
                    type="password"
                    // label="Confirm Password"
                    name="newPassword"
                    id="newPassword"
                  />
                  {errors.newPassword && touched.newPassword && <div className="error">{errors.newPassword}</div>}
                </div>
                <div className='parent_profilebutton'>
                  <MainButton type="submit" text={"Save Changes"} className={"profile_button"} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </CustomLayout>
    </div >
  )
}

export default Profile
