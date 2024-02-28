import React from 'react';
import MainButton from '../MainButton';
import "../../../../styles/scss/LogoutButton.scss";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Image from 'next/image';
import question from "../Assets/questionmark.png";
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '@/app/Redux/userSlice';

const Logout = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const currentUser = useSelector(state => state.campus.currentUserData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleYesClick = () => {
    auth.signOut()
      .then(() => {
        // dispatch(addData(''));
        router.push('/auth/Login'); 
      })
      .catch(error => {
        console.error('Error LogOut:', error);
      });
  };

  return (
    <div>
      <div className='logout_button'>
        <MainButton onClick={handleOpen} className={"logout_width"} text={"Log Out"} />
      </div>
      <Modal className='logout_modal' open={open} onClose={handleClose}>
        <Box className="logout_box">
          <Image src={question} className='question_mark' alt='Question Mark' />
          <p className='logout_modal_para'>
            The action you are perform is irreversible
            please confirm! Are you sure you want to Log Out ?
          </p>
          <div className='yes_no_button'>
            <MainButton onClick={handleClose} text={"No"} />
            <MainButton onClick={handleYesClick} text={"Yes"} />
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default Logout;
