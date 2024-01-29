// "use client"
// import React from 'react'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import "../../../../styles/scss/Table.scss"

// const MyTable = ({ tableData }) => {
//     return (
//         <div>
//             <TableContainer className='tablecontainer_class'>
//                 <Table
//                     className='table_class'>
//                     <TableHead>
//                         <TableRow className='table_head_class'>
//                             {tableData.map((item) => {
//                                 return (
//                                     <TableCell key={item} >
//                                         <p
//                                             className='tablecell_class'>
//                                             {item}
//                                         </p>
//                                     </TableCell>
//                                 )
//                             })}
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         <TableRow >
//                             <TableCell>Name</TableCell>
//                             <TableCell>Email</TableCell>
//                             <TableCell>Role</TableCell>
//                             <TableCell>Verify</TableCell>
//                             <TableCell>Block</TableCell>
//                         </TableRow>
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div >
//     )
// }

// export default MyTable










import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../../../../styles/scss/Table.scss";
import { useSelector } from "react-redux";
import { selectUserData } from "@/app/Redux/userSlice";

const MyTable = ({ tableData }) => {
    const userData = useSelector(selectUserData);
    console.log("userData:", userData);

    if (!Array.isArray(userData)) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <TableContainer className="tablecontainer_class">
                <Table className="table_class">
                    <TableHead>
                        <TableRow className="table_head_class">
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
                        <TableRow>
                            {userData.map((value) => {
                                <TableCell >
                                    <p
                                        className='tablecell_class'>
                                        {value?.name}
                                    </p>
                                </TableCell>
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
};

export default MyTable;
