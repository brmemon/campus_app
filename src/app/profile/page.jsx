// "use client"
// import { useEffect, useState } from 'react';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import Input from '../Components/Input';
// import MainButton from '../Components/MainButton';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import { updateProfile, updatePassword } from 'firebase/auth';
// import { AdminNavbarData, Gender } from '../Helper/constant';
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { app, auth } from '../firebase';
// import avater from '../Components/Assets/avater.png';
// import Image from 'next/image';
// import "../../../styles/scss/Profile.scss";
// import WithAuth from "../Auth" 

// const Profile = () => {
//   const [pathname, setPathname] = useState();
//   const [profilePic, setProfilePic] = useState(null);
//   const [profileUpdated, setProfileUpdated] = useState(false);

//   useEffect(() => {
//     setPathname(window.location.pathname);
//   }, []);

//   const formik = useFormik({
//     initialValues: { ...profileInitialValues, profilePic: profilePic || null },
//     validationSchema: profileSchema,
//     onSubmit: async (values) => {
//       try {
//         await updateFirebaseProfile(values);
//       } catch (error) {
//         console.error('Error updating profile:', error.message);
//       }
//     },
//   });

//   const { values, errors, touched, handleSubmit, setFieldValue } = formik;

//   const storage = getStorage(app);

//   const handleProfilePicChange = async (event) => {
//     const file = event.target.files[0];
//     setFieldValue('profilePic', file);

//     if (file) {
//       try {
//         const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
//         await uploadBytes(storageRef, file);

//         const downloadURL = await getDownloadURL(storageRef);
//         setProfilePic(downloadURL);
//       } catch (error) {
//         console.error('Error uploading profile picture:', error.message);
//       }
//     }
//   };

//   const isButtonDisabled = () => {
//     return (
//       !formik.values.profilePic && !formik.values.name && !formik.values.gender &&
//       !formik.values.oldPassword && !formik.values.newPassword
//     );
//   };

//   const updateFirebaseProfile = async (values) => {
//     try {
//       const user = auth.currentUser;

//       const profileUpdates = {
//         displayName: values.name,
//       };

//       if (values.gender) {
//         profileUpdates.gender = values.gender;
//       }

//       if (values.newPassword) {
//         await updatePassword(user, values.newPassword);
//       }

//       await updateProfile(user, profileUpdates);

//       console.log('Profile updated successfully');
//       setProfileUpdated(true);
//     } catch (error) {
//       console.error('Error updating profile:', error.message);
//     }
//   };

//   return (
//     <div>
//       <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={'hiden'} profilePic={profilePic}>
//         <div className="modal_styles">
//           <div className="all_path">
//             <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
//             <div className="profile">
//               <div className="avater_and_name">
//                 <Logout />
//                 <label htmlFor="profilePicInput" className="avater_pencilicon">
//                   <Image
//                     src={profilePic ? profilePic : avater}
//                     className={"navbar_avater"} alt={"Avater"}
//                     width={100} height={100}
//                     priority={true}
//                   />
//                   <MdOutlinePhotoCameraFront className="pencil_icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="profilePicInput"
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   onChange={handleProfilePicChange}
//                 />
//                 <p className="avater_name">Bilal Raza</p>
//               </div>

//               <div className="profile_input">
//                 <Input label="Email" className="input_profile" name="email" id="email" disabled value={formik.values.email} />
//               </div>

//               <div className="profile_input">
//                 <Input
//                   className="input_profile"
//                   label="Name"
//                   name="name"
//                   id="name"
//                   onChange={formik.handleChange}
//                   value={formik.values.name}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                 />
//                 {formik.touched.name && formik.errors.name && (
//                   <div className="error">{formik.errors.name}</div>
//                 )}
//               </div>

//               <div className="profile_input">
//                 <FormControl fullWidth>
//                   <InputLabel>Select Gender</InputLabel>
//                   <Select
//                     label="Select Gender"
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select-experience"
//                     name="gender"
//                     className="input_profile"
//                     onChange={formik.handleChange}
//                     value={formik.values.gender}
//                     error={formik.touched.gender && Boolean(formik.errors.gender)}
//                   >
//                     {Gender.map((item, index) =>
//                       <MenuItem key={index} value={item?.value}>
//                         {item?.name}
//                       </MenuItem>
//                     )}
//                   </Select>
//                   {formik.touched.gender && formik.errors.gender && (
//                     <div className="error">{formik.errors.gender}</div>
//                   )}
//                 </FormControl>
//               </div>

