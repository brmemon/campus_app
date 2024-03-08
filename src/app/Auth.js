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
        <Loader />;
      }

      if (!userCurrentData) {
        router.push("/auth/Login");
      } else if (!loader) {
        if (userCurrentData.userType === "admin") {
          const adminRoutesAllowed = [
            "/profile",
            "/unverified",
            "/verified",
            "/block",
          ];
          const currentRoute = window.location.pathname;
          console.log(userCurrentData.userType, "userCurrentData.userType ");
          if (!adminRoutesAllowed.includes(currentRoute)) {
            router.push("/profile");
          }
        }
      } else if (!loader) {
        if (userCurrentData.userType === "Company") {
          const adminRoutesAllowed = [
            "/profile",
            "/jobspost",
            "/postedjobs",
            "/studentapplied",
          ];
          const currentRoute = window.location.pathname;
          console.log(userCurrentData.userType, "userCurrentData.userType ");
          if (!adminRoutesAllowed.includes(currentRoute)) {
            router.push("/profile");
          }
        } else if (!loader) {
          if (userCurrentData.userType === Student) {
            const adminRoutesAllowed = [
              "/profile",
              "/jobs",
              "/appliedjobs",
            ];
            const currentRoute = window.location.pathname;
            console.log(userCurrentData.userType, "userCurrentData.userType ");
            if (!adminRoutesAllowed.includes(currentRoute)) {
              router.push("/profile");
            }
          }
        }
      }
    }, [userCurrentData, router, loader]);

    return <Component {...props} />;
  }

  return AuthWrapper;
}
