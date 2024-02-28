import { useDispatch } from 'react-redux';
import { addData, addJobPost, setCurrentUser } from './Redux/userSlice';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onValue, ref } from 'firebase/database';
import { auth, db } from './firebase';

const Providers = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = ref(db, `users/${auth.currentUser.uid}/userType`);
        onValue(userRef, (snapshot) => {
          const userType = snapshot.val();
          if (userType) {
            console.log(userType, "provider userType");
            dispatch(setCurrentUser(userType))
          }
        });
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };
    fetchData();
  }, []);



  // const fetchCurrentUser = async () => {
  //   const users = auth.currentUser;
  //   if (users) {
  //     dispatch(setCurrentUser(users));
  //   }
  // };

  // fetchCurrentUser();
  // console.log(auth.currentUser , "currentUser provider" );

  useEffect(() => {
    const userDataUnsubscribe = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists()) {
        const usersData = userData.val();
        dispatch(addData(usersData));
        const currentUser = auth.currentUser;
        if (currentUser && usersData[currentUser.uid]?.adminBlockedUser) {
          router.push('/BlockedPage');
        }
      }
    });

    const jobPostsUnsubscribe = onValue(ref(db, "/jobs"), async (jobData) => {
      if (jobData.exists()) {
        dispatch(addJobPost(await jobData.val()));
      }
    });

    return () => {
      userDataUnsubscribe();
      jobPostsUnsubscribe();
    };
  }, [dispatch, router]);

  return (
    <>
      {children}
    </>
  );
};

export default Providers;