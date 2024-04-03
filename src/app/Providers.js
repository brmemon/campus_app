import { useDispatch } from 'react-redux';
import { addData, addJobPost, setCurrentUser } from './Redux/userSlice';
import { useEffect } from 'react';
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
                dispatch(setCurrentUser(userType));
                if (!userType.adminBlockedUser) {
                  router.push('/profile');
                }
              }
            });
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching user role:', error.message);
      }
    };

    fetchData();
  }, [router, dispatch]);

  useEffect(() => {
    const userDataUnsubscribe = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists()) {
        const usersData = userData.val();
        dispatch(addData(usersData));
        const currentUser = auth.currentUser;
        if (currentUser) {
          const isAdminBlocked = usersData[currentUser.uid]?.adminBlockedUser;
          if (isAdminBlocked) {
            router.push('/BlockedPage');
          }
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
  });

  return (
    <>
      {children}
    </>
  );
};

export default Providers;
