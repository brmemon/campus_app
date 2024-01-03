// import { FormControl, IconButton, Input, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
// import { FaRegEyeSlash } from 'react-icons/fa6'
// import { IoEyeOutline } from 'react-icons/io5'
import Input from '../Input';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa6';

const FormControlInput = ({ label, text }) => {
    const [showPassword, setShowPassword] = useState(false);

    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>


            <div className="password-input-container">
                <Input
                    className="input_eye"
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                />
                <div className="eye-icon" onClick={PasswordVisibility}>
                    {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </div>
            </div>


            {/* <div className="password-input-container">
                <FormControl>
                <InputLabel text={text} />
                    <OutlinedInput  
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <IconButton
                                onClick={PasswordVisibility}
                                type={showPassword ? 'text' : 'password'}
                            >
                                {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                            </IconButton>
                        }
                        label={label}
                    />
                </FormControl>
            </div> */}
        </div>
    )
}

export default FormControlInput
