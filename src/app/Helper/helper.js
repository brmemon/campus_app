import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { ref, set } from "firebase/database";
// import { setUserData } from "../Redux/userSlice";
// import store from "../Redux/Store";
// const database = getDatabase();

///////////////////////////////////      Login        ///////////////////////////////////\

export const loginUser = (email, password) => {
    try {
        return signInWithEmailAndPassword(
            auth,
            email,
            password).then(() => {
                return { success: true, message: "Login SuccessFully" };
            }).catch(() => {
                return { success: false, message: "Invalid Email/password" };
            })

    } catch (error) {
        return { success: false, message: error.message };
    }
}


///////////////////////////////////      Sign Up        ///////////////////////////////////

// export const registerUser = async (email, password) => {
//     try {
//         const newAccount = await createUserWithEmailAndPassword(auth, email, password);
//         const emailSend = await sendVerificationEmail(newAccount.user);

//         return {
//             success: true, message: "Signed Successfully. " + emailSend.message
//         };
//     } catch (error) {
//         return {
//             success: false,
//             message: error.code === "auth/email-already-in-use" ? "Email Already In Use" : error.message
//         };
//     }
// };



// Your existing import statements

export const registerUser = async (email, password, name) => {
    try {
        const newAccount = await createUserWithEmailAndPassword(auth, email, password);

        const userRef = ref(database, `users/${newAccount.user.uid}`);
        await set(userRef, {
            email: email,
            name: name,
            password: password,
        });

        // store.dispatch(setUserData({
        //     email: email,
        //     name: name,
        //     password: password,
        // }));

        console.log('User data dispatched to Redux:', {
            email: email,
            name: name,
            password: password,
        });
        const emailSend = await sendVerificationEmail(newAccount.user);

        return {
            success: true,
            message: "Signed Successfully. " + emailSend.message,
        };
    } catch (error) {
        return {
            success: false,
            message: error.code === "auth/email-already-in-use" ? "Email Already In Use" : error.message,
        };
    }
};





// export const registerUser = async (email, password, name) => {
//     try {
//         const newAccount = await createUserWithEmailAndPassword(auth, email, password);

//         const userRef = ref(database, `users/${newAccount.user.uid}`);
//         await set(userRef, {
//             email: email,
//             name: name,
//             password: password,
//         });
//         const emailSend = await sendVerificationEmail(newAccount.user);

//         return {
//             success: true, message: "Signed Successfully. " + emailSend.message
//         };
//     } catch (error) {

//         return {
//             success: false,
//             message: error.code === "auth/email-already-in-use" ? "Email Already In Use" : error.message
//         };
//     }
// };

///////////////////////////////////      Verification Email Sign Up         ///////////////////////////////////

const sendVerificationEmail = async (user) => {
    try {
        await sendEmailVerification(user);
        return { success: true, message: "Check Your Email And Verify " };
    } catch (error) {
        return { success: false, message: error.message };
    }
};


// const submitData = async (event) => {
//     event.preventDefault()
//     const res = fetch("https://campus-app-d7eb4-default-rtdb.firebaseio.com/userDataRecords.json")
// }

///////////////////////////////////      Forgot Password         ///////////////////////////////////

export const forgotPassword = (email) => {
    try {
        return sendPasswordResetEmail(
            auth,
            email,).then(() => {
                return {
                    success: true, message: "Forgot Password SuccessFully",
                }
            }).catch(() => {
                return { success: false, message: "Invalid Email" };
            })

    } catch (error) {
        return { success: false, message: error.message };
    }
}