import React, { useEffect, useState } from 'react'
import './MyWalet.css'
import '../../Public.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import jwtDecode from 'jwt-decode'
import { getMyProfile, payIn, updateProfile, verifyEmail } from '../../Axios/handleAPI'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Menu from '../../Components/MenuMy/Menu'

function MyWalet() {
    const navigate = useNavigate()
    const params = useParams()
    const [user, setUser] = useState()
    const [data, setData] = useState()
    const [money, setMoney] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        var res = await getMyProfile()
        setUser(res?.data?.data)
    }

    const handleSubmit = async () => {
        if (validate()) {
            var res = await payIn(money)
            if (res?.data?.code == 200) window.location = res?.data?.data
        }

    }

    const validate = () => {
        const error = {}
        if (money < 10000) error.money = "Số tiền nạp phải lớn hơn 9999"
        if (!money) error.money = "Vui lòng nhập số tiền cần nạp"

        setError(error)
        return Object.keys(error).length === 0;
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
        <div className='main-my-walet'>
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
                                    <label className='col-3'>Số dư:</label>
                                    <input className='col-9' type='text' value={user?.walet?.money} disabled />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'>Nạp tiền:</label>
                                    <div className='col-9' style={{display:"flex", flexDirection:"column"}}>
                                        <input type='number' placeholder='Nhập số tiền nạp' onChange={(e) => setMoney(e.target.value)} />
                                        {
                                            error?.money &&
                                            <span className='error'>{error.money}</span>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col'>
                                    <label className='col-3'></label>
                                    <button className='submit' type='button' onClick={handleSubmit}>Nạp tiền</button>
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

export default MyWalet