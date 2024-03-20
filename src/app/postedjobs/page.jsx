"use client";
import React, { useEffect, useState } from "react";
import CustomLayout from "../Components/Layout";
import "../../../styles/scss/PostedJobs.scss";
import { CompanyNavbarData, Table } from "../Helper/constant";
import "../../../styles/scss/globals.scss";
import Logout from "../Components/LogoutButton";
import CustomModal from "../Components/Modal";
import MapData from "../Components/MapData";
import { useSelector } from "react-redux";
import withAuth from "../Auth";

const PostedJobs = () => {
  const [pathname, setPathname] = useState();

  const selectorJobData = useSelector((state) => state.campus.jobData);
  const dataJobs = Object.values(selectorJobData);

  const temper = typeof window !== undefined;
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [temper]);

  return (
    <div>
      <CustomLayout SideNavbarData={CompanyNavbarData} pathname={pathname}>
        <div className="all_path">
          <h1 className="top_heading">Posted Jobs</h1>
          <CustomModal SideNavbarData={CompanyNavbarData} />
          <Logout />
          <MapData dataJobs={dataJobs} />
        </div>
      </CustomLayout>
    </div>
  );
};

export default withAuth(PostedJobs);