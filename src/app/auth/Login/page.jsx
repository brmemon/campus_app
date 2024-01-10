"use client"
import React, { useState } from 'react';
import '../../../../styles/scss/LoginAndAuthContainer.scss';
import Input from '@/app/Components/Input';
import Link from 'next/link';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import AuthContainer from '../SideContainers/AuthContainer';
import { FaRegHandshake } from 'react-icons/fa6';
// import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// import { app, auth } from "../../firebase"
// import Signup from '../Signup/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '@/app/Helper/helper';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)

  // const signinSuccess = (Message) => toast.success(Message);
  // const signinUNsuccess = (Message) => toast.error(Message);

  const signinUser = async () => {
    const { success, message } = await loginUser(email, password)
    success ? toast.success(message) : toast.error(message);
  }
  // console.log(value.success, "hellow123")
  //   if (value.success === true) {
  //     toast.success(value.message)
  //   } else {
  //     toast.error(value.message)
  //   }


  //   try {
  //     const value = await registerUser(email, password);
  //     console.log(value.success, "hello123");
  //     if (value.success === true) {
  //       toast.success("Login Successfully");
  //     } else {
  //       toast.error("Invalid Email/Password");
  //     }
  //   } catch (error) {
  //     console.error( error.message);
  //     toast.error("hello");
  //   }
  // }

  // const signinUser = async () => {
  //   try {
  //     const value = await registerUser(email, password);
  //     console.log(value)
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // }
  // signInWithEmailAndPassword(
  // auth,
  // email,
  // password)
  // .then((value => toast.success("Login Successfully")))
  // .catch((err => toast.error("Invalid Email/Password")))

  // useEffect(() => {
  //   onAuthStateChanged(auth, user => {
  //     if (user) {
  //       setUser(user)
  //     }
  //     else {
  //       setUser(null)
  //     }
  //   })
  // }, [])

  // if (user === null) {
  //   return (
  //     <Signup />
  //   )
  // }

  const PasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="container">

      <AuthContainer />
      <ToastContainer />
      <div className='main_container'>
        <div className="sub_container_two">
          <FaRegHandshake className="media_logo" />
          <h1 className="login_logo"> Login </h1>
          <h2 className='login_welcome'> Welcome Back! Login To Your Account </h2>

          <div className="login_input">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              label="Email"
              value={email}
              type={"email"}
            />

            <FormControlInput
              label={"Password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <span className="forget">
            <Link
              href="/auth/ForgetPassword"
              className="forget_button">
              Forgot Password?
            </Link>
          </span>

          <div className='MainButton_Parent'>
            {/* <Link
              href="/profile"
              className="forget_button"
            > */}
            <MainButton
              onClick={signinUser}
              text={"Login"}
            />
            {/* </Link> */}
          </div>

          <p className='sinUp_text'> Don't Have An Account ?
            <Link
              className='link'
              href="/auth/Signup"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
