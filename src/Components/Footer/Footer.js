import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='main-footer'>
      <div className='content-footer'>
        <div className='footer-col'>
          <span>SALON TÓC BỔNG OLIVER</span>
          <div style={{marginBottom:"10px"}}>139 Đ. Quang Trung, P. Kỳ Liên, TX. Kỳ Anh, Hà Tĩnh</div>
          <span>CHẤP NHẬN THANH TOÁN</span>
          <div>
            <img className='logo-vnpay' src='https://cdn.haitrieu.com/wp-content/uploads/2022/10/Icon-VNPAY-QR.png' />
          </div>
        </div>

        <div className='footer-col'>
          <span>LIÊN HỆ</span>
          <div style={{marginBottom:"10px"}}>
            <a href='https://www.facebook.com/profile.php?id=100083406303730' target='blank'>
              Fanpage : Bổng Oliver
            </a>
          </div>
          <span>GIỜ PHỤC VỤ</span>
          <div>
            8h00 - 21h00 : Tất cả các ngày trong tuần
          </div>
        </div>

        <div className='footer-col hotline'>
          <span>HOTLINE</span>
          <div>
            HOTLINE : 0977972653 (Miễn phí)
          </div>
        </div>
      </div>
      <div style={{width: "70%"}}>
        <div style={{paddingTop:"20px", color:"rgb(109,109,109)"}}>
          Copyright ©2023 Đức Hùng. All Right Reserved
        </div>
      </div>
    </div>
  )
}

export default Footer