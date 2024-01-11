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
// import { loginUser } from '@/app/Helper/helper';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .matches(/[\W_]/, 'Password must contain at least one special character')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { password } = values;

      const { success, message } = await signinUser(values.email, values.password);

      if (success) {
        toast.success(message);
        router.push('/Profile');
      } else {
        toast.error(message);
      }
    },
  });

  const handleChange = (event) => {
    formik.handleChange(event);
  };

  const { values, errors, touched, handleSubmit } = formik;
  // const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  // const [user, setUser] = useState(null)

  // const signinSuccess = (Message) => toast.success(Message);
  // const signinUNsuccess = (Message) => toast.error(Message);

  // const signinUser = async () => {
  //   const { success, message } = await loginUser(email, password)
  //   success ? toast.success(message) : toast.error(message);
  // }
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
          <form onSubmit={handleSubmit}>
            <div className="login_input">
              <Input
                // onChange={(e) => setEmail(e.target.value)}
                // className="input"
                // value={email}
                // type="email"
                // label="Email"
                label="Email"
                type={"email"}
                onChange={formik.handleChange}
                value={values.email}
                className={'input'}
                name="email"
                id="email"
              />
              {errors.email && touched.email && <div className="error">{errors.email}</div>}

              <FormControlInput
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
                // label="Password"
                label={"Password"}
                onChange={formik.handleChange}
                value={values.password}
                type="password"
                name="password"
                id="password"
              />
              {errors.password && touched.password && <div className="error">{errors.password}</div>}
            </div>

            <span className="forget">
              <Link
                href="/auth/ForgetPassword"
                className="forget_button">
                Forgot Password?
              </Link>
            </span>

            <div className='MainButton_Parent'>
              <MainButton type="submit" text="Log In" disabled={!formik.isValid} />
            </div>
          </form>

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
