"use client"
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import { AdminNavbarData } from '../Helper/constant';
import Image from 'next/image';
import avater from '../Components/Assets/avater.png';
import Logout from '../Components/LogoutButton';
import CustomModal from '../Components/Modal';
import { MdOutlinePhotoCameraFront } from 'react-icons/md';
import CustomLayout from '../Components/Layout';
import { useFormik } from 'formik';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import "../../../styles/scss/Profile.scss";
import { profileInitialValues, profileSchema } from '../Helper/schema';
import { app, auth } from '../firebase';

const Profile = () => {
  const [pathname, setPathname] = useState();
  const [profilePic, setProfilePic] = useState(null);

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  const formik = useFormik({
    initialValues: { ...profileInitialValues, profilePic: profilePic || null },
    validationSchema: profileSchema,
    onSubmit: async (values) => {
    },
  });

  const { values, errors, touched, handleSubmit, setFieldValue } = formik;

  const storage = getStorage(app);

  const handleProfilePicChange = async (event) => {
    const file = event.target.files[0];
    setFieldValue('profilePic', file);

    if (file) {
      try {
        const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        setProfilePic(downloadURL);
      } catch (error) {
        console.error('Error uploading profile picture:', error.message);
      }
    }
  };

  const isButtonDisabled = () => {
    return (
      !formik.values.profilePic && !formik.values.name && !formik.values.gender &&
      !formik.values.oldPassword && !formik.values.newPassword
    );
  };

  return (
    <div>
      <CustomLayout SideNavbarData={AdminNavbarData} pathname={pathname} className={'hiden'} profilePic={profilePic}>
        <div className="modal_styles">
          <div className="all_path">
            <CustomModal SideNavbarData={AdminNavbarData} pathname={pathname} />
            <div className="profile">
              <div className="avater_and_name">
                <Logout />
                <label htmlFor="profilePicInput" className="avater_pencilicon">
                  {profilePic ? (
                    <Image src={profilePic} className="avater" alt="Avatar" width={100} height={100} /> 
                  ) : (
                    <Image priority={true} src={avater} className="avater" alt="Avatar" />
                  )}
                  <MdOutlinePhotoCameraFront className="pencil_icon" />
                </label>
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleProfilePicChange}
                />
                <p className="avater_name">Raza</p>
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
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
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
                  onClick={handleSubmit}
                  disabled={isButtonDisabled()}
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










































// "use client"
// import React, { useEffect, useState } from 'react';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import Input from '../Components/Input';
// import MainButton from '../Components/MainButton';
// import { AdminNavbarData } from '../Helper/constant';
// import Image from 'next/image';
// import avater from '../Components/Assets/avater3png.png';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import "../../../styles/scss/Profile.scss";
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { useRouter } from 'next/navigation';

// const Profile = () => {
//   const router = useRouter();

//   const [pathname, setPathname] = useState();
//   const [profilePic, setProfilePic] = useState(null);

//   useEffect(() => {
//     const storedProfilePic = localStorage.getItem('profilePic');
//     if (storedProfilePic) {
//       setProfilePic(storedProfilePic);
//     }

//     setPathname(window.location.pathname);
//   }, []);

//   const formik = useFormik({
//     initialValues: {
//       ...profileInitialValues,
//       profilePic: null,
//     },
//     validationSchema: profileSchema,
//     onSubmit: async (values) => {

//       const { success, message } = await registerUser(values.email, values.password);

//       if (success) {
//         toast.success(message);
//         router.push('/auth/VerifyEmail');
//       } else {
//         toast.error(message);
//       }
//     },
//   });

//   const { values, errors, touched, handleSubmit, setFieldValue } = formik;

//   const handleProfilePicChange = (event) => {
//     const file = event.target.files[0];
//     setFieldValue('profilePic', file);

//     if (file) {
//       const imageUrl = URL.createObjectURL(file);
//       setProfilePic(imageUrl);
//       localStorage.setItem('profilePic', imageUrl);
//     }
//   };

//   const temper = typeof window !== undefined;
//   useEffect(() => {
//     setPathname(window.location.pathname);
//   }, [temper]);

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
//                   {profilePic ? (
//                     <img src={profilePic} className="avater" alt="Avatar" />
//                   ) : (
//                     <Image priority={true} src={avater} className="avater" alt="Avatar" />
//                   )}
//                   <MdOutlinePhotoCameraFront className="pencil_icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="profilePicInput"
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   onChange={handleProfilePicChange}
//                 />
//                 <p className="avater_name">Raza</p>
//               </div>

//               <div className="profile_input">
//                 <Input
//                   label="Email"
//                   className="input_profile"
//                   name="email"
//                   id="email"
//                   disabled
//                   value={formik.values.email}
//                 />
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
//                     <MenuItem value={"male"}>Male</MenuItem>
//                     <MenuItem value={"female"}>Female</MenuItem>
//                     <MenuItem value={"other"}>Other</MenuItem>
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
// import { AdminNavbarData } from '../Helper/constant';
// import Image from 'next/image';
// import avater from '../Components/Assets/avater3png.png';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import { toast } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, uploadString, getDownloadURL } from 'firebase/storage';
// import "../../../styles/scss/Profile.scss";
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { auth } from '../firebase';
// import { updateProfile } from 'firebase/auth';

// const Profile = () => {
//   const router = useRouter();

//   const [pathname, setPathname] = useState();

//   const formik = useFormik({
//     initialValues: profileInitialValues,
//     validationSchema: profileSchema,

//     onSubmit: async (values) => {

//       const user = auth.currentUser;
//       if (user) {
//         await updateProfile(user, {
//           photoURL: formik.values.avatarUrl,
//         });
//       }

//       toast.success("Profile updated successfully!");
//     },
//   });

//   const { values, errors, touched } = formik;

//   const temper = typeof window !== undefined;
//   useEffect(() => {
//     setPathname(window.location.pathname);
//   }, [temper]);

//   const handleImageChange = async (event) => {
//     const file = event.target.files[0];

//     if (file) {
//       const storage = getStorage();
//       const storageRef = ref(storage, `avatars/${file.name}`);

//       try {
//         const snapshot = await uploadString(storageRef, file, 'data_url');

//         const downloadURL = await getDownloadURL(snapshot.ref);

//         formik.setFieldValue("avatarUrl", downloadURL);

//         toast.success("Avatar uploaded successfully!");
//       } catch (error) {
//         console.error("Error uploading avatar:", error);
//         toast.error("Error uploading avatar. Please try again.");
//       }
//     }
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
//                 <span className="avater_pencilicon">
//                   <Image src={avater} className="avater" alt="Avatar" />
//                   <label htmlFor="avatar-upload">
//                     <MdOutlinePhotoCameraFront
//                       className="pencil_icon"
//                     />
//                     <input
//                       type="file"
//                       id="avatar-upload"
//                       accept="image/*"
//                       style={{ display: "none" }}
//                       onChange={handleImageChange}
//                     />
//                   </label>
//                 </span>
//                 <p className="avater_name">Raza</p>
//               </div>

//               <div className="profile_input">
//                 <label htmlFor="avatar-upload">
//                   Upload Avatar
//                   <input
//                     type="file"
//                     id="avatar-upload"
//                     accept="image/*"
//                     // style={{ display: "none" }}
//                     onChange={handleImageChange}
//                   />
//                 </label>
//               </div>

//               <div className="profile_input">
//                 <Input
//                   label="Email"
//                   className="input_profile"
//                   name="email"
//                   id="email"
//                   disabled
//                   value={formik.values.email}
//                 />
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
//                     <MenuItem value={"male"}>Male</MenuItem>
//                     <MenuItem value={"female"}>Female</MenuItem>
//                     <MenuItem value={"other"}>Other</MenuItem>
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
// import { AdminNavbarData } from '../Helper/constant';
// import Image from 'next/image';
// import avater from '../Components/Assets/avater3png.png';
// import Logout from '../Components/LogoutButton';
// import CustomModal from '../Components/Modal';
// import { MdOutlinePhotoCameraFront } from 'react-icons/md';
// import CustomLayout from '../Components/Layout';
// import { useFormik } from 'formik';
// import { useRouter } from 'next/navigation';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import "../../../styles/scss/Profile.scss";
// import { profileInitialValues, profileSchema } from '../Helper/schema';
// import { app, auth } from '../firebase';

// const Profile = () => {
//   const [pathname, setPathname] = useState(window.location.pathname);
//   const [profilePic, setProfilePic] = useState();

//   useEffect(() => {
//     setPathname(window.location.pathname);
//   }, []);

//   const formik = useFormik({
//     initialValues: { ...profileInitialValues, profilePic: null },
//     validationSchema: profileSchema,
//     onSubmit: async (values) => {
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
//                   {profilePic ? (
//                     <img src={profilePic} className="avater" alt="Avatar" />
//                   ) : (
//                     <Image priority={true} src={avater} className="avater" alt="Avatar" />
//                   )}
//                   <MdOutlinePhotoCameraFront className="pencil_icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="profilePicInput"
//                   accept="image/*"
//                   style={{ display: 'none' }}
//                   onChange={handleProfilePicChange}
//                 />
//                 <p className="avater_name">Raza</p>
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
//                     <MenuItem value={"male"}>Male</MenuItem>
//                     <MenuItem value={"female"}>Female</MenuItem>
//                     <MenuItem value={"other"}>Other</MenuItem>
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





































