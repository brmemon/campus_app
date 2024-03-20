"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const userCurrentData = useSelector((state) => state.campus.userType);
    const isLoading = useSelector((state) => state.campus.isLoading);
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //   const timer = setTimeout(() => {
    //     setLoading(false);
    //   }, 5000);

    //   return () => clearTimeout(timer);

    // }, []);



    useEffect(() => {
      if (isLoading) {
        <Loader />
      }
      // if (isLoading)
      //   setLoading(true)

      if (!isLoading) {
        if (!userCurrentData) {
          router.push("/auth/Login");
        } else {
          console.log(userCurrentData, "hellow world")
          if (userCurrentData.userType === "admin") {
            const adminRoutesAllowed = ["/profile", "/unverified", "/verified", "/block"];
            const currentRoute = window.location.pathname;
            // setLoading(false)
            if (!adminRoutesAllowed.includes(currentRoute)) {
              router.back();
              // setLoading(false)
            }
          } else if (userCurrentData.userType === "company") {
            const companyRoutesAllowed = ["/profile", "/jobpost", "/postedjobs", "/appliedstudent"];
            const currentRoute = window.location.pathname;
            // setLoading(false)
            if (!companyRoutesAllowed.includes(currentRoute)) {
              router.back();
              // setLoading(false)
            }
          } else if (userCurrentData.userType === "Student") {
            const studentRoutesAllowed = ["/profile", "/jobs", "/appliedjobs"];
            const currentRoute = window.location.pathname;
            // setLoading(false)
            if (!studentRoutesAllowed.includes(currentRoute)) {
              router.back();
              // setLoading(false)
            }
          }
        }
      }
    }, [isLoading, userCurrentData, router]);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}