//               <div className="profile_input">
//                 <Input
//                   label="Old Password"
//                   name="oldPassword"
//                   id="oldPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.oldPassword}
//                   error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
//                 />
//                 {formik.touched.oldPassword && formik.errors.oldPassword && (
//                   <div className="error_oldPassword">{formik.errors.oldPassword}</div>
//                 )}

//                 <Input
//                   label="New Password"
//                   name="newPassword"
//                   id="newPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.newPassword}
//                   error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
//                 />
//                 {formik.touched.newPassword && formik.errors.newPassword && (
//                   <div className="error_oldPassword">{formik.errors.newPassword}</div>
//                 )}
//               </div>

//               <div className="parent_profilebutton">
//                 <MainButton
//                   type="submit"
//                   text="Save Changes"
//                   className="profile_button"
//                   onClick={handleSubmit}
//                   disabled={isButtonDisabled()}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </CustomLayout>
//     </div>
//   );
// };

// export default Profile;





























// "use client"
// import React, { useEffect, useState } from 'react';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import Input from '../Components/Input';
// import MainButton from '../Components/MainButton';
// import { AdminNavbarData, CompanyNavbarData, StudentNavbarData, Gender } from '../Helper/constant';
// import Image from 'next/image';
// import avater from '../Components/Assets/avater.png';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import "../../../styles/scss/Profile.scss";
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { uploadProfilePicture } from '../Helper/helper';
// import { onValue, ref } from 'firebase/database';
// import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
// import { app, auth, db } from '../firebase';
// import { Label } from '@mui/icons-material';

// const Profile = () => {
//   const [pathname, setPathname] = useState();
//   const [profilePicURL, setProfilePicURL] = useState(null);
//   const storage = getStorage(app);
//   const temper = typeof window !== undefined;
//   useEffect(() => {
//     setPathname(window.location.pathname);
//   }, [temper]);

//   const formik = useFormik({
//     initialValues: profileInitialValues,
//     validationSchema: profileSchema,
//     onSubmit: async (values) => {
//     },
//   });

//   const handleProfilePicChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       try {
//         const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
//         await uploadBytes(storageRef, file);
//         const downloadURL = await getDownloadURL(storageRef);
//         setProfilePicURL(downloadURL);
//       } catch (error) {
//         console.error('Error uploading profile picture:', error.message);
//       }
//     }
//   };

//   const { values, errors, touched, handleSubmit } = formik;

//   const isButtonDisabled = () => {
//     return (
//       !formik.values.profilePic && !formik.values.name && !formik.values.gender &&
//       !formik.values.oldPassword && !formik.values.newPassword
//     );
//   };


//   return (
//     <div>
//       <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={'hiden'}>
//         <div className="modal_styles">
//           <div className="all_path">
//             <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
//             <div className="profile">
//               <div className="avater_and_name">
//                 <Logout />
//                 <label htmlFor="profilePicInput" className="avater_pencilicon">
//                   <Image
//                     src={profilePicURL ? profilePicURL : avater}
//                     className={"navbar_avater"} alt={"Avater"}  
//                     width={100} height={100}
//                     priority={true}
//                   />
//                   <MdOutlinePhotoCameraFront className="pencil_icon" />
//                 </label>
//                 <div className="profile_input">
//                   <input
//                     type="file"
//                     id="profilePicInput"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={handleProfilePicChange}
//                   />
//                 </div>
//                 <p className="avater_name">Bilal Raza</p>
//               </div>

//               <div className="profile_input">
//                 <Input label="Email" className="input_profile" name="email" id="email" disabled value={formik.values.email} />
//               </div>

//               <div className="profile_input">
//                 <Input
//                   className="input_profile"
//                   label="Name"
//                   name="name"
//                   id="name"
//                   onChange={formik.handleChange}
//                   value={formik.values.name}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                 />
//                 {formik.touched.name && formik.errors.name && (
//                   <div className="error">{formik.errors.name}</div>
//                 )}
//               </div>

