import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { StudentEducation, StudentExperience } from '@/app/Helper/constant';

const Requirement = ({ formik }) => {
    const { values, errors, touched, handleChange } = formik;
    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Education</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-education"
                    label="Education"
                    value={values.education}
                    onChange={handleChange}
                    error={touched.education && Boolean(errors.education)}
                    className={'select'}
                    name="education"
                >
                    {StudentEducation.map((item, index) =>
                        <MenuItem
                            key={index}
                            value={item?.value}>
                            {item?.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            {errors.education && touched.education && <div className="error">{errors.education}</div>}

            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Experience</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select-experience"
                    label="Experience"
                    name="experience"
                    value={values.experience}
                    onChange={handleChange}
                    error={touched.experience && Boolean(errors.experience)}
                    className={'select'}
                >
                    {StudentExperience.map((item, index) =>
                        <MenuItem
                            key={index}
                            value={item?.value}>
                            {item?.name}
                        </MenuItem>
                    )}
                </Select>
            </FormControl>
            {errors.experience && touched.experience && <div className="error">{errors.experience}</div>}
        </>
    );
};

export default Requirement;