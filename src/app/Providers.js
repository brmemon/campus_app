// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { addData, addJobPost } from './Redux/userSlice';
// import { onValue, ref } from 'firebase/database';
// import { auth, db } from './firebase';
// import { useRouter } from 'next/navigation';

// const Providers = ({ children }) => {
//   const dispatch = useDispatch();
//   const router = useRouter();

//   useEffect(() => {
//     const unVerified = onValue(ref(db, "/users"), async (userData) => {
//       if (userData.exists) {
//         dispatch(addData(await userData.val()));
//         const usersData = userData.val(); 
//         if (auth.currentUser) {
//           const currentUserUid = auth.currentUser.uid;
//           const blockedUser = Object.keys(usersData).find(userId => usersData[userId].adminBlockedUser === true);
//           if (blockedUser && blockedUser === currentUserUid) {
//             router.push('/BlockedPage');
//           } 
//         }
//       }
//     });

//     unVerified();
//     // return () => unVerified();
//   }, [dispatch, router]);

//   useEffect(() => {
//     const jobPosts = onValue(ref(db, "/jobs"), async (jobData) => {
//       if (jobData.exists) {
//         dispatch(addJobPost(await jobData.val()));
//       }
//     });
//     return () => jobPosts();
//   }, [dispatch]);

//   return (
//     <>
//       {children}
//     </>
//   );
// };

// export default Providers;




























import { useDispatch } from 'react-redux';
import { addData, addJobPost } from './Redux/userSlice';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { get, onValue, ref } from 'firebase/database';
import { auth, db } from './firebase';

const Providers = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter()

  useEffect(() => {
    const unSubscribe = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists()) {
        const usersData = userData.val();
        dispatch(addData(usersData));
      }
    });

    return () => unSubscribe();
  }, [dispatch, router]);

  useEffect(() => {
    const jobPosts = onValue(ref(db, "/jobs"), async (jobData) => {
      if (jobData.exists()) {
        dispatch(addJobPost(await jobData.val()));
      }
    });

    return () => jobPosts();
  }, [dispatch]);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = ref(db, `/users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (userData && userData.adminBlockedUser) {
          router.push('/BlockedPage');
        }
      }
    });

    return () => unsubscribeAuth();
  }, [router]);

  return (
    <>
      {children}
    </>
  );
};

export default Providers;
