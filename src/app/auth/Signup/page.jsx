"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Input from '@/app/Components/Input';
import LSF_Container from '../SideContainers/AuthContainer';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import { registerUser } from '@/app/Helper/helper';
import { FaRegHandshake } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Requirement from './Requirement';
import { useRouter } from 'next/navigation';
import '../../../../styles/scss/signup.scss';
import { signupInitialValues, signupSchema } from '@/app/Helper/schema';
import { onValue, ref } from 'firebase/database';
import { db } from '@/app/firebase';

const Signup = () => {
    const router = useRouter();
    let statusBlocked, userEmail;
    useEffect(() => {
        onValue(ref(db, "/users"), async (data) => {
            if (data.val()) {
                let myVal = Object?.values(data.val());
                let ind = myVal.findIndex((item) => item?.email === values.email)

                statusBlocked = myVal[ind]?.adminBlockedUser;
                userEmail = myVal[ind]?.email;
            }
        })
    })
    const formik = useFormik({
        initialValues: signupInitialValues,
        validationSchema: () => signupSchema(values),

        onSubmit: async (values) => {

            const { success, message } = await registerUser(values);
            if (success) {
                toast.success(message);
                router.push('/auth/VerifyEmail');
                if (statusBlocked) {
                    toast.error('Your account is blocked, please contact the admin');
                    router.push('/BlockedPage');
                }
            } else {
                toast.error(message);
            }
        },
    });

    const { values, errors, touched, handleSubmit } = formik;
    return (
        <div className="container">
            <ToastContainer className={'signup_toast'} />
            <LSF_Container />
            <div className="main_container">
                <div className="sub_container_two">
                    <FaRegHandshake className="media_logo" />
                    <h1 className="login_logo">Sign Up</h1>
                    <h2 className="login_welcome">Welcome! Create Your Account Now</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="Signup_input">
                            <div className='login_input_display'>
                                <div className='formik_input'>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={values.name}
                                        className={'input'}
                                        label="Name"
                                        name="name"
                                        id="name"
                                    />
                                    {errors.name && touched.name && <div className="error">{errors.name}</div>}
                                </div>
                                <div className='formik_input'>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={values.email}
                                        className={'input'}
                                        type="email"
                                        label="Email"
                                        name="email"
                                        id="email"
                                    />
                                    {errors.email && touched.email && <div className="error">{errors.email}</div>}
                                </div>
                            </div>
                            <div className='login_input_display'>
                                <div className='formik_input'>
                                    <FormControlInput
                                        onChange={formik.handleChange}
                                        value={values.password}
                                        type="password"
                                        label="Password"
                                        name="password"
                                        id="password"
                                    />
                                    {errors.password && touched.password && <div className="error">{errors.password}</div>}
                                </div>
                                <div className='formik_input'>
                                    <FormControlInput
                                        onChange={formik.handleChange}
                                        value={values.confirmPassword}
                                        type="password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="error">{errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Role"
                                    value={values.userType}
                                    onChange={formik.handleChange}
                                    error={touched.userType && Boolean(errors.userType)}
                                    className={'select'}
                                    name="userType"
                                >
                                    <MenuItem value={'student'}>Student</MenuItem>
                                    <MenuItem value={'Company'}>Company</MenuItem>
                                    {/* <MenuItem value={'admin'}>Admin</MenuItem> */}
                                </Select>
                            </FormControl>
                            {errors.userType && touched.userType && <div className="error">{errors.userType}</div>}

                            {values.userType === 'student' ? <Requirement formik={formik} /> : null}
                        </div>

                        <div className="MainButton_Parent">
                            <MainButton type="submit" text="Sign Up" />
                        </div>
                    </form>

                    <p className="sinUp_text">
                        Already have an account ?
                        <Link className="link" href="/auth/Login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;