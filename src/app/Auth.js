import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const userCurrentData = useSelector((state) => state.campus.userType);
    console.log(userCurrentData, "auth ki file ");
    const loader = useSelector((state) => state.campus.isLoading);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (loader) {
        <Loader />
      }

      if (!userCurrentData) {
        router.push("/auth/Login");

      } else if (!loader) {
        if (userCurrentData.userType === "admin") {
          const adminRoutesAllowed = ["/profile", "/unverified", "/verified", "/block"];
          const currentRoute = window.location.pathname;
          console.log(userCurrentData.userType , "userCurrentData.userType ");
          if (!adminRoutesAllowed.includes(currentRoute)) {
            router.push("/profile");
          }
        }

        else if (userCurrentData === "Company") {
          const companyRoutesAllowed = ["/profile", "/jobpost", "/postedjobs", "/appliedstudent"];
          const currentRoute = window.location.pathname;
          if (!companyRoutesAllowed.includes(currentRoute)) {
            router.push("/profile");
          }
        }

        else if (userCurrentData === "Student") {
          const studentRoutesAllowed = ["/profile", "/jobs", "/appliedjobs"];
          const currentRoute = window.location.pathname;
          if (!studentRoutesAllowed.includes(currentRoute)) {
            router.push("/profile");
          }
        }
      }
    }, [userCurrentData, router, loader]);


    return <Component {...props} />;
  }

  return AuthWrapper;
}