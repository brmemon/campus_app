import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../../styles/scss/Table.scss";
import { AppliedTableData } from "@/app/Helper/constant";
import "../../../../styles/scss/StudentAppliedTable.scss";
import { useSelector } from "react-redux";

const StudentDetails = () => {
  const userCurrentData = useSelector((state) => state.campus.userType);
  const allUsers = useSelector((state) => state.campus.userData);
  const dataOfJob = useSelector((state) => state.campus.jobData);
  let jobs = Object.values(dataOfJob);

  const val = Object.values(allUsers)
    ?.flatMap((item) => !!item?.appliedJobs && Object.values(item.appliedJobs))
    .filter((item) => item !== false);

  let res = [jobs, val].reduce((include, current) =>
    include?.filter((a) => current?.includes(a.id))
  );

  const filteredJobs = res.filter(
    (item) => item?.companyId === userCurrentData?.uid
  );

  const hello = filteredJobs?.flatMap(
    (item) => !!item?.studentApplied && Object.values(item.studentApplied)
  );
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
            {hello.map((items, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="tablecell_class">
                    {items?.name}
                  </TableCell>
                  <TableCell className="tablecell_class">
                    {items?.email}
                  </TableCell>
                  <TableCell className="tablecell_class">
                    {items?.education}
                  </TableCell>
                  <TableCell className="tablecell_class">
                    {items?.experience}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </TableContainer>
  );
};
export default StudentDetails;
