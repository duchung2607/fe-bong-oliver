import React, { useState } from 'react'
import './FormBooking.css'
function FormBooking(props) {
  const [phone, setPhone] = useState(props.phone)
  const handleSubmit = () => {
    const phoneRegex = /^0\d{9}$/;

    if (phoneRegex.test(phone)) {
      props.handleBooking(phone)
    } else {
      alert('Vui lòng nhập đúng số điện thoại')
    }
  }
  return (
    <div className='main-form-booking'>
        <div className='title'>
            ĐẶT LỊCH LÀM TÓC CHỈ 1 PHÚT
        </div>
        <div className='note'>
            *Không mất phí!
        </div>
        <div className='main'>
            <input type='text' defaultValue={phone} maxLength={10} placeholder='Nhập số điện thoại để đặt lịch' onChange={(e)=>setPhone(e.target.value)}></input>
            {
              // errors.phone && <span></span>
            }
            <button onClick={handleSubmit}>ĐẶT LỊCH NGAY</button>
        </div>
    </div>
  )
}

export default FormBooking