//               <div className="profile_input">
//                 <FormControl fullWidth>
//                   <InputLabel>Select Gender</InputLabel>
//                   <Select
//                     label="Select Gender"
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select-experience"
//                     name="gender"
//                     className="input_profile"
//                     onChange={formik.handleChange}
//                     value={formik.values.gender}
//                     error={formik.touched.gender && Boolean(formik.errors.gender)}
//                   >
//                     {Gender.map((item, index) =>
//                       <MenuItem key={index} value={item?.value}>
//                         {item?.name}
//                       </MenuItem>
//                     )}
//                   </Select>
//                   {formik.touched.gender && formik.errors.gender && (
//                     <div className="error">{formik.errors.gender}</div>
//                   )}
//                 </FormControl>
//               </div>

//               <div className="profile_input">
//                 <Input
//                   label="Old Password"
//                   name="oldPassword"
//                   id="oldPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.oldPassword}
//                   error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
//                 />
//                 {formik.touched.oldPassword && formik.errors.oldPassword && (
//                   <div className="error_oldPassword">{formik.errors.oldPassword}</div>
//                 )}

//                 <Input
//                   label="New Password"
//                   name="newPassword"
//                   id="newPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.newPassword}
//                   error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
//                 />
//                 {formik.touched.newPassword && formik.errors.newPassword && (
//                   <div className="error_oldPassword">{formik.errors.newPassword}</div>
//                 )}
//               </div>

//               <div className="parent_profilebutton">
//                 <MainButton
//                   type="submit"
//                   text="Save Changes"
//                   className="profile_button"
//                   onClick={formik.handleSubmit}
//                   disabled={formik.isSubmitting || !formik.isValid}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </CustomLayout>
//     </div>
//   );
// };

// export default Profile;




























// "use client"
// import React, { useEffect, useState } from 'react';
// import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import Input from '../Components/Input';
// import MainButton from '../Components/MainButton';
// import { AdminNavbarData, CompanyNavbarData, StudentNavbarData, Gender } from '../Helper/constant';
// import Image from 'next/image';
// import avater from '../Components/Assets/avater.png';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import "../../../styles/scss/Profile.scss";
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { uploadProfilePicture } from '../Helper/helper';
// import { onValue, ref } from 'firebase/database';
// import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage';
// import { app, auth, db } from '../firebase';

// const Profile = () => {
//   const [pathname, setPathname] = useState("");
//   const [profilePicURL, setProfilePicURL] = useState(null);
//   const [userType, setUserType] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const storage = getStorage(app);
//   const temper = typeof window !== undefined;

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const userRef = ref(db, `users/${auth.currentUser.uid}/userType`);
//         onValue(userRef, (snapshot) => {
//           const userType = snapshot.val();
//           if (userType) {
//             setPathname(window.location.pathname);
//             setUserType(userType);
//             setTimeout(() => {
//               setLoading(false);
//             }, 1000);
//           }
//         });
//       } catch (error) {
//         console.error('Error fetching user role:', error.message);
//       }
//     };

//     fetchData();
//   }, [temper]);

//   const formik = useFormik({
//     initialValues: profileInitialValues,
//     validationSchema: profileSchema,
//     onSubmit: async (values) => {
//     },
//   });

//   const handleProfilePicChange = async (event) => {
//   };

//   const { values, errors, touched, handleSubmit } = formik;

//   const isButtonDisabled = () => {
//     return (
//       !formik.values.profilePic && !formik.values.name && !formik.values.gender &&
//       !formik.values.oldPassword && !formik.values.newPassword
//     );
//   };

//   if (loading) {
//     return <CircularProgress />;
//   }

