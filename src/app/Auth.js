import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Loader from "./Components/MUILoader/Loader";
import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onValue, ref } from "firebase/database";

export default function withAuth(Component) {
  function AuthWrapper(props) {
    const router = useRouter();
    const [userType, setUserType] = useState(null);
    const currentUser = useSelector(state => state.campus.currentUserData);
    const isLoading = useSelector(state => state.campus.isLoading);
    console.log("currentUser ", currentUser,
      //  "isLoading", isLoading
    );
    useEffect(() => {
      const fetchData = async () => {
        try {
          const userRef = ref(db, `users/${auth.currentUser.uid}/userType`);
          onValue(userRef, (snapshot) => {
            const userType = snapshot.val();
            if (userType) {
              setUserType(userType);
              // console.log(userType, " Is userType");
              if (!currentUser) {
                // console.log(!userType, "!userType", <br />, userType, "userType ");
                router.push('/auth/Login');
              }
            }
          });
        } catch (log) {
          // console.log('Error fetching user role:');
        }

      };

      fetchData();
    }, [currentUser]);

    if (isLoading)
      return <Loader />

    return <Component {...props} />;
  }

  return AuthWrapper;
}