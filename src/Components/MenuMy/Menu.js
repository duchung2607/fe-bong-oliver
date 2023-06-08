import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Menu.css'
import { getMyProfile } from '../../Axios/handleAPI'

function Menu(props) {
    const [user, setUser] = useState()
    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        var res = await getMyProfile()
        setUser(res?.data?.data)
    }
    return (
        <div className='main-menu'>
            <ul>
                <Link to='/my'>
                    <li>
                        <img className='avatar-user' src={user?.avatar} />
                        {user?.name}
                    </li>
                </Link>
                <Link to='/my'>
                    <li>
                        <i className="fa fas-regular fa-user"></i>
                        Thông tin tài khoản
                    </li>
                </Link>
                <Link to='/my-walet'>
                    <li>
                        <i className="fa fa-wallet"></i>
                        Ví của tôi
                    </li>
                </Link>
                <Link to='/my-history'>
                    <li>
                        <i className="fas fa-regular fa-clock-rotate-left"></i>
                        Lịch sử đặt lịch
                    </li>
                </Link>
                {/* <li>
                    <i className="fa-solid fa-location-dot"></i>
                    Địa chỉ nhận hàng</li>
                <li>
                    <i className="fa-solid fa-cart-shopping"></i>
                    Đơn hàng
                </li> */}
                <Link to='/change-password'>
                    <li>
                        <i className="fa-solid fa-key"></i>
                        Đổi mật khẩu
                    </li>
                </Link>
            </ul>
        </div>
    )
}

export default Menu