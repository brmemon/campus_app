"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import "../../../../styles/scss/Table.scss"
import { selectCampusData } from '@/app/Redux/CampusSlice'
import { useSelector } from 'react-redux'

const MyTable = ({ tableData }) => {
    const campusData = useSelector(selectCampusData);
    console.log(campusData , "hellow 12345");
    return (
        <div>
            <TableContainer className='tablecontainer_class'>
                <Table
                    className='table_class'>
                    <TableHead>
                        <TableRow className='table_head_class'>
                            {tableData.map((item) => {
                                return (
                                    <TableCell key={item} >
                                        <p
                                            className='tablecell_class'>
                                            {item}
                                        </p>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campusData.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.role}</TableCell>
                            </TableRow>
                        ))}
                        {/* <TableRow>
                            <TableCell>Raza</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Raza123@gmail.com</TableCell>
                            <TableCell>Alpha</TableCell>
                            <TableCell>Block</TableCell>
                        </TableRow> */}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default MyTable