//   return (
//     <div>
//       <CustomLayout SideNavbarData={userType === "admin" ? AdminNavbarData : userType === "Company" ? CompanyNavbarData : userType === "student" ? StudentNavbarData : StudentNavbarData} pathname={pathname} className={'hiden'}>
//         <div className="modal_styles">
//           <div className="all_path">
//             <CustomModal SideNavbarData={userType === "admin" ? AdminNavbarData : userType === "company" ? CompanyNavbarData : userType === "student" ? StudentNavbarData : StudentNavbarData} pathname={pathname} />
//             <div className="profile">
//               <div className="avater_and_name">
//                 <Logout />
//                 <label htmlFor="profilePicInput" className="avater_pencilicon">
//                   <Image
//                     src={profilePicURL ? profilePicURL : avater}
//                     className={"navbar_avater"} alt={"Avater"}
//                     width={100} height={100}
//                     priority={true}
//                   />
//                   <MdOutlinePhotoCameraFront className="pencil_icon" />
//                 </label>
//                 <div className="profile_input">
//                   <input
//                     type="file"
//                     id="profilePicInput"
//                     accept="image/*"
//                     style={{ display: 'none' }}
//                     onChange={handleProfilePicChange}
//                   />
//                 </div>
//                 <p className="avater_name">Bilal Raza</p>
//               </div>

//               <div className="profile_input">
//                 <Input label="Email" className="input_profile" name="email" id="email" disabled value={formik.values.email} />
//               </div>

//               <div className="profile_input">
//                 <Input
//                   className="input_profile"
//                   label="Name"
//                   name="name"
//                   id="name"
//                   onChange={formik.handleChange}
//                   value={formik.values.name}
//                   error={formik.touched.name && Boolean(formik.errors.name)}
//                 />
//                 {formik.touched.name && formik.errors.name && (
//                   <div className="error">{formik.errors.name}</div>
//                 )}
//               </div>

//               <div className="profile_input">
//                 <FormControl fullWidth>
//                   <InputLabel>Select Gender</InputLabel>
//                   <Select
//                     label="Select Gender"
//                     labelId="demo-simple-select-label"
//                     id="demo-simple-select-experience"
//                     name="gender"
//                     className="input_profile"
//                     onChange={formik.handleChange}
//                     value={formik.values.gender}
//                     error={formik.touched.gender && Boolean(formik.errors.gender)}
//                   >
//                     {Gender.map((item, index) =>
//                       <MenuItem key={index} value={item?.value}>
//                         {item?.name}
//                       </MenuItem>
//                     )}
//                   </Select>
//                   {formik.touched.gender && formik.errors.gender && (
//                     <div className="error">{formik.errors.gender}</div>
//                   )}
//                 </FormControl>
//               </div>

//               <div className="profile_input">
//                 <Input
//                   label="Old Password"
//                   name="oldPassword"
//                   id="oldPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.oldPassword}
//                   error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
//                 />
//                 {formik.touched.oldPassword && formik.errors.oldPassword && (
//                   <div className="error_oldPassword">{formik.errors.oldPassword}</div>
//                 )}

//                 <Input
//                   label="New Password"
//                   name="newPassword"
//                   id="newPassword"
//                   type="password"
//                   className="input_profile"
//                   onChange={formik.handleChange}
//                   value={formik.values.newPassword}
//                   error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
//                 />
//                 {formik.touched.newPassword && formik.errors.newPassword && (
//                   <div className="error_oldPassword">{formik.errors.newPassword}</div>
//                 )}
//               </div>

//               <div className="parent_profilebutton">
//                 <MainButton
//                   type="submit"
//                   text="Save Changes"
//                   className="profile_button"
//                   onClick={formik.handleSubmit}
//                   disabled={formik.isSubmitting || !formik.isValid}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </CustomLayout>
//     </div>
//   );
// };

// export default Profile;































"use client"
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import { AdminNavbarData, CompanyNavbarData, StudentNavbarData, Gender } from '../Helper/constant';
import Image from 'next/image';
import avater from '../Components/Assets/avater.png';
import Logout from '../Components/LogoutButton';
import CustomModal from '../Components/Modal';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import CustomLayout from '../Components/Layout';
import { useFormik } from 'formik';
import "../../../styles/scss/Profile.scss";
import { profileInitialValues, profileSchema } from '../Helper/schema';
import { onValue, ref } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { app, auth, db } from '../firebase';
import Loader from '../Components/MUILoader/Loader';

