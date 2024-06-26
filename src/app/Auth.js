import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const userCurrentData = useSelector((state) => state.campus.userType);
    const isLoading = useSelector((state) => state.campus.isLoading);
    
    useEffect(() => {
      if (!isLoading) {
        if (!userCurrentData) {
          router.push("/auth/Login");
        } else if (userCurrentData?.adminBlockedUser) {
          router.push("/BlockedPage");
        } else {
          if (userCurrentData.userType === "admin") {
            const adminRoutesAllowed = ["/profile", "/unverified", "/verified", "/block"];
            const currentRoute = window.location.pathname;
            if (!adminRoutesAllowed.includes(currentRoute)) {
              router.back();
              if (window.location.pathname === currentRoute) {
                router.forward();
              }
            }
          } else if (userCurrentData.userType === "company") {
            const companyRoutesAllowed = ["/profile", "/jobpost", "/postedjobs", "/appliedstudent"];
            const currentRoute = window.location.pathname;
            if (!companyRoutesAllowed.includes(currentRoute)) {
              router.back();
              if (window.location.pathname === currentRoute) {
                router.forward();
              }
            }
          } else if (userCurrentData.userType === "Student") {
            const studentRoutesAllowed = ["/profile", "/jobs", "/appliedjobs"];
            const currentRoute = window.location.pathname;
            if (!studentRoutesAllowed.includes(currentRoute)) {
              router.back();
              if (window.location.pathname === currentRoute) {
                router.forward();
              }
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
