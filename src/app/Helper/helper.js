import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

///////////////////////////////////      Login        ///////////////////////////////////

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

export const registerUser = async (data) => {
    try {

        const { email, password } = data
        const newAccount = await createUserWithEmailAndPassword
            (auth, email, password);

        let tempData = data;
        delete tempData.password
        delete tempData.confirmPassword

        const userRef = ref(db, `users/${newAccount.user.uid}`);
        await set(userRef, {
            ...tempData,
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
        return { success: true, message: "" };
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