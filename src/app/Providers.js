"use client"
import { useDispatch } from 'react-redux';
import { addData, addJobPost } from './Redux/userSlice';
import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import { useEffect } from 'react';

const Providers = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unVerified = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists) {
        dispatch(addData(await userData.val()))
        console.log(unVerified, "Unverified");
      }
    })
    return () => unVerified()
  }, [])

  useEffect(() => {
    const jobPosts = onValue(ref(db, "/jobs"), async (jobData) => {
      if (jobData.exists) {
        dispatch(addJobPost(await jobData.val()))
        console.log(jobData, "provider");
      }
    })

    return () => jobPosts()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Providers;
