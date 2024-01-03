"use client"
import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import "./style.scss"

const MyTable = ({ tableData }) => {
    // console.log(tableData, "nice")
    return (
        <div>
            <TableContainer className='tablecontainer_class'>
                <Table
                    className='table_class'>
                    <TableHead>
                        <TableRow className='table_head_class'>
                            {tableData.map((item) => {
                                // console.log(tableData, "Table Data")
                                return (
                                    <TableCell key={item} >
                                        <p
                                            className='tablecell_class'>
                                            {item}
                                        </p>
                                    </TableCell>
                                )
                            }
                            )
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Raza</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Raza123@gmail.com</TableCell>
                            <TableCell>Alpha</TableCell>
                            <TableCell>Block</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Raza</TableCell>
                            <TableCell>Company</TableCell>
                            <TableCell>Raza123@gmail.com</TableCell>
                            <TableCell>Alpha</TableCell>
                            <TableCell>Block</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default MyTable


