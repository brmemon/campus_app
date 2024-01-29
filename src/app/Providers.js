// "use client"
// import { Provider} from "react-redux"
// import { store } from "./Redux/Store"

// export const Providers = ({ children }) => {
//     return (
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// }


"use client"
import { useDispatch } from 'react-redux';
import { addData } from './Redux/userSlice';
import { onValue, ref } from 'firebase/database';
import { db } from './firebase';
import { useEffect } from 'react';

const Providers = ({children}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const nonverified = onValue(ref(db, "/users"), async (userData) => {
      if (userData.exists) {
        dispatch(addData(await userData.val()))
      }
    })
    return () => nonverified()
  }, [])
 


  return(
      <>
      {children}
      </>
  )
}

export default Providers;
