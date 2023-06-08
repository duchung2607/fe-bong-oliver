import React, { useEffect, useState } from 'react'
import './ChangPass.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import jwtDecode from 'jwt-decode'
import { changePassword, getMyProfile, updateProfile, verifyEmail } from '../../Axios/handleAPI'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Menu from '../../Components/MenuMy/Menu'

function ChangPass() {
    const params = useParams()
    const [user, setUser] = useState()
    const [data, setData] = useState({
        currentPass: "",
        newPass: "",
        reNewPass: ""
    })
    const [error, setError] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    const validate = () => {
        const error = {}
        if (data.currentPass == "") error.currentPass = "Vui lòng nhập mật khẩu hiện tại"
        if (/\s/.test(data?.currentPass)) error.currentPass = "Mật khẩu không chứa khoảng trắng"

        if (data.newPass == "" || data.reNewPass == "") error.pass = "Vui lòng nhập mật khẩu mới"
        if (data.newPass != data.reNewPass) error.pass = "Mật khẩu phải giống nhau"

        setError(error)
        return Object.keys(error).length === 0;
    }

    const fetchData = async () => {
    }

    const handleSubmit = async () => {
        const error = {}
        if (validate()) {
            try {

                var res = await changePassword(data)
                if (res?.data?.code == 200) window.location.reload()
            }catch(e){
                // console.log(e)
                    error.currentPass = "Mật khẩu hiện tại không đúng"
                    setError(error)
            }
            // if (res?.response?.data?.message == "Password is invalid!") {
    }
}

const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}

return (
    <div className='main-change-pass'>
        {/* <div className='navbar'>
            <Navbar />
        </div> */}
        <div className='main'>
            <div className='content'>
                {/* <div className='menu'>
                        <ul>
                            <li>
                                <Link to='/my'>
                                    <img className='avatar-user' src={user?.avatar} />
                                    {user?.name}
                                </Link>
                            </li>
                            <li>
                                <Link to='/my'>
                                    <i className="fa fas-regular fa-user"></i>
                                    Thông tin tài khoản
                                </Link>
                            </li>
                            <li>
                                <Link to='/my-walet'>
                                    <i className="fa fa-wallet"></i>
                                    Ví của tôi
                                </Link>
                            </li>
                            <li>
                                <i className="fa-solid fa-location-dot"></i>
                                Địa chỉ nhận hàng</li>
                            <li>
                                <i className="fa-solid fa-cart-shopping"></i>
                                Đơn hàng
                            </li>
                            <li>
                                <Link to='/change-password'>
                                    <i className="fa-solid fa-key"></i>
                                    Đổi mật khẩu
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                <Menu />
                <div className='form-info'>
                    <div>
                        <div className='row'>
                            <div className='col'>
                                <label className='col-3'>Mật khẩu hiện tại:</label>
                                <div className='col-9' style={{ display: "flex", flexDirection: "column" }}>
                                    <input type='password' name='currentPass' onChange={handleChange} />
                                    {
                                        error?.currentPass &&
                                        <span className='error'>{error.currentPass}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label className='col-3'>Mật khẩu mới:</label>
                                <div className='col-9' style={{ display: "flex", flexDirection: "column" }}>
                                    <input type='text' name='newPass' onChange={handleChange} />
                                    {
                                        error?.pass &&
                                        <span className='error'>{error.pass}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <label className='col-3'>Xác nhận mật khẩu:</label>
                                <div className='col-9' style={{ display: "flex", flexDirection: "column" }}>
                                    <input type='text' name='reNewPass' onChange={handleChange} />
                                    {
                                        error?.pass &&
                                        <span className='error'>{error.pass}</span>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <div className='row'>
                                <label className='col-3'>Hiển thị mật khẩu</label>
                                <input className='col-1' type='checkbox'
                                style={{
                                    height:"15px"
                                }}/>
                            </div> */}
                        <div className='row'>
                            <div className='col'>
                                <label className='col-3'></label>
                                <button className='submit' type='button' onClick={handleSubmit}>Lưu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* <div className='footer'>
            <Footer />
        </div> */}

    </div>
)
}

export default ChangPass