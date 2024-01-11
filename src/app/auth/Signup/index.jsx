import Input from '@/app/Components/Input';
import React, { useState } from 'react'

const Requirement = ({ userType }) => {

    // const [education, setEducation] = useState('');
    // const [experience, setExperience] = useState('');

    const handleEducationChange = (event) => {
        setEducation(event.target.value);
    };

    const handleExperienceChange = (event) => {
        setExperience(event.target.value);
    };

    return (
        <>
            <Input
                className={"input"}
                label="Education"
                // value={education}
                // onChange={handleEducationChange}
                // value={values.userType}

            />
            <Input
                className={"input"}
                label="Experience"
                // value={values.userType}
                // onChange={handleExperienceChange}
            />
        </>

    );
}

export default Requirement
