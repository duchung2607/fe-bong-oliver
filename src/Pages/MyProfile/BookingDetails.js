import React, { useEffect, useState } from 'react'
import './BookingDetails.css'
import Menu from '../../Components/MenuMy/Menu'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBookingByID, payMent } from '../../Axios/handleAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function BookingDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [booking, setBooking] = useState()
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var res = await getBookingByID(params.id)
        console.log(res?.data?.data)
        setBooking(res?.data?.data)
    }

    const handlePayment = async (bookingId, total) => {
        var res = await payMent(bookingId, total)
        if (res?.data?.code == 200) window.location = res?.data?.data
    }
    return (
        <div className='main-booking-details'>
            <div className='main'>
                <div className='content'>
                    <Menu />
                    <div className='booking-info'>
                        <div className='grid grid-cols-12' style={{
                            borderBottom: "1px solid",
                            paddingBottom: "20px"
                        }}>
                            <div className='col-span-6'>
                                <div className='header-information'>
                                    <span>Mã booking : #{booking?.id}</span>
                                </div>
                                <div className='information'>
                                    <span className='be'>Người dùng : {booking?.usernameUser}</span>
                                    <span className='be'>Stylist : {booking?.usernameStylist}</span>
                                </div>
                            </div>
                            <div className='col-span-6'>
                                <div className='header-status flex-end'>
                                    <span className={booking?.status}>
                                        {
                                            booking?.status == "wait" ? "Mới" :
                                                booking?.status == "done" && "Hoàn tất"
                                        }
                                    </span>
                                </div>
                                <div className='status'>
                                    <span style={{
                                        color: "var(--red)"
                                    }}>Thời gian đặt lịch : {booking?.time?.slice(11, 16) + ' Ngày ' + booking?.time?.slice(5, 10)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='list-service'>
                            {
                                booking?.serviceBookingDTOs?.map((service, index) => (
                                    <div className='service-item'>
                                        {/* <span>{service?.id}</span> */}
                                        <img className='image-service' src={service?.image} onClick={() => navigate(`/service/${service.id}`)}
                                            style={{
                                                cursor: "pointer"
                                            }} />
                                        <div className='service-info'>
                                            <div className='infor'>
                                                <span>{service?.name}</span>
                                                <span className='be des'>{service?.description}</span>
                                            </div>
                                            <div className='price'>
                                                <Link to={`/rate?serviceId=${service?.id}`} className='link-rate'>
                                                    Đánh giá
                                                    <i className="fa fa-duotone fa-arrow-right" style={{marginLeft:"7px"}}/>
                                                </Link>
                                                <span>{service?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='total grid grid-cols-12'>
                            <div className='col-span-8 flex-end'>
                                <span className='label-total'>Tồng tiền phí dịch vụ :</span>
                            </div>
                            <div className='col-span-4 flex-end'>
                                <span className='count-total'>{booking?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</span>
                            </div>
                        </div>
                        {
                            booking?.status != "done" &&
                            <div className='pay-mode'>
                                <div>
                                    <input type='radio' />
                                    <span>Thanh toán qua ví</span>
                                </div>
                                <div>
                                    <input type='radio' />
                                    <span>Thanh toán qua ví VNpay</span>
                                </div>
                            </div>
                        }
                        <div className='group-button'>
                            {
                                booking?.status != "done" ? <button className='button button-fc3' onClick={() => handlePayment(booking?.id, booking?.price)}>Thanh toán ngay</button>
                                    :
                                    <Link to={`/rate?bookingId=${booking?.id}`} className='button button-fc3'>Đánh giá ngay</Link>
                            }
                            <button className='button' onClick={() => navigate(-1)}>Quay lại</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookingDetails