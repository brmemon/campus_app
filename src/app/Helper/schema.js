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
                .min(6, 'Password must be at least 6 characters')
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
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        })
    );
}

export const loginInitialValues = {
    email: '',
    password: '',
}

///////////////////////////////////      Profile        ///////////////////////////////////

export const profileSchema = () => {
    return (
        Yup.object().shape({
            name: Yup.string().min(3, 'Name must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .max(15 , "Max 15 Caracters" ),
            oldPassword: Yup.string().when('newPassword', (newPassword, schema) =>
                newPassword && newPassword.length > 2
                    ? schema.required('Old Password is required when updating New Password')
                    : schema
            ),
            newPassword: Yup.string()
                .trim('The contact name cannot include leading and trailing spaces')
                .min(6, 'Password must be at least 6 characters')
        })
    )
}

export const profileInitialValues = (userCurrentData) => {
    return {
        email: userCurrentData?.email,
        name: userCurrentData?.name,
        oldPassword: '',
        newPassword: '',
    }
}

///////////////////////////////////      Job Post        ///////////////////////////////////

export const jobPostSchema = (values) => {
    return (
        Yup.object().shape({
            id: Yup.string().min(3, 'Tittle must be at least 3 characters'),
            tittle: Yup.string()
                .min(3, 'Tittle must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Tittle is required')
                .max(20, 'Minimum qualification max 20 characters'),
            minimumQualification: Yup.string()
                .min(3, 'Minimum qualification must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Minimum Qualification is required')
                .max(10, 'Minimum qualification max 10 characters'),
            category: Yup.string()
                .min(3, 'Category must be at least 3 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Category is required')
                .max(20, 'category max 20 characters'),
            skills: Yup.string()
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Skill is required')
                .max(40, 'skill max 40 characters'),
            salary: Yup.string()
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Salary is required')
                .max(10, 'Salary max 10 characters'),
            discription: Yup.string()
                .min(3, 'Tittle must be at least 3 characters')
                .max(40, 'description max 40 characters')
                .trim('The contact name cannot include leading and trailing spaces')
                .required('Description is required'),
        })
    )
}

export const jobPostInitialValues = {
    tittle: '',
    minimumQualification: '',
    category: '',
    skills: '',
    salary: '',
    discription: ''
}