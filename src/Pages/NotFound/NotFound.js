import React from 'react'
import './NotFound.css'
import logo from './a.png'
import { Link } from 'react-router-dom'
function NotFound() {
    return (
        <div className='main-not-found'>
            {/* <div className='icon-not-found'>
                <img src={logo}></img>
            </div>
            <div className='error-name'>404</div>
            <div className='error-title'>Page not found</div>
            <div className='group-btn'>
                <Link to='/' className='btn btn-dark btn-home'>Về lại trang chủ</Link>
            </div> */}
            <div className="error_container">
                <div className="error_block">
                    <h1>404</h1>
                    <h3>Không tìm thấy trang!</h3>
                    <p>Trang bạn đang tìm kiếm có thể đã bị xóa, chuyển đi, thay đổi link hoặc chưa bao giờ tồn tại.</p>
                    <div>

                    </div>
                    <Link to='/' className="error_btn">QUAY LẠI TRANG CHỦ</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFound