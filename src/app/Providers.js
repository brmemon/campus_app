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
import { onValue, ref } from 'firebase/database';
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
    const unSubscribe = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists()) {
        const usersData = userData.val();
        dispatch(addData(usersData));
  
        const currentUser = auth.currentUser;
        if (currentUser && usersData[currentUser.uid]?.adminBlockedUser) {
          router.push('/BlockedPage');
        }
      }
    });
  
    return () => unSubscribe();
  }, [dispatch, router]);
  

  return (
    <>
      {children}
    </>
  );
};

export default Providers;
