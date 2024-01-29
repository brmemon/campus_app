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
import { Provider } from 'react-redux';
import store from './Redux/Store';

const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default Providers;
