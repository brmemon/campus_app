"use client"
// import React, { useEffect, useState } from 'react'
// import CustomLayout from '../Components/Layout'
// import { FormControl, InputLabel, MenuItem, Select, } from '@mui/material'
// import "../../../styles/scss/Profile.scss"
// import Input from '../Components/Input';
// import MainButton from '../Components/MainButton';
// import { AdminNavbarData } from '../Helper/constant';
// import Image from 'next/image';
// import avater from "../Components/Assets/avater3png.png"
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import MuiModal from '../Components/LogoutModal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md'

// const Profile = () => {
//   const [pathname, setPathname] = useState()

//   const temper = typeof window !== undefined
//   useEffect(() => {
//     setPathname(window.location.pathname)
//   }, [temper])

//   return (
//     <div>
//       <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={"hiden"}>
//         <div className='modal_styles'>
//           <div className='all_path'>
//             <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
//             <div className='profile'>
//               <div className='avater_and_name'>
//                 <MuiModal />
//                 <Logout />
//                 <span className='avater_pencilicon'>
//                   <Image src={avater} className='avater' alt='Avater' />
//                   <MdOutlinePhotoCameraFront className='pencil_icon' />
//                 </span>
//                 <p className='avater_name'>Raza</p>
//               </div>

//               <div className='profile_input'>
//                 <Input label={"Raza123@gmail.com"} className='input_profile' disabled={true} />
//                 <Input label={"Name"} className='input_profile' />
//               </div>
//               <div className='profile_input'>
//                 <FormControl fullWidth>
//                   <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
//                   <Select
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select"
//                     label="Select Gender"
//                     className={"input_profile"}
//                   >
//                     <MenuItem value={"Male"}>Male</MenuItem>
//                     <MenuItem value={"Female"}>Female</MenuItem>
//                     <MenuItem value={"Other"}>Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <div className='profile_input'>
//                 <Input label={"Old Password"} className='input_profile' />
//                 <Input label={"New Password"} className='input_profile' />
//               </div>
//               <div className='parent_profilebutton'>
//                 <MainButton text={"Save Changes"} className={"profile_button"} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </CustomLayout>
//     </div >
//   )
// }

// export default Profile

































"use client"
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import { AdminNavbarData } from '../Helper/constant';
import Image from 'next/image';
import avater from '../Components/Assets/avater3png.png';
import Logout from '../Components/LogoutButton';
import CustomModal from '../Components/Modal';
import MuiModal from '../Components/LogoutModal';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import CustomLayout from '../Components/Layout';
import "../../../styles/scss/Profile.scss"
import { registerUser } from '../Helper/helper';


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
      oldPassword: Yup.string(),
      newPassword: Yup.string()
        .trim('The contact name cannot include leading and trailing spaces')
        .min(8, 'Password must be at least 8 characters')
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .matches(/[\W@_]/, 'Password must contain at least one special character'),
    }),

    onSubmit: async (values) => {
      const { success, message } = await registerUser(values.email, values.password);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    },
  });

  const { values, errors, touched, handleSubmit } = formik;

  const temper = typeof window !== undefined
  useEffect(() => {
    setPathname(window.location.pathname)
  }, [temper])

  return (
    <div>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={'hiden'}>
        <div className="modal_styles">
          <div className="all_path">
            <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
            <div className="profile">
              <div className="avater_and_name">
                <MuiModal />
                <Logout />
                <span className="avater_pencilicon">
                  <Image src={avater} className="avater" alt="Avatar" />
                  <MdOutlinePhotoCameraFront className="pencil_icon" />
                </span>
                <p className="avater_name">Raza</p>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <div className="profile_input">
                  <Input
                    label="Email"
                    className="input_profile"
                    disabled={true}
                    value={formik.values.email}
                  />
                  <Input
                    onChange={formik.handleChange}
                    value={values.name}
                    className="input_profile"
                    label="Name"
                    name="name"
                    id="name"
                  />
                  {errors.name && touched.name && <div className="error">{errors.name}</div>}
                </div>
                <div className="profile_input">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Gender"
                      name="gender"
                      className="input_profile"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="profile_input">
                  <Input
                    onChange={formik.handleChange}
                    value={values.oldPassword}
                    type="old password"
                    label="old Password"
                    name="old password"
                    id="old password"
                    className="input_profile"
                  />
                  {errors.oldPassword && touched.oldPassword && <div className="error">{errors.oldPassword}</div>}
                  <Input
                    onChange={formik.handleChange}
                    value={values.newPassword}
                    type="new password"
                    label="new Password"
                    name="new password"
                    id="new password"
                    className="input_profile"
                  />
                  {errors.newPassword && touched.newPassword && <div className="error">{errors.newPassword}</div>}
                </div>
                <div className="parent_profilebutton">
                  <MainButton text="Save Changes" className="profile_button" type="submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </CustomLayout>
    </div>
  );
};

export default Profile;
