import React, { useEffect, useState } from 'react'
import './Rate.css'
import { useSearchParams } from 'react-router-dom'
import { getBookingByID, getServiceById } from '../../Axios/handleAPI'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { createRate } from '../../Axios/rateAPI'

function Rate() {
    const [params, setParams] = useSearchParams()
    const [service, setService] = useState()
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            var res = await getServiceById(params.get("serviceId"))
            setService(res?.data)

        } catch (e) {

        }
    }

    const handSubmit = async () => {
        try {
            var data = {
                rate: rating,
                comment: comment,
                userId: jwtDecode(sessionStorage.getItem("token")).id,
                serviceId: params.get("serviceId")
            }

            var res = await createRate(data)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className='main-rate'>
            <div className='content-rate'>
                <div className='title'>
                    Cảm ơn bạn đã sử dụng dịch vụ tại Bổng Oliver
                </div>
                <div className='content'>
                    <div className='service-item'>
                        <div className='image-service'>
                            <img src={service?.image} />
                        </div>
                        <div className='name-service'>
                            <span>{service?.name}</span>
                        </div>
                        <div className='rate-service'>
                            <span className='title-rate' style={{ marginRight: "20px" }}>Từ thang điểm từ 1 - 5 sao</span>
                            {[1, 2, 3, 4, 5].map((value) => (
                                <span
                                    className='star'
                                    key={value}
                                    style={{
                                        color: rating >= value ? "orange" : "grey",
                                        //  cursor: "pointer",
                                        fontSize: "x-large",
                                        cursor: value < 3 && "url('https://cdn.sstatic.net/Sites/stackoverflow/Img/favicon.ico'), pointer"
                                    }}
                                    onClick={() => (rating == value ? setRating(0) : setRating(value))}
                                >
                                    <i className="bi bi-star-fill"></i>
                                </span>
                            ))}
                        </div>
                        <div className='comment-service'>
                            <textarea className='comment'
                                rows="4"
                                placeholder='Hãy cho chung tôi biết cảm nhận của bạn về dịch vụ tại Bổng Oliver'
                                style={{
                                    padding: "5px 15px"
                                }}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                    <div className='group-button' style={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <button className='button button-fc3'
                            style={{
                                height: "48px",
                                padding: "0px 20px"
                            }}
                            onClick={() => handSubmit()}
                        >Gửi đánh giá</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rate