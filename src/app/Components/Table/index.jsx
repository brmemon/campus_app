import React from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../../../../styles/scss/Table.scss";
import { db } from "@/app/firebase";
import { ref, update } from "firebase/database";
import MainButton from "../MainButton";
import { toast } from "react-toastify";

const MyTable = ({ tableData, values }) => {
    let userInfo = values;
    let updatedValue, updValue;

    const updateVerify = (val) => {
        let temp = userInfo.filter((elem, ind) => ind === val)
        temp[0].isAdminVerified ? updatedValue = false : updatedValue = true;
        let uid = temp[0].uid;

        update(ref(db, `/users/${uid}`), { isAdminVerified: updatedValue })
            .then(() => {
                toast.success('User Verified Successfully', {
                    // position: "top-right",
                })
            })
            .catch((error) => {
                toast.error('Error in updating the user status', {
                    // position: "top-right",
                })
            });
    }

    const updateBlock = (val) => {
        let temp = userInfo.filter((elem, ind) => ind === val)
        temp[0].isAdminBlocked ? updValue = false : updValue = true;
        let uid = temp[0].uid;

        update(ref(db, `/users/${uid}`), { isAdminBlocked: updValue })
            .then(() => {
                if (updValue) {
                    toast.success('User Blocked Successfully', {
                        // position: "top-right",
                    })
                }
                else {
                    toast.success('User UnBlocked Successfully', {
                        // position: "top-right",
                    })
                }
            })
            .catch((error) => {
                toast.error('Error in updating the user status', {
                    // position: "top-right",
                })
            });
    }

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
                            return (
                                <TableRow key={index}>
                                    <TableCell className='tablecell_class'>{items?.name}</TableCell>
                                    <TableCell className='tablecell_class'>{items?.email}</TableCell>
                                    <TableCell className='tablecell_class'>{items?.userType}</TableCell>
                                    <TableCell className='tablecell_btn'>
                                        <MainButton
                                            className="tablecell_btn"
                                            text={items.isAdminVerified ? "Verified" : "Verify"}
                                            onClick={() => updateVerify(index)}
                                            disabled={items.isAdminVerified || items.isAdminBlocked ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell className='tablecell_btn'>
                                        <MainButton
                                            className="tablecell_btn"
                                            text={items.isAdminBlocked ? "UnBlock" : "Block"}
                                            onClick={() => updateBlock(index)}
                                        />
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