import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faXmarkCircle as farFaBomb } from "@fortawesome/free-regular-svg-icons";

import './Verify.css';
import { Link, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../Axios/authAPI';
function Verify() {
    const [params, setParams] = useSearchParams()
    const [success, setSuccess] = useState()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var res = await verifyEmail(params.get("email"), params.get("token"))
        if (res?.code == 200) setSuccess(true)
        else setSuccess(false)
    }
    return (
        <div className="verify-overlay">
            {
                success == true ?
                    <>
                        <FontAwesomeIcon icon={faCircleCheck} className="verify-icon" />
                        <span className='verify-message'>Email của bạn đã được xác thực</span>
                        <Link to={'/login'} style={{color:"var(--green)"}}>Về trang đăng nhập</Link>
                    </>
                    :
                    <>
                        <FontAwesomeIcon icon={farFaBomb} className="verify-icon error" />
                        <span className='verify-message'>Email của bạn chưa được được xác thực</span>
                        <Link to={'/login'} style={{color:"var(--red)"}}>Về trang đăng nhập</Link>
                    </>

            }

        </div>
    )
}

export default Verify