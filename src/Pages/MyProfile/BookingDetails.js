import React, { useEffect, useState } from 'react'
import './BookingDetails.css'
import Menu from '../../Components/MenuMy/Menu'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getBookingByID, payMent } from '../../Axios/handleAPI'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { checkPass, paymentWithWalet } from '../../Axios/accountAPI'
import Loading from '../../Components/Loading/Loading'
import Success from '../../Components/Success/Success'
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function BookingDetails() {
    const params = useParams()
    const navigate = useNavigate()
    const [booking, setBooking] = useState()
    const [payMode, setPayMode] = useState(true)
    const [modelOpen, setModalOpen] = useState(false)
    const [wait, setWait] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState()
    const [pass, setPass] = useState('')
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var res = await getBookingByID(params.id)
        console.log(res?.data?.data)
        setBooking(res?.data?.data)
    }

    const handlePayment = async (bookingId, total) => {
        setWait(true)
        if (!payMode) {
            var res = await payMent(bookingId, total)
            if (res?.data?.code == 200) window.location = res?.data?.data
        } else setModalOpen(true)
        setWait(false)
    }

    const handleSubmitModal = async () => {
        if (pass == "") setError("Vui lòng nhập mật khẩu")
        else {
            setWait(true)
            var res = await checkPass(pass)
            if (res?.data?.code == 400) setError("Mật khẩu không chính xác")
            else
                if (res?.code == 200) {
                    setModalOpen(false)
                    try {
                        var res = await paymentWithWalet(booking?.id)
                        if (res?.code == 200) {
                            setSuccess(true)
                            setTimeout(() => {
                                window.location.reload()
                            }, 1500);
                        }
                        else alert("Số dư không đủ để thực hiện giao dịch")
                    } catch (e) {
                        console.log(e)
                    }
                }
            setWait(false)
        }
    }
    return (
        <div className='main-booking-details'>
            {
                wait && <Loading />
            }
            {
                success && <Success message={"Thanh toán thành công"} />
            }
            {
                modelOpen &&
                <>
                    <div className="modal fade show" id="exampleModal"
                        tabindex="1" aria-labelledby="exampleModalLabel"
                        style={{ display: "block" }}
                        role="dialog"
                        aria-model="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                    <div style={{ display: "flex" }}>
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Cảm ơn anh chị đã sử dụng dịch vụ tại  Bổng Oliver</h1>
                                        {/* <img src="https://30shine.com/static/media/icon-congratulation.f6a9c312.png" alt="" className="inline"
                                            style={{ height: "25px" }}
                                        ></img> */}
                                        <FontAwesomeIcon icon={faXmark} style={{
                                            height: "25px",
                                            width: "25px",
                                            padding: "5px",
                                            cursor: "pointer"
                                            // color : "rgba(0,0,0,0.5)"
                                        }}
                                            onClick={() => setModalOpen(false)}
                                        />
                                    </div>
                                    <span>Anh/chị vui lòng nhập mật khẩu để xác nhận thanh toán</span>
                                </div>
                                <div className="modal-body">
                                    <input className='input-phone' type='password'
                                        onChange={(e) => { setPass(e.target.value) }}
                                    ></input>
                                    {
                                        error && <span style={{
                                            color: "red"
                                        }}>{error}</span>
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button-submit" onClick={() => handleSubmitModal()}>Xác nhận</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
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
                                    <span>Mã : #{booking?.id}</span>
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
                                                booking?.status == "done" ? "Hoàn tất" : "Đã Hủy"
                                        }
                                    </span>
                                </div>
                                <div className='status'>
                                    <span style={{
                                        color: "var(--red)"
                                    }}>Thời gian : {booking?.time?.slice(11, 16) + ' Ngày ' + booking?.time?.slice(5, 10)}</span>
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
                                                <span className='be des'>
                                                    <div dangerouslySetInnerHTML={{ __html: service?.description }} />
                                                    {/* {service?.description} */}
                                                </span>
                                            </div>
                                            <div className='price'>
                                                {
                                                    booking?.status == "done" &&
                                                    <Link to={`/rate?serviceId=${service?.id}`} className='link-rate'>
                                                        Đánh giá
                                                        <i className="fa fa-duotone fa-arrow-right" style={{ marginLeft: "7px" }} />
                                                    </Link>
                                                }
                                                {/* <Link to={`/rate?serviceId=${service?.id}`} className='link-rate'>
                                                    Đánh giá
                                                    <i className="fa fa-duotone fa-arrow-right" style={{ marginLeft: "7px" }} />
                                                </Link> */}
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
                                    <input type='radio' checked={payMode == true} onChange={() => setPayMode(true)} className='form-radio' />
                                    <span style={{ marginLeft: "10px" }}>Thanh toán qua ví</span>
                                </div>
                                <div>
                                    <input type='radio' checked={payMode == false} onChange={() => setPayMode(false)} />
                                    <span style={{ marginLeft: "10px" }}>Thanh toán qua ví VNpay</span>
                                </div>
                                {/* <div>
                                    <input type="radio" name="myRadio" id="radioButton" style="appearance: none; -webkit-appearance: none; -moz-appearance:none; width: 20px; height: 20px; border: 2px solid black; border-radius: 50%; outline: none; cursor: pointer; background-color: black; box-shadow: 0 0 2px 1px black;"/>
                                </div> */}
                            </div>
                        }
                        <div className='group-button'>
                            {
                                booking?.status == "wait" && <button className='button button-fc3' onClick={() => handlePayment(booking?.id, booking?.price)}>Thanh toán ngay</button>
                                //:
                                //booking?.status == "done" && <Link to={`/rate?bookingId=${booking?.id}`} className='button button-fc3'>Đánh giá ngay</Link>
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