import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SmallSlideBar.css';
import { Link } from 'react-router-dom';
import logo from './ab.png'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
function SmallSlideBar(props) {
    return (
        <div className="main-small-slide-bar">
            <div className="slide-container">
                <div className='header-menu'>
                    <Link to='/'>
                        {/* <img className='img-navbar-logo' src='https://30shine.com/static/media/log-30shine-white.9945e644.jpg'></img> */}
                        <img className='img-slide-logo' src={logo}></img>
                    </Link>
                    <FontAwesomeIcon icon={faXmark} style={{
                        height: "25px",
                        width: "25px",
                        padding: "5px",
                        cursor: "pointer"
                        // color : "rgba(0,0,0,0.5)"
                    }}
                        onClick={() => props.handleShowSlide(false)}
                    />
                </div>
                <ul className="menu-list">
                    <Link to='/'>
                        <li className='menu-link'>
                            Trang chủ
                        </li>
                    </Link>
                    <Link to='/service'>
                        <li className='menu-link'>
                            Trải nghiệm dịch vụ
                        </li>
                    </Link>
                    <Link to='/'>
                        <li className='menu-link'>
                            Khám phá kiểu tóc
                        </li>
                    </Link>
                    <Link to='/shop'>
                        <li className='menu-link'>
                            Bổng shop
                        </li>
                    </Link>
                    {/* {
                        !props.user &&
                        <>
                            <Link to='/login'>
                                <li className='menu-link'>
                                    Đăng nhập
                                </li>
                            </Link>
                            <Link to='/register'>
                                <li className='menu-link'>
                                    Đăng ký
                                </li>
                            </Link>
                        </>
                    } */}

                </ul>
            </div>
        </div>
    )
}

export default SmallSlideBar