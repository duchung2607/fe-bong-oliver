import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from './a.png'
import jwtDecode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SmallSlideBar from '../SmallSlideBar/SmallSlideBar'

function Navbar() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [isLogin, setIsLogin] = useState(true)
    const [showMenu, setShowMenu] = useState(false)
    useEffect(() => {
        if (sessionStorage.getItem("token") != null) {
            const user = jwtDecode(sessionStorage.getItem("token"))
            setUser(user)
        }
    }, [])
    const handleLogout = (e) => {
        e.preventDefault()
        sessionStorage.removeItem('token')
        window.location = "/"
    }
    return (
        <div className='main-navbar'>
            <div className='navbar-content'>
                <div className='navbar-logo'>
                    <Link to='/'>
                        {/* <img className='img-navbar-logo' src='https://30shine.com/static/media/log-30shine-white.9945e644.jpg'></img> */}
                        <img className='img-navbar-logo' src={logo}></img>
                    </Link>
                </div>
                <div className='navbar-menu'>
                    <ul className='menu'>
                        <Link to='/'>
                            <li className='menu-item'>
                                <div className='item-text'>TRANG CHỦ</div>
                            </li>
                        </Link>
                        <Link to='/service'>
                            <li className='menu-item'>
                                <div className='item-text'>TRẢI NGHIỆM DỊCH VỤ</div>
                            </li>
                        </Link>
                        <Link to='/hair-style'>
                            <li className='menu-item'>
                                <div className='item-text'>KHÁM PHÁ KIỂU TÓC</div>
                            </li>
                        </Link>
                        {/* <Link to='/'>
                            <li className='menu-item'>
                                <div className='item-text'>DỊCH VỤ</div>
                            </li>
                        </Link>
                        <Link to='/'>
                            <li className='menu-item'>
                                <div className='item-text'>DỊCH VỤ</div>
                            </li>
                        </Link> */}
                        {/* <li className='menu-item'>
                            <div className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"  style={{display: 'flex', alignItems:'center'}}>
                                <div className='item-text'>TRẢI NGHIỆM DỊCH VỤ</div>
                            </div>
                            <ul className="dropdown-menu">
                                <Link to='/my' className="dropdown-item"><li><i className="fa fas-regular fa-user"></i>Chỉnh sửa thông tin</li></Link>
                                <Link to='/my-wallet' className="dropdown-item"><li><i className="fa fa-wallet"></i>Số dư B-Coin</li></Link>
                                <Link to='/my-history' className="dropdown-item"><li><i className="fas fa-regular fa-clock-rotate-left"></i>Lịch sử</li></Link>
                                <Link className="dropdown-item"><li onClick={(e) => handleLogout(e)}><i className="fas fa-regular fa-right-from-bracket"></i>Đăng xuất</li></Link>
                            </ul>
                        </li> */}
                    </ul>
                </div>
                <div className='navbar-footer'>
                    <div className='group-button'>
                        {
                            !user?.name ?
                                <button className='btn-login' type='button' onClick={() => navigate('/login')}>
                                    <i className="fa-regular fa-user"></i>
                                    <span>ĐĂNG NHẬP</span>
                                </button>
                                :
                                <>
                                    <button type="button" className="dropdown-toggle btn-login" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i className="fa-solid fa-user"></i>
                                        <span>{user.fullname}</span>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <Link to='/my' className="dropdown-item"><li><i className="fa fas-regular fa-user"></i>Chỉnh sửa thông tin</li></Link>
                                        <Link to='/my-walet' className="dropdown-item">
                                            <li>
                                                <i className="fa fa-wallet"></i>
                                                Số dư<span style={{
                                                    color: "#fc3",
                                                    fontSize: "16px",
                                                    marginLeft: "5px"
                                                }}>
                                                    {user?.walet}
                                                    {/* {user?.walet.toLocaleString('vi-VN', {
                                                        minimumFractionDigits: 0,
                                                        maximumFractionDigits: 0,
                                                        style: 'decimal'
                                                    })} */}
                                                </span>B (1B = 1VND)
                                            </li>
                                        </Link>
                                        <Link to='/my-history' className="dropdown-item"><li><i className="fas fa-regular fa-clock-rotate-left"></i>Lịch sử</li></Link>
                                        <Link className="dropdown-item"><li onClick={(e) => handleLogout(e)}><i className="fas fa-regular fa-right-from-bracket"></i>Đăng xuất</li></Link>
                                    </ul>
                                </>
                        }
                        {/* <button className='btn-login' type='button' onClick={() => navigate('/login')}>
                            <i className="fa-regular fa-user"></i>
                            <span>ĐĂNG NHẬP</span>
                        </button>
                        <button type="button" className="btn dropdown-toggle btn-login" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-regular fa-user"></i>
                            <span>Đức Hùng</span>
                        </button>
                        <ul className="dropdown-menu">
                            <Link to='/my' className="dropdown-item"><li><i className="bi bi-person-fill" />User Profile</li></Link>
                            <li className="dropdown-item"><i className="bi bi-box-arrow-right" />Logout</li>
                        </ul> */}
                    </div>
                    <div className='navbar-menu-icon'>
                        <FontAwesomeIcon icon={faBars} onClick={()=>setShowMenu(!showMenu)}/>
                    </div>
                    {
                        showMenu&& <SmallSlideBar handleShowSlide = {setShowMenu} user = {user}/>
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar