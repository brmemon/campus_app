"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const auth = useSelector(state => state.campus.userData);
    console.log(auth , "New world");
    useEffect(() => {
      if (!auth) {
        router.push('/auth/Login');
      }
      else {
        setLoading(false)
      }
    }, [auth, router]);

    if (loading) {
      return <Loader />;
    }

    if (!auth) {
      router.push('/auth/Login');
    }

    return <Component {...props} />;
  }

  return AuthWrapper;
}
