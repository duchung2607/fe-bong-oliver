import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import image1 from '../../Assets/Image/1.jpg'
import image2 from '../../Assets/Image/2.jpg'
import banner1 from '../../Assets/Image/banner1.png'
import FormBooking from '../../Components/FormBooking/FormBooking'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Footer from '../../Components/Footer/Footer'
import axios from 'axios'
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import Item from '../../Components/Item/Item'

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(sessionStorage.getItem("token") && jwtDecode(sessionStorage.getItem("token")))
    const Booking = (phone) => {
        navigate('/booking?phone=' + phone + "&step=0")
    }

    const [serviceIds, setServiceId] = useState()
    const [services, setService] = useState()
    const [serviceMosts, setServiceMost] = useState()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        getServiceMosts(5)
    }, [])

    useEffect(() => {
        getServices()
    }, [serviceIds])

    const fetchData = async () => {
        if (sessionStorage.getItem("token") != null) {
            const user = jwtDecode(sessionStorage.getItem("token"))
            try {
                var res = await axios.get(`http://127.0.0.1:5000/recommend?id=${user?.id}`)
                setServiceId(res?.data?.data)
            } catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                var res = await axios.get(`http://127.0.0.1:5000/recommend?id=${2}`)
                setServiceId(res?.data?.data)

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
                setService(res?.data?.data)
            } catch (e) {
                console.log(e)
            }
    }

    const getServiceMosts = async (size) => {
        try{
            var res = await axios.get("https://localhost:7125/api/service/most?size=10")
            setServiceMost(res?.data?.data)
        }catch(e){
            console.log(e)
        }
    }

    const clickItem = (id) => {
        navigate(`/service/${id}`)
    }

    return (
        <div className='main-home'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='main-carousel-slide'>
                    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active" data-bs-interval="3000">
                                <img className="d-block w-100 img-carousel" src="https://hairsalonchitam.vn/wp-content/uploads/2023/03/1920x620-06-2048x662.jpg" />
                            </div>
                            <div className="carousel-item" data-bs-interval="3000">
                                <img className="d-block w-100 img-carousel" src={banner1} />
                            </div>
                            <div className="carousel-item" data-bs-interval="3000">
                                <img className="d-block w-100 img-carousel" src={image2} />
                            </div>
                        </div>
                        <button style={{ zIndex: 0 }} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            {/* <span className="carousel-control-prev-icon" aria-hidden="true" /> */}
                            <i className="fa-solid fa-chevron-left"></i>
                            {/* <span className="visually-hidden">Previous</span> */}
                        </button>
                        <button style={{ zIndex: 0 }} className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            {/* <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span> */}
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className='form-booking'>
                        <FormBooking handleBooking={Booking} phone={user && user.phone} />
                    </div>
                </div>
                <div className='list-service'>
                    <div className='label-list-service'>
                        Bổng Oliver gợi ý cho bạn
                    </div>
                    <div className='main-list-service '>
                        <div className="image-banner">
                            <div>
                                <img className='image' src="https://chastarhairsalon.com.vn/wp-content/uploads/2023/05/chastar-hair-salon-toc-nu.png" width="100%" />
                            </div>
                        </div>
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

                <div className='list-service'>
                    <div className='label-list-service'>
                        Được yêu thích nhất
                    </div>
                    <div className='main-list-service '>
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
                                serviceMosts?.map((service, index) => (
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
            {/* <div className='footer'>
                <Footer />
            </div> */}
        </div>
    )
}

export default Home