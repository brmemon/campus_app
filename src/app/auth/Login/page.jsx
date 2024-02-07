"use client"
import React from 'react';
import '../../../../styles/scss/LoginAndAuthContainer.scss';
import Input from '@/app/Components/Input';
import Link from 'next/link';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import AuthContainer from '../SideContainers/AuthContainer';
import { FaRegHandshake } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { loginUser } from '@/app/Helper/helper';
import { loginInitialValues, loginSchema } from '@/app/Helper/schema';

const Login = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: () => loginSchema(values),

    onSubmit: async (values) => {

      const { success, message } = await loginUser(values.email, values.password);

      if (success) {
        toast.success(message);
        router.push('/profile');
      } else {
        toast.error(message);
      }
    },
  });

  const { values, errors, touched, handleSubmit } = formik;

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
              <MainButton type="submit" text="Log In" />
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
