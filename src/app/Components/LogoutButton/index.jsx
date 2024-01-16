// "use client"
import React from 'react'
import MainButton from '../MainButton'
import "../../../../styles/scss/LogoutButton.scss"
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import Image from 'next/image'
import question from "../Assets/question.png"
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleYesClick = () => {
    router.push('/auth/Login');
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
            The action you are perform is irreversible please confirm! Are you sure you want to Log Out ?
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

export default Logout




