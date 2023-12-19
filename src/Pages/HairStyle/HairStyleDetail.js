import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './HairStyleDetail.css'
import Footer from '../../Components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { getRateByService } from '../../Axios/rateAPI'
import { Swiper, SwiperSlide } from 'swiper/react';
import Item from '../../Components/Item/Item'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { getHairStylesById } from '../../Axios/hairStyleAPI'
function HairStyleDetail() {
    const [user, setUser] = useState(sessionStorage.getItem("token") && jwtDecode(sessionStorage.getItem("token")))
    const params = useParams()
    const navigate = useNavigate()
    const [hair, setHair] = useState()
    const [rates, setRates] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            var res = await getHairStylesById(params.id)
            setHair(res?.data)

            var res = await getRateByService(params.id)
            if (res?.code == 200) setRates(res?.data)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='main-hair-details'>
            {
                !hair ?
                    <div style={{
                        height: "60vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <span style={{
                            fontFamily: "Oswald",
                            fontSize: "xxx-large",
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "40px"
                        }}>
                            <i className="fa-solid fa-xmark" style={{
                                color: "var(--red)",
                                marginRight: "20px",
                                fontSize: "xxx-large"
                            }}></i>
                            Kiểu tóc không tồn tại
                        </span>
                        <Link to="/" className='button' >Về trang chủ</Link>
                    </div>
                    :
                    <div className='main'>
                        <div className='container'>
                            <div className='banner'>
                                <img className='img-banner' src={hair?.image} />
                            </div>
                            <div className='name'>
                                {
                                    hair?.name
                                }
                            </div>
                            <div className='info'>
                                <div className='des'>
                                    <div dangerouslySetInnerHTML={{ __html: hair?.description }} />
                                </div>
                            </div>

                            <div className='group-button'>
                                <button className='button left' onClick={() => navigate("/hair-style")}>Khám phá thêm kiểu tóc</button>
                                {/* <button className='button right' onClick={() => user ? navigate("/booking?phone=" + user.phone + "&step=0") : navigate("/booking?phone=&step=0")}>Đặt lịch ngay</button> */}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default HairStyleDetail