import { TextField } from '@mui/material'
import React from 'react'

const Input = ({ className, type, label, disabled }) => {
  return (
    <div>
      <TextField
        label={label}
        type={type}
        className={className}
        disabled={disabled}
      />
    </div>
  )
}

export default Input