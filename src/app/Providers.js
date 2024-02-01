"use client"
import { useDispatch } from 'react-redux';
import { addData } from './Redux/userSlice';
import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import { useEffect } from 'react';

const Providers = ({ children }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const unVerified = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists) {
        dispatch(addData(await userData.val()))
      }
    })
    return () => unVerified()
  }, [])

  return (
    <>
      {children}
    </>
  )
}

export default Providers;
