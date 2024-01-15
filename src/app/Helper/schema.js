import * as Yup from 'yup';
export const signupSchema = (values) => {
    console.log(values, "values")
    return (
        Yup.object().shape({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email address')
                .trim('The contact name cannot include leading and trailing spaces')
                .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
                .required('Email is required'),
            password: Yup.string()
                .trim('The contact name cannot include leading and trailing spaces')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[\W@_]/, 'Password must contain at least one special character')
                .required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
            userType: Yup.string().required('Role is required'),
            education: Yup.string().when((education, work) =>
                values.userType === 'student' ? work.required('Education is required') : undefined),
            experience: Yup.string().when((experience, work) => {
                console.log(experience, "EXPERIENCE", values, "VALUES")
                return (
                    values.userType === 'student' ? work.required('Experience is required') : undefined
                )
            }
            )
        })
    )
}



// // import * as Yup from 'yup';

// // export const signupSchema = Yup.object().shape({
// //     name: Yup.string()
// //         .min(3, 'Name must be at least 3 characters')
// //         .trim('The contact name cannot include leading and trailing spaces')
// //         .required('Name is required'),

// //     email: Yup.string()
// //         .email('Invalid email address')
// //         .trim('The contact name cannot include leading and trailing spaces')
// //         .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
// //         .required('Email is required'),

// //     password: Yup.string()
// //         .trim('The contact name cannot include leading and trailing spaces')
// //         .min(8, 'Password must be at least 8 characters')
// //         .matches(/[\W@_]/, 'Password must contain at least one special character')
// //         .required('Password is required'),

// //     confirmPassword: Yup.string()
// //         .oneOf([Yup.ref('password'), null], 'Passwords must match')
// //         .required('Confirm Password is required'),

// //     userType: Yup.string().required('Role is required'),

// //     education: Yup.string().when('userType', {
// //         is: (userType, values) => userType === 'student' ? values.userType : undefined,
// //         then: Yup.string().required('Education is required'),
// //         otherwise: Yup.string(),
// //     }),

// //     experience: Yup.string().when('userType', {
// //         is: (userType, values) => userType === 'student' ? values.userType : undefined,
// //         then: Yup.string().required('Experience is required'),
// //         otherwise: Yup.string(),
// //     }),
// // });


export const signupInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    education: '',
    experience: ''
}