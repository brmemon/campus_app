import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import MainButton from "../MainButton";
import "../../../../styles/scss/Table.scss";
import { AppliedTableData } from "@/app/Helper/constant";
import "../../../../styles/scss/StudentAppliedTable.scss";

const StudentDetails = () => {
  return (
    <TableContainer className="">
      <div className="my_class">
        <Table className="table_div">
          <TableHead>
            {AppliedTableData?.map((item) => (
              <TableCell key={item} className="tablecell_div">
                {item}
              </TableCell>
            ))}
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="tablecell_class">hellow</TableCell>
              <TableCell className="tablecell_class">hellow</TableCell>
              <TableCell className="tablecell_class">hellow</TableCell>
              <TableCell className="tablecell_btn">hellow</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};
export default StudentDetails;
