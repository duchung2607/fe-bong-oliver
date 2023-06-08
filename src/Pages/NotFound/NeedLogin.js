import React from 'react'
import './NeedLogin.css'
import { Link } from 'react-router-dom'

function NeedLogin() {
  return (
    <div className='main-need-login'>
        <div className='title'>
            Đây là trang web dành cho Admin Bổng Oliver!
        </div>
        <div className=''>
            Nếu bạn là Admin của Bổng Oliver,
            <Link to='/login'>Đăng nhập</Link>
        </div>
        <div className=''>
            Nếu bạn không phải là Admin của Bổng Oliver,
            <Link to='/login'>Ghé thăm website dành cho người dùng</Link>
        </div>
    </div>
  )
}

export default NeedLogin