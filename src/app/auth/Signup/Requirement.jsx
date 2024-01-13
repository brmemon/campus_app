import Input from '@/app/Components/Input';
import React, { useState } from 'react'

const Requirement = ({ formik }) => {

    // const [education, setEducation] = useState('');
    // const [experience, setExperience] = useState('');

    // const handleEducationChange = (event) => {
    //     setEducation(event.target.value);
    // };

    // const handleExperienceChange = (event) => {
    //     setExperience(event.target.value);
    // };

    return (
        <>
            <Input
                className={'input'}
                label="Education"
                value={formik.values.education}
                onChange={formik.handleChange}
                error={formik.touched.education && Boolean(formik.errors.education)}
                name="education"
                id="education"

            />
            <Input
                className={'input'}
                label="Experience"
                value={formik.values.experience}
                onChange={formik.handleChange}
                error={formik.touched.experience && Boolean(formik.errors.experience)}
                name="experience"
                id="experience"
            />
        </>

    );
}

export default Requirement
























// import React from 'react';
// import Input from '@/app/Components/Input';

// const Requirement = ({ formik }) => {
//     console.log(formik.values);

//     if (formik.values.userType === 'student') {
//         return (
//             <>
//                 <Input
//                     className={'input'}
//                     label="Education"
//                     value={formik.values.education}
//                     onChange={formik.handleChange}
//                     error={formik.touched.education && Boolean(formik.errors.education)}
//                     name="education"
//                     id="education"
//                 />
//                 <Input
//                     className={'input'}
//                     label="Experience"
//                     value={formik.values.experience}
//                     onChange={formik.handleChange}
//                     error={formik.touched.experience && Boolean(formik.errors.experience)}
//                     name="experience"
//                     id="experience"
//                 />
//             </>
//         );
//     }

//     return null;
// };

// export default Requirement;
