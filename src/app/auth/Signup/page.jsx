"use client"
import React, { useState } from 'react'
import { Button, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material'
import Input from '@/app/Components/Input'
import { FaRegHandshake } from "react-icons/fa6";
import Link from 'next/link'
import "../../../../styles/scss/signup.scss"
import StudentRequirment from './StudentRequirment.jsx'
import LSF_Container from '../SideContainers/AuthContainer.jsx'
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';

const Signup = () => {
    const [userType, setUserType] = useState('');

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <div className='container'>
            <LSF_Container />
            <div className='main_container'>
                <div className='sub_container_two'>
                    <FaRegHandshake className="media_logo" />
                    <h1 className='login_logo'>Sign Up</h1>
                    <h2 className='login_welcome'>Welcome! Create Your Acount Now</h2>

                    <div className='Signup_input' >
                        <div className='login_input_display'>
                            <Input className={"input"} label="Name" />
                            <Input className={"input"} label="Email" />
                        </div>
                        <div className='login_input_display'>
                            <FormControlInput label={"Password"} />
                            <FormControlInput label={"Cunfirm Password"} />
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
                        <MainButton text={"Sign Up"} />
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
