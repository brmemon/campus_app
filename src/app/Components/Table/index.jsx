import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import "../../../../styles/scss/Table.scss";
import { db } from "@/app/firebase";
import { ref, update } from "firebase/database";
import MainButton from "../MainButton";
import { useDispatch } from "react-redux";
import { updateBlockedUser } from "@/app/Redux/userSlice";

const MyTable = ({ tableData, values }) => {
    let userInfo = values;
    let updatedValue, valueUpdated;

    const verifyUsers = (data) => {
        let temper = userInfo.filter((not, index) => index === data)
        temper[0].adminVerifiedUser ? updatedValue = false : updatedValue = true;
        let uid = temper[0].uid;

        update(ref(db, `/users/${uid}`), { adminVerifiedUser: updatedValue })
    }

    // const blockUsers = (data) => {
    //     let temper = userInfo.filter((not, index) => index === data)
    //     temper[0].adminBlockedUser ? valueUpdated = false : valueUpdated = true;
    //     let uid = temper[0].uid;

    //     update(ref(db, `/users/${uid}`), { adminBlockedUser: valueUpdated })
    // }

    const dispatch = useDispatch();

    const blockUsers = (data) => {
      let temper = userInfo.filter((not, index) => index === data);
      temper[0].adminBlockedUser ? valueUpdated = false : valueUpdated = true;
      let uid = temper[0].uid;
  
      dispatch(updateBlockedUser({ uid, blocked: valueUpdated })); 
      update(ref(db, `/users/${uid}`), { adminBlockedUser: valueUpdated });
    };

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
                                            text={items.adminVerifiedUser ? "Verified" : "Verify"}
                                            onClick={() => verifyUsers(index)}
                                            disabled={items.adminVerifiedUser || items.adminBlockedUser ? true : false}
                                        />
                                    </TableCell>
                                    <TableCell className='tablecell_btn'>
                                        <MainButton
                                            className="tablecell_btn"
                                            text={items.adminBlockedUser ? "UnBlock" : "Block"}
                                            onClick={() => blockUsers(index)}
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