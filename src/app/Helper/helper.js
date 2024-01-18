import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";

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

///////////////////////////////////      Verification Email Sign Up         ///////////////////////////////////

const sendVerificationEmail = async (user) => {
    try {
        await sendEmailVerification(user);
        return { success: true, message: "Check Your Email And Verify " };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

///////////////////////////////////      Sign Up        ///////////////////////////////////

export const registerUser = async (email, password) => {
    try {
        const newAccount = await createUserWithEmailAndPassword(auth, email, password);
        const emailSend = await sendVerificationEmail(newAccount.user);

        return {
            success: true, message: "Signed Successfully. " + emailSend.message
        };
    } catch (error) {
        return {
            success: false,
            message: error.code === "auth/email-already-in-use" ? "Email Already In Use" : error.message
        };
    }
};
