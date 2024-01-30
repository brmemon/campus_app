import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../../../../styles/scss/Table.scss";

const MyTable = ({ tableData, values }) => {
    return (
        <div>
            <TableContainer className="tablecontainer_class">
                <Table className="table_class">
                    <TableHead>
                        <TableRow className="table_head_class">
                            {tableData.map((item) =>
                                <TableCell
                                    key={item}
                                    className='tablecell_class'>
                                    {item}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.map((items, index) => {
                            // console.log(values, "values")
                            return (
                                <TableRow key={index}>
                                    <TableCell className='tablecell_class'>{items?.name}</TableCell>
                                    <TableCell className='tablecell_class'>{items?.email}</TableCell>
                                    <TableCell className='tablecell_class'>{items?.userType}</TableCell>
                                    <TableCell className='tablecell_class'>
                                        <Button className="table_button">Block</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    );
};
export default MyTable;