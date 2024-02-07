import React from 'react'
import { useSelector } from 'react-redux';
import "../../../../styles/scss/MapData.scss"

const MapData = () => {
    const selectorJobData = useSelector((state) => state.campus.jobData);
    const dataJobs = Object.values(selectorJobData);
    return (
        <div className='job_post_first'>
            {dataJobs.map((item, index) =>
                <div
                    key={index}
                    className='job_post_second'
                >
                    <div className='job_post_third'>
                        <div className='job_post_ite'>
                            <p className='tittle'>{item?.title}</p>
                        </div>
                        <div className='job_post_item'> <p className='job_post_para'>Qualification:</p> <p className='tittle'>{item?.minimumQualification}</p></div>
                        <div className='job_post_item'> <p className='job_post_para'>Category:     </p> <p className='tittle'>{item?.category}</p></div>
                        <div className='job_post_item'> <p className='job_post_para'>Skills:       </p> <p className='tittle'>{item?.skills}</p></div>
                        <div className='job_post_item'> <p className='job_post_para'>Salary:       </p> <p className='tittle'>{item?.salary}</p></div>
                        <div className='job_post_item'> <p className='job_post_para'>Discription:  </p> <p className='tittle'>{item?.description}</p></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MapData