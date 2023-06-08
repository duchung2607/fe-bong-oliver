import React from 'react'
import './Shop.css'
import Navbar from '../../Components/Navbar/Navbar'

function Shop() {
    return (
        <div className='main-shop'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='banner'>
                    <img src='https://hairsalonchitam.vn/wp-content/uploads/2021/07/4809d54e795e8e00d74f2.jpg' className='img-banner'></img>
                </div>
                <div className='menu-category'>
                    <ul>
                        <li>TẠO KIỂU TÓC</li>
                        <li>CHĂM SÓC TÓC</li>
                        <li>CHỮA TRỊ DA ĐẦU</li>
                        <li>MÁY SẤY TÓC</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Shop