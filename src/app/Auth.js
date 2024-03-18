"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const userCurrentData = useSelector((state) => state.campus.userType);
    const loader = useSelector((state) => state.campus.isLoading);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 5000);

      return () => clearTimeout(timer);

    }, []);

    useEffect(() => {
      if (!loading) {
        if (!userCurrentData) {
          router.push("/auth/Login");
        } else {
          if (userCurrentData.userType === "admin") {
            const adminRoutesAllowed = ["/profile", "/unverified", "/verified", "/block"];
            const currentRoute = window.location.pathname;
            if (!adminRoutesAllowed.includes(currentRoute)) {
              router.push("/profile");
            }
          } else if (userCurrentData === "Company") {
            const companyRoutesAllowed = ["/profile", "/jobpost", "/postedjobs", "/appliedstudent"];
            const currentRoute = window.location.pathname;
            if (!companyRoutesAllowed.includes(currentRoute)) {
              router.push("/profile");
            }
          } else if (userCurrentData === "Student") {
            const studentRoutesAllowed = ["/profile", "/jobs", "/appliedjobs"];
            const currentRoute = window.location.pathname;
            if (!studentRoutesAllowed.includes(currentRoute)) {
              router.push("/profile");
            }
          }
        }
      }
    }, [loading, userCurrentData, router]);

    if (loading) {
      return <Loader />;
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}
