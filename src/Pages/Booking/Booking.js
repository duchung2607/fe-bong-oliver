import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './Booking.css'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import ChooseService from '../../Components/Choose/ChooseService'
import Service from '../Service/Service'
import ChooseStylist from '../../Components/Choose/ChooseStylist'
import ChooseTime from '../../Components/Choose/ChooseTime'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import Loading from '../../Components/Loading/Loading'
// import PopUpPhone from '../../Components/PopupPhone/PopUpPhone'
function Booking() {
    // const params = useParams()
    const [user, setUser] = useState(sessionStorage.getItem("token") && jwtDecode(sessionStorage.getItem("token")))
    const navigate = useNavigate()
    const [params, setParams] = useSearchParams()
    const [phone, setPhone] = useState(params.get('phone'))
    const [step, setStep] = useState(params.get("step"))

    const [modelOpen, setModalOpen] = useState(params.get('phone') ? false : true)

    const [errors, setError] = useState({})

    const [services, setService] = useState([])
    const [stylist, setStylist] = useState()
    const [time, setTime] = useState()
    const [wait, setWait] = useState(false)
    // const [date, setDate] = useState()

    useEffect(() => {
        setStep(params.get("step"))
    }, [params, services, stylist, time])

    const handleSubmit = async () => {
        if (Validate()) {
            setWait(true)
            try {
                var booking = {
                    time: time,
                    description: user ? user.fullname : "Guest " + phone,
                    status: "wait",
                    userId: user ? user.id : 11,
                    stylistId: stylist,
                    serviceIds: services
                }

                console.log(booking)
                var res = await axios.post("https://localhost:7125/api/booking/create", booking)
                if (res?.data?.code == 200)
                    navigate("/")
            } catch (e) {

            }
            setWait(false)
        }
    }

    const Validate = () => {
        var error = {}
        if (services.length == 0) error.services = "Vui lòng chọn ít nhất một dịch vụ"
        else delete error.services

        if (!stylist) error.stylist = "Vui lòng chọn stylist"
        else delete error.stylist

        if (!time) error.time = "Vui lòng chọn thời gian làm tóc"
        else delete error.time

        setError(error);
        return Object.keys(errors).length === 0;
    }

    const chooseService = (id) => {
        if (services.filter(s => s == id).length > 0) setService([...services].filter(s => s != id))
        else {
            const tmp = services
            tmp.push(id)
            setService([...tmp])
        }
    }

    const chooseStylist = (id) => {
        setStylist(id)
    }

    const chooseTime = (time) => {
        setTime(time)
        setParams({
            "phone": phone,
            "step": 0
        })
    }

    const handleSubmitModal = () => {
        let phoneRegex = /(0\d{9})/;
        if (phoneRegex.test(phone)) {
            setModalOpen(!modelOpen)
            setParams({
                "phone": phone,
                "step": 0
            })
        }
    }

    return (
        <div className={modelOpen ? 'main-booking modal-open' : "main-booking"} style={{ overflow: "hidden", paddingRight: "0px", }}>
            {
                wait&& <Loading />
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
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Chào mừng anh/chị đến với Bổng Oliver</h1>
                                        <img src="https://30shine.com/static/media/icon-congratulation.f6a9c312.png" alt="" className="inline"
                                            style={{ height: "25px" }}
                                        ></img>
                                    </div>
                                    <span>Anh/chị vui lòng nhập số điện thoại để tiến hành đặt lịch</span>
                                </div>
                                <div className="modal-body">
                                    <input className='input-phone' placeholder='VD : 0123456789'
                                        maxLength={10}
                                        onChange={(e) => { setPhone(e.target.value) }}
                                    ></input>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="button-submit" onClick={() => handleSubmitModal()}>Đặt lịch</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='body-booking'>
                    <div className='top'>
                        <span className="text-center">Đặt lịch giữ chỗ</span>
                    </div>
                    <div className='booking-center'>
                        <div className='service'>
                            <div className='lable'>1. Chọn dịch vụ</div>
                            <div className={!errors.services ? 'flex' : 'flex booking-error'} onClick={() => setParams(
                                params.get("step") != 1 ?
                                    {
                                        "phone": phone,
                                        "step": 1
                                    } :
                                    {
                                        "phone": phone,
                                        "step": 0
                                    }
                            )
                            }
                            >
                                <div>
                                    <img src='https://30shine.com/static/media/service.3a62b101.svg' />
                                </div>
                                <div className='text' style={{ width: "100%" }}>
                                    Đã chọn {services.length} dịch vụ
                                </div>
                                <div>
                                    <img src='https://30shine.com/static/media/caretRight.b0d191b3.svg' />
                                </div>
                            </div>
                            {/* {
                                step == "1" && <div>huuh</div>
                            } */}
                            {
                                errors.services && <div className='error'>
                                    {errors.services}
                                </div>
                            }
                            {
                                step == "1" && <ChooseService clickItem={chooseService} moveStep={() => setParams({
                                    "phone": phone,
                                    "step": 0
                                })}
                                    choose={services} />
                            }

                        </div>
                        <div className='stylist'>
                            <div className='lable'>2. Chọn stylist</div>
                            <div className={!errors.stylist ? 'flex' : 'flex booking-error'} onClick={() => setParams(
                                params.get("step") != 2 ?
                                    {
                                        "phone": phone,
                                        "step": 2
                                    } :
                                    {
                                        "phone": phone,
                                        "step": 0
                                    }
                            )
                            }
                            >
                                <div>
                                    <img src='https://30shine.com/static/media/user-large.69c611a8.svg' />
                                </div>
                                <div className='text' style={{ width: "100%" }}>
                                    {
                                        !stylist ? "Mời bạn chọn stylist" : "Đã chọn stylist"
                                    }
                                </div>
                                <div>
                                    <img src='https://30shine.com/static/media/caretRight.b0d191b3.svg' />
                                </div>
                            </div>
                            {
                                errors.stylist && <div className='error'>
                                    {errors.stylist}
                                </div>
                            }
                            {
                                step == "2" && <ChooseStylist moveStep={() => setParams({
                                    "phone": phone,
                                    "step": 0
                                })}
                                    choose={stylist}
                                    handleChooseStylist={chooseStylist}
                                />
                            }

                        </div>
                        <div className='time'>
                            <div className='lable'>3. Chọn ngày & giờ</div>
                            <div className={!errors.time ? 'flex' : 'flex booking-error'} onClick={() => stylist && setParams(
                                params.get("step") != 3 ?
                                    {
                                        "phone": phone,
                                        "step": 3
                                    } :
                                    {
                                        "phone": phone,
                                        "step": 0
                                    }
                            )
                            }>
                                <div>
                                    <img src='https://30shine.com/static/media/calendar-2.3c77d299.svg' />
                                </div>
                                <div className='text' style={{ width: "100%" }}>
                                    {!time ? "Chọn lịch làm tóc" : "Time: " + (time.replace("T", " "))}
                                </div>
                                <div>
                                    <img src='https://30shine.com/static/media/caretRight.b0d191b3.svg' />
                                </div>
                            </div>
                            {
                                errors.time && <div className='error'>
                                    {errors.time}
                                </div>
                            }
                            {
                                step == "3" && <ChooseTime moveStep={() => setParams({
                                    "phone": phone,
                                    "step": 0
                                })}
                                    stylistId={stylist}
                                    // choose={date}
                                    handleChooseTime={chooseTime}
                                />
                            }

                        </div>
                    </div>
                    <div className='bottom'>
                        <div className='main-bottom'>
                            <div className={services && stylist && time ? 'finish done' : "finish"} onClick={handleSubmit}>
                                <span>Hoàn tất</span>
                            </div>
                            <span>Cắt xong trả tiền, hủy lịch không sao</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='footer'>
                <Footer />
            </div> */}
        </div>
    )
}

export default Booking