import React, { useState } from 'react'
import Input from '../Input';
import { IoEyeOutline } from 'react-icons/io5';
import { FaRegEyeSlash } from 'react-icons/fa6';

const FormControlInput = ({ label, onChange, value, name, id }) => {
    const [showPassword, setShowPassword] = useState(false);

    const PasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
            <div className="password-input-container">
                <Input
                    value={value}
                    name={name}
                    onChange={onChange}
                    className="input_eye"
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    id={id}
                />
                <div className="eye-icon" onClick={PasswordVisibility}>
                    {showPassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </div>
            </div>
    )
}

export default FormControlInput