const Profile = () => {
  const [pathname, setPathname] = useState("");
  const [profilePicURL, setProfilePicURL] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  const storage = getStorage(app);
  const temper = typeof window !== undefined;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = ref(db, `users/${auth.currentUser.uid}/userType`);
        onValue(userRef, (snapshot) => {
          const userType = snapshot.val();
          if (userType) {
            setPathname(window.location.pathname);
            setUserType(userType);
            setLoading(false);
          }
        });
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };

    fetchData();
  }, [temper]);

  const formik = useFormik({
    initialValues: profileInitialValues,
    validationSchema: profileSchema,
    onSubmit: async (values) => {
    },
  });

  const handleProfilePicChange = async (event) => {
  };

  const { values, errors, touched, handleSubmit } = formik;

  const isButtonDisabled = () => {
    return (
      !formik.values.profilePic && !formik.values.name && !formik.values.gender &&
      !formik.values.oldPassword && !formik.values.newPassword
    );
  };

  if (loading || userType === null) {
    return <Loader />;
  }

  return (
    <div>
      <CustomLayout SideNavbarData={userType === "admin" ? AdminNavbarData : userType === "Company" ? CompanyNavbarData : userType === "student" ? StudentNavbarData : StudentNavbarData} pathname={pathname} className={'hiden'}>
        <div className="modal_styles">
          <div className="all_path">
            <CustomModal SideNavbarData={userType === "admin" ? AdminNavbarData : userType === "company" ? CompanyNavbarData : userType === "student" ? StudentNavbarData : StudentNavbarData} pathname={pathname} />
            <div className="profile">
              <div className="avater_and_name">
                <Logout />
                <label htmlFor="profilePicInput" className="avater_pencilicon">
                  <Image
                    src={profilePicURL ? profilePicURL : avater}
                    className={"navbar_avater"} alt={"Avater"}
                    width={100} height={100}
                    priority={true}
                  />
                  <MdOutlinePhotoCameraFront className="pencil_icon" />
                </label>
                <div className="profile_input">
                  <input
                    type="file"
                    id="profilePicInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleProfilePicChange}
                  />
                </div>
                <p className="avater_name">Bilal Raza</p>
              </div>

              <div className="profile_input">
                <Input label="Email" className="input_profile" name="email" id="email" disabled value={formik.values.email} />
              </div>

              <div className="profile_input">
                <Input
                  className="input_profile"
                  label="Name"
                  name="name"
                  id="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="error">{formik.errors.name}</div>
                )}
              </div>

              <div className="profile_input">
                <FormControl fullWidth>
                  <InputLabel>Select Gender</InputLabel>
                  <Select
                    label="Select Gender"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-experience"
                    name="gender"
                    className="input_profile"
                    onChange={formik.handleChange}
                    value={formik.values.gender}
                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                  >
                    {Gender.map((item, index) =>
                      <MenuItem key={index} value={item?.value}>
                        {item?.name}
                      </MenuItem>
                    )}
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <div className="error">{formik.errors.gender}</div>
                  )}
                </FormControl>
              </div>

              <div className="profile_input">
                <Input
                  label="Old Password"
                  name="oldPassword"
                  id="oldPassword"
                  type="password"
                  className="input_profile"
                  onChange={formik.handleChange}
                  value={formik.values.oldPassword}
                  error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                />
                {formik.touched.oldPassword && formik.errors.oldPassword && (
                  <div className="error_oldPassword">{formik.errors.oldPassword}</div>
                )}

                <Input
                  label="New Password"
                  name="newPassword"
                  id="newPassword"
                  type="password"
                  className="input_profile"
                  onChange={formik.handleChange}
                  value={formik.values.newPassword}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                />
                {formik.touched.newPassword && formik.errors.newPassword && (
                  <div className="error_oldPassword">{formik.errors.newPassword}</div>
                )}
              </div>

              <div className="parent_profilebutton">
                <MainButton
                  type="submit"
                  text="Save Changes"
                  className="profile_button"
                  onClick={formik.handleSubmit}
                  disabled={formik.isSubmitting || !formik.isValid}
                />
              </div>
            </div>
          </div>
        </div>
      </CustomLayout>
    </div>
  );
};

export default Profile;
