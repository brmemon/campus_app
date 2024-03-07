import { useDispatch } from 'react-redux';
import { addData, addJob, addJobPost, setCurrentUser } from './Redux/userSlice';
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
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
              const userType = snapshot.val();
              if (userType) {
                console.log(userType, "provider userType");
                dispatch(setCurrentUser(userType));
              }
            });
          } else {
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };
    
    fetchData();
  });

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
        dispatch(addJob(await jobData.val()));
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