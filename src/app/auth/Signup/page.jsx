// "use client"
// import React, { useState } from 'react'
// import Link from 'next/link'
// import Input from '@/app/Components/Input'
// import StudentRequirment from './StudentRequirment.jsx'
// import LSF_Container from '../SideContainers/AuthContainer.jsx'
// import MainButton from '@/app/Components/MainButton';
// import FormControlInput from '@/app/Components/formControlInput';
// import { registerUser } from '@/app/Helper/helper';
// import { FaRegHandshake } from "react-icons/fa6";
// import { ToastContainer, toast } from 'react-toastify';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
// import "../../../../styles/scss/signup.scss"
// import 'react-toastify/dist/ReactToastify.css';
// import { useRouter } from 'next/navigation.js'
// // import { useFormik } from 'formik'

// // const initialValues = {
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirm_password: "",
// // }

// const Signup = () => {
//     // const [userType, setUserType] = useState("");
//     // const [email, setEmail] = useState("")
//     // const [password, setPassword] = useState("")
//     // const [confirmPassword, setConfirmPassword] = useState("");
//     // const [name, setName] = useState("");

//     // const { values, errors, handleBlur, onSubmit, handleChange } = useFormik({
//     //     initialValues: initialValues,
//     //     onSubmit: (values) => {

//     //     }
//     // })

//     const router = useRouter();

//     const signupUser = async () => {

//         if (!password || !confirmPassword) {
//             toast.error("Please enter both password and confirm password.");
//             return;
//         }

//         if (password !== confirmPassword) {
//             toast.error("Password and confirm password do not match.");
//             return;
//         }

//         const { success, message } = await registerUser(email, password)

//         if (success) {
//             toast.success(message)
//             router.push('/');
//         }
//         else {
//             toast.error(message)
//         }
//     }

//     const handleChange = (event) => {
//         setUserType(event.target.value);
//     };

//     return (
//         <div className='container'>
//             <ToastContainer className={"signup_toast"} />
//             <LSF_Container />
//             <div className='main_container'>
//                 <div className='sub_container_two'>
//                     <FaRegHandshake className="media_logo" />
//                     <h1 className='login_logo'>Sign Up</h1>
//                     <h2 className='login_welcome'>Welcome! Create Your Acount Now</h2>

//                     <div className='Signup_input' >
//                         <div className='login_input_display'>
//                             <Input
//                                 onChange={(e) => setName(e.target.value)}
//                                 value={values.name}
//                                 className={"input"}
//                                 label="Name"
//                                 name={"name"}
//                                 id={"name"}
//                             />
//                             <Input
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 value={email}
//                                 type={"email"}
//                                 className={"input"}
//                                 label="Email"
//                                 name={"email"}
//                                 id={"email"}

//                             />
//                         </div>
//                         <div className='login_input_display'>
//                             <FormControlInput
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 value={password}
//                                 label={"Password"}
//                                 name={"password"}
//                                 id={"password"}
//                             />
//                             <FormControlInput
//                                 onChange={(e) => setConfirmPassword(e.target.value)}
//                                 value={confirmPassword}
//                                 type={"password"}
//                                 label={"Confirm Password"}
//                                 name={"cunfirm password"}
//                                 id={"cunfirm password"}
//                             />
//                         </div>
//                         <div className='input_select'>
//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={userType}
//                                     label="Select Role"
//                                     onChange={handleChange}
//                                     className={"select"}
//                                     name={"select"}
//                                 >
//                                     <MenuItem value={"student"}>Student</MenuItem>
//                                     <MenuItem value={"Company"}>Company</MenuItem>
//                                     <MenuItem value={"admin"}>Admin</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </div>
//                         {(userType === 'student') ?
//                             <StudentRequirment userType={userType} />
//                             :
//                             false}
//                     </div>
//                     <div className='MainButton_Parent'>
//                         <MainButton
//                             type={"submit"}
//                             onClick={signupUser}
//                             text={"Sign Up"}
//                         />
//                     </div>
//                     <p className='sinUp_text'>
//                         Already have an account ?
//                         <Link
//                             className='link'
//                             href="/auth/Login"
//                         >
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Signup;

























