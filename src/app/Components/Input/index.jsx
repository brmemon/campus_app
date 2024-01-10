import { TextField } from '@mui/material'
import React from 'react'

const Input = ({ className, type, label, disabled, onChange, value }) => {
  return (
    <div>
      <TextField
        label={label}
        value={value}
        type={type}
        onChange={onChange}
        className={className}
        disabled={disabled}
      />
    </div>
  )
}

export default Input