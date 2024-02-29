import { TextField } from '@mui/material'
import React from 'react'

const Input = ({ className, type, label, disabled, onChange, value, name, id, placeholder, defaultValue }) => {
  return (
    <div>
      <TextField
        label={label}
        value={value}
        type={type}
        onChange={onChange}
        className={className}
        disabled={disabled}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue="Something that will stay there initially only"
        />
    </div>
  )
}

export default Input