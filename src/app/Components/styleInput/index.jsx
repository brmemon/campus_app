import React from 'react'
import { TextField } from '@mui/material'

const StyleInput = ({ className, type, label, disabled, onChange, value, name, id }) => {
    return (
        <TextField
            label={label}
            value={value}
            type={type}
            onChange={onChange}
            className={className}
            disabled={disabled}
            name={name}
            id={id}
            variant="standard"
        />
    )
}

export default StyleInput