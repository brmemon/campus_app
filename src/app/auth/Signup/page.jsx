"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Input from '@/app/Components/Input'
import StudentRequirment from './StudentRequirment.jsx'
import LSF_Container from '../SideContainers/AuthContainer.jsx'
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import { registerUser } from '@/app/Helper/helper';
import { FaRegHandshake } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import "../../../../styles/scss/signup.scss"
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation.js'
import VerifyEmail from '../VerifyEmail/index.jsx'
import { Formik, Form, Field } from 'formik';

const Signup = () => {
    const [userType, setUserType] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");

    const router = useRouter();

    const signupUser = async () => {

        if (!password || !confirmPassword) {
            toast.error("Please enter both password and confirm password.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Password and confirm password do not match.");
            return;
        }

        const { success, message } = await registerUser(email, password)

        if (success) {
            toast.success(message)
            router.push('/VerifyEmail');
        }
        else {
            toast.error(message)
        }
    }

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div className='container'>
            <ToastContainer className={"signup_toast"} />
            <LSF_Container />
            <div className='main_container'>
                <div className='sub_container_two'>
                    <FaRegHandshake className="media_logo" />
                    <h1 className='login_logo'>Sign Up</h1>
                    <h2 className='login_welcome'>Welcome! Create Your Acount Now</h2>

                    <div className='Signup_input' >
                        <div className='login_input_display'>
                            <Input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className={"input"}
                                label="Name"
                            />
                            <Input
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                type={"email"}
                                className={"input"}
                                label="Email"
                            />
                        </div>
                        <div className='login_input_display'>
                            <FormControlInput
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                label={"Password"}
                            />
                            <FormControlInput
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                type={"password"}
                                label={"Confirm Password"}
                            />
                        </div>
                        <div className='input_select'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userType}
                                    label="Select Role"
                                    onChange={handleChange}
                                    className={"select"}
                                >
                                    <MenuItem value={"student"}>Student</MenuItem>
                                    <MenuItem value={"Company"}>Company</MenuItem>
                                    <MenuItem value={"admin"}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        {(userType === 'student') ?
                            <StudentRequirment userType={userType} />
                            :
                            false}
                    </div>
                    <div className='MainButton_Parent'>
                        <MainButton
                            onClick={signupUser}
                            text={"Sign Up"}
                        />
                    </div>
                    <p className='sinUp_text'>
                        Already have an account ?
                        <Link
                            className='link'
                            href="/auth/Login"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
