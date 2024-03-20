import React from 'react'
import { CircularProgress } from '@mui/material'
import "../../../../styles/scss/Loader.scss"
const Loader = () => {
    return (
        <div className='main_loader_div'>
            <CircularProgress className='loader_div' />
        </div>
    )
}

export default Loader