// import React from 'react';
// import Link from 'next/link';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import Input from '@/app/Components/Input';
// import LSF_Container from '../SideContainers/AuthContainer';
// import MainButton from '@/app/Components/MainButton';
// import FormControlInput from '@/app/Components/formControlInput';
// import { registerUser } from '@/app/Helper/helper';
// import { FaRegHandshake } from 'react-icons/fa6';
// import { ToastContainer, toast } from 'react-toastify';
// import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import 'react-toastify/dist/ReactToastify.css';
// import "../../../../styles/scss/signup.scss"
// import { useRouter } from 'next/navigation.js';
// import Requirement from './index.jsx';

// const Signup = () => {
//     const router = useRouter();

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
//         email: Yup.string()
//             .email('Invalid email address')
//             .test('is-com', 'Email must end with ".com"', (value) => value.endsWith('.com'))
//             .required('Email is required'),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .matches(/[\W_]/, 'Password must contain at least one special character')
//             .required('Password is required'),
//         confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
//         userType: Yup.string().required('User Type is required'),
//     });

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             const { password, confirmPassword, userType } = values;

//             // if (!password || !confirmPassword) {
//             //     toast.error('Please enter both password and confirm password.');
//             //     return;
//             // }

//             // if (password !== confirmPassword) {
//             //     toast.error('Password and confirm password do not match.');
//             //     return;
//             // }

//             const { success, message } = await registerUser(values.email, values.password);

//             if (success) {
//                 toast.success(message);
//                 router.push('/');
//             } else {
//                 toast.error(message);
//             }
//         },
//     });

//     const handleChange = (event) => {
//         formik.handleChange(event);
//     };

//     const { values, errors, touched, handleSubmit } = formik;

//     return (
//         <div className="container">
//             <ToastContainer className={'signup_toast'} />
//             <LSF_Container />
//             <div className="main_container">
//                 <div className="sub_container_two">
//                     <FaRegHandshake className="media_logo" />
//                     <h1 className="login_logo">Sign Up</h1>
//                     <h2 className="login_welcome">Welcome! Create Your Account Now</h2>

//                     <form onSubmit={handleSubmit}>
//                         <div className="Signup_input">
//                             <div className='login_input_display'>
//                                 <Input
//                                     onChange={formik.handleChange}
//                                     value={values.name}
//                                     className={'input'}
//                                     label="Name"
//                                     name="name"
//                                     id="name"
//                                 />

//                                 {errors.name && touched.name && <div className="error">{errors.name}</div>}
//                                 <Input
//                                     onChange={formik.handleChange}
//                                     value={values.email}
//                                     className={'input'}
//                                     type="email"
//                                     label="Email"
//                                     name="email"
//                                     id="email"
//                                 />
//                             </div>
//                             {errors.email && touched.email && <div className="error">{errors.email}</div>}

//                             <FormControlInput
//                                 onChange={formik.handleChange}
//                                 value={values.password}
//                                 type="password"
//                                 label="Password"
//                                 name="password"
//                                 id="password"
//                             />
//                             {errors.password && touched.password && <div className="error">{errors.password}</div>}

//                             <FormControlInput
//                                 onChange={formik.handleChange}
//                                 value={values.confirmPassword}
//                                 type="password"
//                                 label="Confirm Password"
//                                 name="confirmPassword"
//                                 id="confirmPassword"
//                             />
//                             {errors.confirmPassword && touched.confirmPassword && (
//                                 <div className="error">{errors.confirmPassword}</div>
//                             )}

//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
//                                 <Select

//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     value={values.userType}
//                                     label="Select Role"
//                                     onChange={handleChange}
//                                     className={'select'}
//                                     name="userType"
//                                 >

// {/* labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={formik.values.userType}
//     label="Select Role"
//     onChange={formik.handleChange}
//     onBlur={formik.handleBlur}
//     error={formik.touched.userType && (formik.errors.userType)}
//     helperText={formik.touched.userType && formik.errors.userType}
//     className={'select'}
//     name="userType" */}

