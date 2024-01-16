///////////////////////    this is perfect code  /////////////////////////

///////////////////////////////////////////////////////////////////////////
"use client"
import React from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import Input from '@/app/Components/Input';
import LSF_Container from '../SideContainers/AuthContainer';
import MainButton from '@/app/Components/MainButton';
import FormControlInput from '@/app/Components/formControlInput';
import { registerUser } from '@/app/Helper/helper';
import { FaRegHandshake } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import Requirement from './Requirement';
import { useRouter } from 'next/navigation';
import "../../../../styles/scss/signup.scss"
import { signupInitialValues, signupSchema } from '@/app/Helper/schema';

const Signup = () => {
    const router = useRouter();
    
    const formik = useFormik({
        initialValues: signupInitialValues,
        validationSchema: ()=>signupSchema(values),
        
        onSubmit: async (values) => {
            const { success, message } = await registerUser(values.email, values.password);
            
            if (success) {
                toast.success(message);
                router.push('/auth/VerifyEmail');
            } else {
                toast.error(message);
            }
        },
    });
    
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
                                    error={touched.userType && Boolean(errors.userType)}
                                    className={'select'}
                                    name="userType"
                                >
                                    <MenuItem value={'student'}>Student</MenuItem>
                                    <MenuItem value={'Company'}>Company</MenuItem>
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                            {errors.userType && touched.userType && <div className="error">{errors.userType}</div>}

                            {values.userType === 'student' ? <Requirement formik={formik} /> : null}
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
///////////////////////////////////////////////////////////////////////////















// "use client"
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
// import Requirement from './Requirement';
// import { useRouter } from 'next/navigation';
// import "../../../../styles/scss/signup.scss"

// const Signup = () => {
//     const router = useRouter();

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
//         email: Yup.string()
//             .email('Invalid email address')
//             .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
//             .required('Email is required'),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .matches(/[\W@_]/, 'Password must contain at least one special character')
//             .required('Password is required'),
//         confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
//         userType: Yup.string().required('Role is required'),
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
//                                 <div className='formik_input'>
//                                     <Input
//                                         onChange={formik.handleChange}
//                                         value={values.name}
//                                         className={'input'}
//                                         label="Name"
//                                         name="name"
//                                         id="name"
//                                     />
//                                     {errors.name && touched.name && <div className="error">{errors.name}</div>}
//                                 </div>
//                                 <div className='formik_input'>
//                                     <Input
//                                         onChange={formik.handleChange}
//                                         value={values.email}
//                                         className={'input'}
//                                         type="email"
//                                         label="Email"
//                                         name="email"
//                                         id="email"
//                                     />
//                                     {errors.email && touched.email && <div className="error">{errors.email}</div>}
//                                 </div>
//                             </div>
//                             <div className='login_input_display'>
//                                 <div className='formik_input'>
//                                     <FormControlInput
//                                         onChange={formik.handleChange}
//                                         value={values.password}
//                                         type="password"
//                                         label="Password"
//                                         name="password"
//                                         id="password"
//                                     />
//                                     {errors.password && touched.password && <div className="error">{errors.password}</div>}
//                                 </div>
//                                 <div className='formik_input'>
//                                     <FormControlInput
//                                         onChange={formik.handleChange}
//                                         value={values.confirmPassword}
//                                         type="password"
//                                         label="Confirm Password"
//                                         name="confirmPassword"
//                                         id="confirmPassword"
//                                     />
//                                     {errors.confirmPassword && touched.confirmPassword && (
//                                         <div className="error">{errors.confirmPassword}</div>
//                                     )}
//                                 </div>
//                             </div>

//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     label="Select Role"
//                                     value={values.userType}
//                                     onChange={formik.handleChange}
//                                     error={touched.userType && Boolean(errors.userType)}
//                                     className={'select'}
//                                     name="userType"
//                                 >
//                                     <MenuItem value={'student'}>Student</MenuItem>
//                                     <MenuItem value={'Company'}>Company</MenuItem>
//                                     <MenuItem value={'admin'}>Admin</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             {errors.userType && touched.userType && <div className="error">{errors.userType}</div>}

//                             {values.userType === 'student' ? <Requirement userType={values.userType} /> : null}
//                         </div>

//                         <div className="MainButton_Parent">
//                             <MainButton type="submit" text="Sign Up" disabled={!formik.isValid} />
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// "use client"
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
// import Requirement from './Requirement.jsx';
// import "../../../../styles/scss/signup.scss";
// import { useRouter } from 'next/navigation.js';

// const Signup = () => {
//     const router = useRouter();

//     const validationSchema = Yup.object().shape({
//         name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name is required'),
//         email: Yup.string()
//             .email('Invalid email address')
//             .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
//             .required('Email is required'),
//         password: Yup.string()
//             .min(8, 'Password must be at least 8 characters')
//             .matches(/[\W@_]/, 'Password must contain at least one special character')
//             .required('Password is required'),
//         confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
//         userType: Yup.string().required('Role is required'),
//         education: Yup.string()
//             .when('userType', {
//                 is: "student",
//                 then: Yup.string().required('Education is required'),
//             }),
//         experience: Yup.string()
//             .when('userType', {
//                 is: "student",
//                 then: Yup.string().required('Experience is required'),
//             }),

//     });

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             email: '',
//             password: '',
//             confirmPassword: '',
//             userType: '',
//             education: '',
//             experience: '',
//         },
//         validationSchema: validationSchema,
//         onSubmit: async (values) => {
//             const { password, confirmPassword, userType, education, experience } = values;

//             if (userType === 'student' && (!education || !experience)) {
//                 toast.error('Please fill the education and experience ');
//                 return;
//             }

//             const { success, message } = await registerUser(values.email, values.password);

//             if (success) {
//                 toast.success(message);
//                 router.push('/');
//             } else {
//                 toast.error(message);
//             }
//         },
//     });

//     console.log(formik.values, "formik values", formik.errors, "formik errors")
//     return (
//         <div className="container">
//             <ToastContainer />
//             <LSF_Container />
//             <div className="main_container">
//                 <div className="sub_container_two">
//                     <FaRegHandshake className="media_logo" />
//                     <h1 className="login_logo">Sign Up</h1>
//                     <h2 className="login_welcome">Welcome! Create Your Account Now</h2>

//                     <form onSubmit={formik.handleSubmit}>
//                         <div className="Signup_input">
//                             <div className='login_input_display'>
//                                 <div className='formik_input'>
//                                     <Input
//                                         onChange={formik.handleChange}
//                                         value={formik.values.name}
//                                         className={'input'}
//                                         label="Name"
//                                         name="name"
//                                         id="name"
//                                     />
//                                     {formik.errors.name && formik.touched.name && <div className="error">{formik.errors.name}</div>}
//                                 </div>
//                                 <div className='formik_input'>
//                                     <Input
//                                         onChange={formik.handleChange}
//                                         value={formik.values.email}
//                                         className={'input'}
//                                         type="email"
//                                         label="Email"
//                                         name="email"
//                                         id="email"
//                                     />
//                                     {formik.errors.email && formik.touched.email && <div className="error">{formik.errors.email}</div>}
//                                 </div>
//                             </div>
//                             <div className='login_input_display'>
//                                 <div className='formik_input'>
//                                     <FormControlInput
//                                         onChange={formik.handleChange}
//                                         value={formik.values.password}
//                                         type="password"
//                                         label="Password"
//                                         name="password"
//                                         id="password"
//                                     />
//                                     {formik.errors.password && formik.touched.password && <div className="error">{formik.errors.password}</div>}
//                                 </div>
//                                 <div className='formik_input'>
//                                     <FormControlInput
//                                         onChange={formik.handleChange}
//                                         value={formik.values.confirmPassword}
//                                         type="password"
//                                         label="Confirm Password"
//                                         name="confirmPassword"
//                                         id="confirmPassword"
//                                     />
//                                     {formik.errors.confirmPassword && formik.touched.confirmPassword && (
//                                         <div className="error">{formik.errors.confirmPassword}</div>
//                                     )}
//                                 </div>
//                             </div>

//                             <FormControl fullWidth>
//                                 <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
//                                 <Select
//                                     labelId="demo-simple-select-label"
//                                     id="demo-simple-select"
//                                     label="Select Role"
//                                     value={formik.values.userType}
//                                     onChange={formik.handleChange}
//                                     error={formik.touched.userType && Boolean(formik.errors.userType)}
//                                     className={'select'}
//                                     name="userType"
//                                 >
//                                     <MenuItem value={'student'}>Student</MenuItem>
//                                     <MenuItem value={'Company'}>Company</MenuItem>
//                                     <MenuItem value={'admin'}>Admin</MenuItem>
//                                 </Select>
//                             </FormControl>
//                             {formik.errors.userType && formik.touched.userType && <div className="error">{formik.errors.userType}</div>}

//                             {formik.values.userType === 'student' ? <Requirement formik={formik} /> : null}
//                         </div>

//                         <div className="MainButton_Parent">
//                             <MainButton type="submit" text="Sign Up" disabled={!formik.isValid} />
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////