import React, { useEffect, useState } from 'react'
import './ChooseStylist.css'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  Virtual
} from "swiper/core";
import "swiper/swiper-bundle.css";
import axios from 'axios';

SwiperCore.use([Navigation, Pagination, Autoplay, Virtual]);

function ChooseStylist(props) {
  const [stylists, setStylist] = useState([])

  useEffect(() => {
    fetchData()
  }, [])
  const fetchData = async () => {
    var res = await axios.get("https://localhost:7125/api/users/stylist")
    // var res = await axios.get("https://localhost:7125/api/users")
    setStylist(res?.data?.data)
  }

  const slides = [];

  stylists?.map((stylist, index) => (
    slides.push(
      <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
        <div className="slide" onClick={()=> props.handleChooseStylist(stylist.id)}>
          <img className={stylist.id == props.choose ? 'avatar-stylist check' : "avatar-stylist"} src={stylist?.avatar}/>
          <span>{stylist?.name}</span>
          {/* <img src='http://res.cloudinary.com/dsirezdju/image/upload/v1684422562/z3695652475862_6ff11817e42770f8bde60401d6ae43ae_ae6jsa.jpg'/> */}
        </div>
      </SwiperSlide>
    )
  ))

  return (
    <div className='main-choose-stylist'>
      {/* <div className='btn-left'>
        <img src='https://30shine.com/static/media/arrowLeft.7b648ba9.svg' />
      </div> */}
      {/* <div className='btn-right'>
        <img src='https://30shine.com/static/media/arrowRight.613c1613.svg' />
      </div> */}
      <div className='list-stylist'>
        <Swiper
          id="swiper"
          virtual
          slidesPerView={5}
          // slidesPerColumn={2}
          // slidesPerColumnFill="row"
          spaceBetween={30}
          // slidesPerGroup={2}
          // autoplay
          // loop
          onReachEnd={() => {
            console.log("reach end");
            const tmp = slides.unshift();
            // slides.push(tmp);
          }}
          navigation
          // pagination
        >
          {slides}
        </Swiper>
      </div>
    </div>
  )
}

export default ChooseStylist