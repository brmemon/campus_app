import * as Yup from 'yup';

///////////////////////////////////      Sign Up        ///////////////////////////////////

export const signupSchema = (values) => {
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
            experience: Yup.string().when((experience, work) =>
                values.userType === 'student' ? work.required('Experience is required') : undefined
            )
        })
    )
}

export const signupInitialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    education: '',
    experience: ''
}

///////////////////////////////////      Login        ///////////////////////////////////

export const loginSchema = (values) => {
    return (
        Yup.object().shape({
            email: Yup.string()
                .email('Invalid email address')
                .test('is-com', 'Email must end with .com', (value) => value.endsWith('.com'))
                .required('Email is required'),
            password: Yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(/[\W@_]/, 'Password must contain at least one special character')
                .required('Password is required'),
        })
    );
}

export const loginInitialValues = {
    email: '',
    password: '',
}

///////////////////////////////////      Profile        ///////////////////////////////////

export const profileSchema = (values) => {
    return (
        Yup.object().shape({
            name: Yup.string().min(3, 'Name must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces'),
            oldPassword: Yup.string().when('newPassword', (newPassword, schema) =>
                newPassword && newPassword.length > 2
                    ? schema.required('Old Password is required when updating New Password')
                    : schema
            ),
            newPassword: Yup.string()
                .trim('The contact name cannot include leading and trailing spaces')
                .min(8, 'Password must be at least 8 characters')
                .matches(/[\W@_]/, 'Password must contain at least one special character')
        })
    )
}

export const profileInitialValues = {
    email: 'user@example.com',
    name: '',
    gender: '',
    oldPassword: '',
    newPassword: '',
}