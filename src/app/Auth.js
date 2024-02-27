"use client"
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";
import { auth, db } from "./firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const [userType, setUserType] = useState(null);
    const authUser = useSelector(state => state.campus.userData);
    const isLoading = useSelector(state => state.campus.isLoading);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userRef = ref(db, `users/${auth.currentUser.uid}/userType`);
          onValue(userRef, (snapshot) => {
            const userType = snapshot.val();
            if (userType) {
              setUserType(userType);
              console.log(userType);
            }
          });
        } catch (log) {
          console.log('fetching user role:');
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      if (!authUser) {
        return router.push('/auth/Login')
      }
    }, []);

    if (isLoading) {
      return <Loader />;
    }

    return <Component {...props} />;

  }
  return AuthWrapper;
}
