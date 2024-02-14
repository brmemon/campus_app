import React from 'react'
import { CircularProgress } from '@mui/material'
import "../../../../styles/scss/Loader.scss"
const Loader = () => {
    return (
        <div className='main_loader_div'>
            <h1 className="campus_text">Campus App</h1>
            <CircularProgress className='loader_div' />
        </div>
    )
}

export default Loader