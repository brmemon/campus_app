import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

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

export const registerUser = async (email, password, name, userType, emailVerifiedUser, adminVerifiedUser, adminBlockedUser, uid) => {
    try {
        const newAccount = await createUserWithEmailAndPassword
            (auth, email, password, userType, emailVerifiedUser, adminVerifiedUser, adminBlockedUser, uid);

        const userRef = ref(db, `users/${newAccount.user.uid}`);
        await set(userRef, {
            email: email,
            name: name,
            password: password,
            userType: userType,
            emailVerifiedUser: false,
            adminVerifiedUser: false,
            adminBlockedUser: false,
            uid: newAccount.user.uid
        });

        console.log('User data dispatched to Redux:', {
            email: email,
            name: name,
            password: password,
            userType: userType,
            emailVerifiedUser: false,
            adminVerifiedUser: false,
            adminBlockedUser: false,
            uid: newAccount.user.uid
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

///////////////////////////////////      Verification Email Sign Up         ///////////////////////////////////

const sendVerificationEmail = async (user) => {
    try {
        await sendEmailVerification(user);
        return { success: true, message: "Check Your Email And Verify " };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

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