//                                     <MenuItem value={'student'}>Student</MenuItem>
//                                     <MenuItem value={'Company'}>Company</MenuItem>
//                                     <MenuItem value={'admin'}>Admin</MenuItem>
//                                 </Select>
//                             </FormControl>

//                             {values.userType === 'student' ? <Requirement userType={values.userType} /> : null}
//                         </div>

//                         <div className="MainButton_Parent">
//                             <MainButton type="submit" text="Sign Up" />
//                         </div>
//                     </form>

//                     <p className="sinUp_text">
//                         Already have an account ?
//                         <Link className="link" href="/auth/Login">
//                             Login
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;










"use client"
import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@/app/Components/Input';
import LSF_Container from '../SideContainers/AuthContainer';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import { registerUser } from '@/app/Helper/helper';
import { FaRegHandshake } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Requirement from './index.jsx';
import { useRouter } from 'next/navigation';
import "../../../../styles/scss/signup.scss"

const Signup = () => {
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .matches(/[\W_]/, 'Password must contain at least one special character')
            .required('Password is required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
        userType: Yup.string().required('Role is required'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            userType: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            const { password, confirmPassword, userType } = values;

            const { success, message } = await registerUser(values.email, values.password);

            if (success) {
                toast.success(message);
                router.push('/');
            } else {
                toast.error(message);
            }
        },
    });

    const handleChange = (event) => {
        formik.handleChange(event);
    };

    const { values, errors, touched, handleSubmit } = formik;

    return (
        <div className="container">
            <ToastContainer className={'signup_toast'} />
            <LSF_Container />
            <div className="main_container">
                <div className="sub_container_two">
                    <FaRegHandshake className="media_logo" />
                    <h1 className="login_logo">Sign Up</h1>
                    <h2 className="login_welcome">Welcome! Create Your Account Now</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="Signup_input">
                            <div className='login_input_display'>
                                <div className='formik_input'>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={values.name}
                                        className={'input'}
                                        label="Name"
                                        name="name"
                                        id="name"
                                    />
                                    {errors.name && touched.name && <div className="error">{errors.name}</div>}
                                </div>
                                <div className='formik_input'>
                                    <Input
                                        onChange={formik.handleChange}
                                        value={values.email}
                                        className={'input'}
                                        type="email"
                                        label="Email"
                                        name="email"
                                        id="email"
                                    />
                                    {errors.email && touched.email && <div className="error">{errors.email}</div>}
                                </div>
                            </div>
                            <div className='login_input_display'>
                                <div className='formik_input'>
                                    <FormControlInput
                                        onChange={formik.handleChange}
                                        value={values.password}
                                        type="password"
                                        label="Password"
                                        name="password"
                                        id="password"
                                    />
                                    {errors.password && touched.password && <div className="error">{errors.password}</div>}
                                </div>
                                <div className='formik_input'>
                                    <FormControlInput
                                        onChange={formik.handleChange}
                                        value={values.confirmPassword}
                                        type="password"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                    />
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="error">{errors.confirmPassword}</div>
                                    )}
                                </div>
                            </div>

                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Select Role"
                                    value={values.userType}
                                    onChange={formik.handleChange}
                                    error={touched.userType && (errors.userType)}
                                    className={'select'}
                                    name="userType"
                                >
                                    <MenuItem value={'student'}>Student</MenuItem>
                                    <MenuItem value={'Company'}>Company</MenuItem>
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.userType && touched.userType && <div className="error">{errors.userType}</div>}

                            {values.userType === 'student' ? <Requirement userType={values.userType} /> : null}
                        </div>

                        <div className="MainButton_Parent">
                            <MainButton type="submit" text="Sign Up" disabled={!formik.isValid} />
                        </div>
                    </form>

                    <p className="sinUp_text">
                        Already have an account ?
                        <Link className="link" href="/auth/Login">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;









