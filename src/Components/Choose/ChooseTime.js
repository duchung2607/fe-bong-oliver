import React, { useEffect, useState } from 'react'
import './ChooseTime.css'
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

const timess = [
  '08:00:00', '08:20:00', '08:40:00', '09:00:00', '09:20:00', '09:40:00',
  '10:00:00', '10:20:00', '10:40:00', '11:00:00', '11:20:00', '11:40:00',
  '12:00:00', '12:20:00', '12:40:00', '13:00:00', '13:20:00', '13:40:00',
  '14:00:00', '14:20:00', '14:40:00', '15:00:00', '15:20:00', '15:40:00',
  '16:00:00', '16:20:00', '16:40:00', '17:00:00', '17:20:00', '17:40:00',
  '18:00:00', '18:20:00', '18:40:00', '19:00:00', '19:20:00', '19:40:00',
  '20:00:00', '20:20:00', '20:40:00', '21:00:00', '21:20:00', '21:40:00',]

const timesss = [
  '08', '09',
  '10', '11',
  '12', '13',
  '14', '15',
  '16', '17',
  '18', '19',
  '20', '21']

function ChooseTime(props) {
  const currentDate = new Date()
  const [times, setTime] = useState([])
  const [date, setDate] = useState()

  useEffect(() => {
    fetchData()
  }, [date])
  const fetchData = async () => {
    if (date) {
      var res = await axios.get("https://localhost:7125/api/booking/schedules?stylistId=" + props.stylistId + "&date=" + date.toISOString().slice(0,10))
      setTime(res?.data?.data)
    }
  }

  const checkTime = (time) =>{
    if(times.find(t => t.slice(11,16) == time))
    return true
    return false
  }

  const slides = [];

  if (date)
    timesss?.map((time, index) => (
      slides.push(
        <SwiperSlide key={`slide-${index}`} style={{ listStyle: "none" }}>
          {/* <div className="slide" onClick={() => props.handleChooseTime(time.id)}> */}
          <div className="slide">
            {/* <img className={time.id == props.choose ? 'avatar-time check' : "avatar-time"} src={time?.avatar}/>
          <span>{time?.name}</span> */}
            <div className='time-group'>
              {
                index % 2 == 0 ?
                  <>
                    <span className={ checkTime(time + ":00")? 'time-item disable' : 'time-item'} onClick={() => handleSubmit(time + ":00")}>{time + ":00"}</span>
                    <span className='time-item disable'>{time + ":20"}</span>
                    <span className={ checkTime(time + ":40")? 'time-item disable' : 'time-item'} onClick={() => handleSubmit(time + ":40")}>{time + ":40"}</span>
                  </>
                  :
                  <>
                    <span className='time-item disable'>{time + ":00"}</span>
                    <span className={ checkTime(time + ":20")? 'time-item disable' : 'time-item'} onClick={() => handleSubmit(time + ":20")}>{time + ":20"}</span>
                    <span className='time-item disable'>{time + ":40"}</span>
                  </>
              }

            </div>
          </div>
        </SwiperSlide>
      )
    ))

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  const day1 = new Date(today);
  day1.setDate(day1.getDate() + 3);

  const day2 = new Date(today);
  day2.setDate(day2.getDate() + 4);

  function formatDate(date) {
    const options = { weekday: "long", month: "long", day: "numeric" };
    const options2 = { weekday: "short", day: "2-digit", month: "2-digit" };
    return date.toLocaleDateString("vi-VN", options2);
  }

  const handleSubmit = (time) => {
    var tmp = date.toISOString().split('T')[0] + "T" + time
    props.handleChooseTime(tmp)
  }
  return (
    <div className='main-choose-time'>
      {/* <div className='btn-left'>
        <img src='https://30shine.com/static/media/arrowLeft.7b648ba9.svg' />
      </div> */}
      {/* <div className='btn-right'>
        <img src='https://30shine.com/static/media/arrowRight.613c1613.svg' />
      </div> */}
      {/* <input placeholder='Chọn ngày' className='input' type='date'></input> */}
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <div>
            <img src="https://30shine.com/static/media/calendar-2.3c77d299.svg"
              style={{ paddingRight: "10px" }} />
            Chọn ngày làm tóc
          </div>
        </button>
        <ul className="dropdown-menu">
          <li><span className="dropdown-item" onClick={() => setDate(today)}>Hôm nay, {formatDate(today).replace(".", "")}</span></li>
          <li><span className="dropdown-item" onClick={() => setDate(tomorrow)}>Ngày mai, {formatDate(tomorrow)}</span></li>
          <li><span className="dropdown-item" onClick={() => setDate(dayAfterTomorrow)}>Ngày kia, {formatDate(dayAfterTomorrow)}</span></li>
          <li><span className="dropdown-item" onClick={() => setDate(day1)}>{formatDate(day1)}</span></li>
          <li><span className="dropdown-item" onClick={() => setDate(day2)}>{formatDate(day2)}</span></li>
        </ul>
      </div>
      {
        date &&
        <div className='list-time'>
          <Swiper
            id="swiper"
            virtual
            slidesPerView={5}
            // slidesPerColumn={2}
            // slidesPerColumnFill="row"
            spaceBetween={15}
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
      }

    </div>
  )
}

export default ChooseTime