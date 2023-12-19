import React, { useState } from 'react'
import './ForgotPassword.css'
import { login } from '../../Axios/handleAPI'
import { Link, useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { forgotPassword } from '../../Axios/accountAPI'
import Loading from '../../Components/Loading/Loading'

function ForgotPassword() {
    const navigate = useNavigate()
    const [errors, setErrors] = useState()
    const [show, setShow] = useState(false)
    const [wait, setWait] = useState(false)

    const [email, setEmail] = useState('')
    const validate = () => {
        const error = {}
        if (email == '') error.email = 'Email không được để trống!'

        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const regex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!regex.test(email)) error.email = "Email không đúng địng dạng"

        setErrors(error)
        return Object.keys(error).length === 0;
    }

    const handleForgotPassword = async () => {
        const error = {}
        try {
            if (validate()) {
                setWait(true)
                var res = await forgotPassword(email.replace("@", "%40"))
                console.log(res)
                if (res?.code == 200) {
                    navigate("/login")
                } else {
                    error.email = res?.data?.message
                    setErrors(error)
                }
            }
        } catch (e) {
            console.log(e)
            error.email = "Email không tồn tại"
            setErrors(error)
        }
        setWait(false)
    }
    return (
        <div className='main-forgot-password'>
            {
                wait&& <Loading />
            }
            <div className='forgot-password-header'>QUÊN MẬT KHẨU</div>
            <div className='forgot-password-main'>
                <div className='input-form'>
                    <input type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                    {
                        errors?.email ? <span className='error-validate'>{errors.email}</span>
                            : <span className='error-validate'></span>
                    }
                </div>
            </div>
            <div className='forgot-password-footer'>
                <div className='forgot-password'>
                    <button className='btn-forgot-password' onClick={handleForgotPassword}>Xác nhận</button>
                </div>
                <div className='register'>
                    <button className='btn-register' onClick={() => navigate('/login')}>Quay lại đăng nhập</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword