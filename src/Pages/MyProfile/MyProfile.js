import React, { useEffect, useState } from 'react'
import './MyProfile.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import jwtDecode from 'jwt-decode'
import { getMyProfile, updateProfile, verifyEmail } from '../../Axios/handleAPI'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Menu from '../../Components/MenuMy/Menu'

function MyProfile() {
    const params = useParams()
    const [user, setUser] = useState()
    const [data, setData] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {

        console.log(params)

        var res = await getMyProfile()
        setUser(res?.data?.data)
        setData({
            name: res?.data?.data.name,
            email: res?.data?.data.email,
            phone: res?.data?.data.phone,
            avatar: res?.data?.data.avatar,
            gender: res?.data?.data.gender
        })
    }

    const handleSubmit = async () => {
        console.log(data)
        var res = await updateProfile(data)
        if (res?.data?.code == 200) window.location.reload()
    }

    const handleChange = (e) => {
        // setUser({...user})
        if (e.target.name == "gender")
            setData({ ...data, [e.target.name]: e.target.value == 'true' ? true : false });
        else
            setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleVerify = async () => {
        var res = await verifyEmail()
        console.log(res?.data)
        if (res?.data?.code == 200) alert("Vui lòng kiểm tra email để xác thực tài khoản!")
    }

    return (
        <div className='main-my-profile'>
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
                    <Menu/>
                    <div className='form-info'>
                        <div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Username:</label>
                                    <input className='col-9' type='text' value={user?.username} disabled />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Họ và tên:</label>
                                    <input className='col-9' type='text' defaultValue={user?.name} name='name' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Số điện thoại:</label>
                                    <input className='col-9' type='text' maxLength={10} defaultValue={user?.phone} name='phone' onChange={handleChange} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Email:</label>
                                    <input className='col-9' type='email' defaultValue={user?.email} name='email' disabled={user?.isVerify} onChange={handleChange} />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Giới tính:</label>
                                    <select className='col-9' value={data?.gender} name='gender' onChange={handleChange}>
                                        <option value={true}>Nam</option>
                                        <option value={false}>Nữ</option>
                                    </select>
                                    {/* <input className='col-9' type='text' defaultValue={user?.gender? "Nam" : "Nữ"} /> */}
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'></label>
                                    <button className='submit' type='button' onClick={handleSubmit}>Lưu</button>
                                    {
                                        !user?.isVerify && <button className='verify' type='button' onClick={handleVerify}>Xác thực tài khoản</button>
                                    }
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

export default MyProfile