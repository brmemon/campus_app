import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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
                    <MenuItem value={'enter'}>Enter</MenuItem>
                    <MenuItem value={'graduation'}>Graduation</MenuItem>
                    <MenuItem value={'master'}>Master</MenuItem>

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
                    <MenuItem value={'0 Months To 6 Months'}>0 Months To 6 Months</MenuItem>
                    <MenuItem value={'7 Months To 1 Year'}>7 Months To 1 Year</MenuItem>
                    <MenuItem value={'1 Year To 2 Years'}>1 Year To 2 Years</MenuItem>
                    <MenuItem value={'2+ Years'}>2+ Years</MenuItem>

                </Select>
            </FormControl>
            {errors.experience && touched.experience && <div className="error">{errors.experience}</div>}
        </>
    );
};

export default Requirement;