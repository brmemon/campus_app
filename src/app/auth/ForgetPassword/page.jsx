"use client";
import { useState } from 'react';
import { Button } from '@mui/material';
import Input from '@/app/Components/Input';
import Link from 'next/link';
import AuthContainer from '../SideContainers/AuthContainer';
import { FaRegHandshake } from 'react-icons/fa6';
import MainButton from '@/app/Components/MainButton';
import "../../../../styles/scss/ForgetPassword.scss";
import { forgotPassword } from '@/app/Helper/helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = async () => {
    const { success, message } = await forgotPassword(email);

    if (success) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  return (
    <div className='container'>
      <AuthContainer />
      <ToastContainer />
      <div className='main_container'>
        <div className='sub_container_two'>
          <FaRegHandshake className="media_logo" />
          <h1 className='login_logo'>Forgot Password</h1>
          <h2 className='login_welcome'>Get Back Your Account Quickly And Easily</h2>
          <div className='forget_input'>
            <Input
              id="userEmail"
              className={"input"}
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='MainButton_Parent'>
            <MainButton id={"reset"} text={"Forgot Password"} onClick={handleForgotPassword}></MainButton>
          </div>
          <Button>
            <Link href="/auth/Login">Back To Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

































// "use client"
// import React, { useEffect } from 'react';
// import { Button } from '@mui/material';
// import Input from '@/app/Components/Input';
// import Link from 'next/link';
// import AuthContainer from '../SideContainers/AuthContainer';
// import { FaRegHandshake } from 'react-icons/fa6';
// import { auth } from '@/app/firebase';
// import MainButton from '@/app/Components/MainButton';
// import { sendPasswordResetEmail } from 'firebase/auth';
// import "../../../../styles/scss/ForgetPassword.scss"

// const ForgetPassword = () => {
//   useEffect(() => {
//     const emailInput = document.querySelector("#userEmail");
//     const resetButton = document.querySelector("#reset");

//     const handleResetClick = function () {
//       sendPasswordResetEmail(auth, emailInput.value)
//         .then(() => {
//           console.log("Check Your Email And Set New Password")
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           const errorMessage = error.message;
//           console.error(`Reset Password Error (${errorCode}): ${errorMessage}`);
//         });
//     };

//     if (resetButton) {
//       resetButton.addEventListener("click", handleResetClick);
//     }

//     return () => {
//       if (resetButton) {
//         resetButton.removeEventListener("click", handleResetClick);
//       }
//     };
//   }, [])
//   return (
//     <div className='container'>
//       <AuthContainer />
//       <div className='main_container'>
//         <div className='sub_container_two'>
//           <FaRegHandshake className="media_logo" />
//           <h1 className='login_logo'>Forgot Password</h1>
//           <h2 className='login_welcome'>Get Back Your Acount Quickly And Easily</h2>
//           <div className='forget_input' >
//             <Input id="userEmail" className={"input"} label="Email" />
//           </div>
//           <div className='MainButton_Parent'>
//             <MainButton id={"reset"} text={"Forgot Password"}></MainButton >
//           </div>
//           <Button>
//             <Link
//               className='link'
//               href="/auth/Login"
//             >Back To Login
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div >
//   )
// }

// export default ForgetPassword
























