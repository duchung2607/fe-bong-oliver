import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './ServiceDetails.css'
import Footer from '../../Components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { getRateByService } from '../../Axios/rateAPI'
import { Swiper, SwiperSlide } from 'swiper/react';
import Item from '../../Components/Item/Item'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'

function ServiceDetails() {
    const [user, setUser] = useState(sessionStorage.getItem("token") && jwtDecode(sessionStorage.getItem("token")))
    const params = useParams()
    const navigate = useNavigate()
    const [service, setService] = useState()
    const [services, setServices] = useState()
    const [serviceIds, setServiceIds] = useState()
    const [rates, setRates] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        getServices()
    }, [serviceIds])

    const fetchData = async () => {
        try {
            var res = await axios.get("https://localhost:7125/api/service/" + params.id)
            setService(res?.data?.data)
            var res = await getRateByService(params.id)
            if (res?.code == 200) setRates(res?.data)
        } catch (e) {
            console.log(e)
        }

        if (sessionStorage.getItem("token") != null) {
            const user = jwtDecode(sessionStorage.getItem("token"))
            try {
                var res = await axios.get(`http://127.0.0.1:5000/recommend?id=${user?.id}`)
                setServiceIds(res?.data?.data)
            } catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                var res = await axios.get(`http://127.0.0.1:5000/recommend?id=${2}`)
                setServiceIds(res?.data?.data)

            } catch (e) {
                console.log(e)
            }
        }
    }

    const getServices = async () => {
        if (serviceIds)
            try {
                var res = await axios({
                    method: "post",
                    url: `https://localhost:7125/api/service/ids`,
                    data: serviceIds,
                    headers: {
                        "Content-Type": "application/json, text/plain, */*"
                    },
                });
                setServices(res?.data?.data)
                console.log(res?.data?.data);
            } catch (e) {
                console.log(e)
            }
    }

    const clickItem = (id) => {
        window.location = `/service/${id}`
    }

    return (
        <div className='main-service-details'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            {
                !service ?
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
                            Dịch vụ không tồn tại
                        </span>
                        <Link to="/" className='button' >Về trang chủ</Link>
                    </div>
                    :
                    <div className='main'>
                        <div className='container'>
                            <div className='banner'>
                                <img className='img-banner' src={service?.image} />
                                <div className='group-star'>
                                    {
                                        service?.rate > 0 &&
                                        [1, 2, 3, 4, 5].map((value) => (
                                            <span
                                                className='star'
                                                key={value}
                                                style={{
                                                    color: service?.rate >= value ? "orange" : "grey",
                                                    cursor: "pointer",
                                                    margin: "0px 10px"
                                                }}
                                            >
                                                <i className="bi bi-star-fill"></i>
                                            </span>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className='name'>
                                {
                                    service?.name
                                }
                            </div>
                            <div className='price'>
                                <div>
                                    Giá chỉ: <strong style={{ paddingLeft: "10px", paddingRight: "10px", color: "red" }}> {service?.price}</strong>VNĐ
                                </div>
                            </div>
                            <div className='info'>
                                <div className='des'>
                                    <div dangerouslySetInnerHTML={{ __html: service?.description }} />
                                </div>
                            </div>

                            <div className='group-button'>
                                <button className='button left' onClick={() => navigate("/service")}>Khám phá thêm dịch vụ</button>
                                <button className='button right' onClick={() => user ? navigate("/booking?phone=" + user.phone + "&step=0") : navigate("/booking?phone=&step=0")}>Đặt lịch ngay</button>
                            </div>
                            <div className='rating'>
                                <div className='lable-rate'>Đánh giá</div>
                                <div className='rate'>
                                    {
                                        rates ? rates?.map((rate, index) => (
                                            <div className='rate-item' key={index}>
                                                <div className='user'>
                                                    <span style={{
                                                        fontWeight: "500"
                                                    }}>{rate?.user?.name}</span>
                                                    <span style={{
                                                        fontSize: "x-small",
                                                        color: "rgb(117 117 117)",
                                                        marginLeft: "10px"
                                                    }}>{rate?.create?.slice(0, 10)}</span>
                                                </div>
                                                <div className='rate-value'>
                                                    {[1, 2, 3, 4, 5].map((value) => (
                                                        <span
                                                            className='star'
                                                            key={value}
                                                            style={{
                                                                color: rate?.rate >= value ? "orange" : "grey",
                                                                cursor: "pointer",
                                                                fontSize: "x-large",
                                                                marginRight: "10px"
                                                            }}
                                                        >
                                                            <i className="bi bi-star-fill"></i>
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className='rate-comment'>
                                                    {rate?.comment}
                                                </div>
                                            </div>
                                        ))
                                            :
                                            <span style={{
                                                fontWeight: "500"
                                            }}> Hiện chưa có đánh giá cho dịch vụ này</span>
                                    }
                                </div>
                            </div>
                            <div className='list-service'>
                                <div className='label-list-service'>
                                    Bổng Oliver gợi ý cho bạn
                                </div>
                                <div className='main-list-service'>
                                    <Swiper
                                        style={{ zIndex: 0 }}
                                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                                        spaceBetween={0}
                                        slidesPerView={3}
                                        breakpoints={{
                                            320: {
                                                slidesPerView: 1,
                                            },
                                            480: {
                                                slidesPerView: 1,
                                            },
                                            600: {
                                                slidesPerView: 2,
                                            },
                                            768: {
                                                slidesPerView: 2,
                                            },
                                            800: {
                                                slidesPerView: 2,
                                            },
                                            1024: {
                                                slidesPerView: 3,
                                            },
                                            1280: {
                                                slidesPerView: 3,
                                            },
                                            1440: {
                                                slidesPerView: 4,
                                            },
                                        }}
                                        navigation
                                        onSwiper={(swiper) => console.log(swiper)}
                                        onSlideChange={() => console.log('slide change')}
                                    >
                                        {
                                            //services?.map((service, index) => (
                                            services?.map((service, index) => (
                                                <SwiperSlide>
                                                    <Item sx={{ height: 500, width: '100%' }}
                                                        content={{
                                                            src: service?.image,
                                                            title: service?.name,
                                                            des: 'Giá : ' + service?.price + ' VND'
                                                        }}
                                                        id={service?.id}
                                                        handleClick={clickItem}
                                                    />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default ServiceDetails