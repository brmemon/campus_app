"use client"
import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Input from '../Components/Input';
import MainButton from '../Components/MainButton';
import { AdminNavbarData, Gender } from '../Helper/constant';
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
                    {Gender.map((item, index) =>
                      <MenuItem
                        key={index}
                        value={item?.value}>
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