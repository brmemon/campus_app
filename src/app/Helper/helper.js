import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

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



export const registerUser = (email, password) => {
    try {
        return createUserWithEmailAndPassword(
            auth,
            email,
            password).then(() => {
                return { success: true, message: "Signed Successfully" };
            }).catch(() => {
                return { success: false, message: "Email Already In Use" };
            })

    } catch (error) {
        return { success: false, message: error.message };
    }
}