import { useDispatch } from 'react-redux';
import { addData, addJobPost } from './Redux/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onValue, ref } from 'firebase/database';
import { auth, db } from './firebase';

const Providers = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const userDataUnsubscribe = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists()) {
        const usersData = userData.val();
        dispatch(addData(usersData));
        // console.log(userData, "userData ", "usersData ", usersData);

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
