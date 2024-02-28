import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const userCurrentData = useSelector((state) => state.campus.userType);
    const loader = useSelector((state) => state.campus.isLoading);

    console.log(userCurrentData, "auth js ki file");

    // useEffect(() => {
    //   if (!userCurrentData) {
    //     router.push("/auth/Login")
    //   }
    // }, [])

    if (loader) {
      return <Loader />
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}