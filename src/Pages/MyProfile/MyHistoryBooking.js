import React, { useEffect, useState } from 'react'
import './MyHistoryBooking.css'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import jwtDecode from 'jwt-decode'
import { getMyHistoryBooking, getMyProfile, payMent, updateProfile, verifyEmail } from '../../Axios/handleAPI'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import Menu from '../../Components/MenuMy/Menu'

function MyHistoryBooking() {
    const [user, setUser] = useState()
    const [bookings, setBooking] = useState()
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        fetchData();
    }, [page, pageSize])

    const fetchData = async () => {
        var res = await getMyHistoryBooking(page,pageSize)
        setBooking(res?.data?.data)
    }

    return (
        <div className='main-my-history-booking'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='content'>
                    <Menu />
                    <div className='table-history'>
                        <table className='table'>
                            <thead className='header-table'>
                                <th className='hiden'>Mã</th>
                                <th>Thời gian</th>
                                <th className='hiden'>Mô tả</th>
                                <th>Tổng</th>
                                <th className='center'>Trạng thái</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {
                                    bookings?.map((booking, index) => (
                                        <tr key={index}>
                                            <td className='hiden'>{booking?.id}</td>
                                            <td>{booking?.time?.slice(11,16) + ' ' + booking?.time?.slice(5,10)}</td>
                                            <td className='hiden'>{booking?.description}</td>
                                            <td>{booking?.price.toLocaleString('vi', { style: 'currency', currency: 'VND' })}</td>
                                            <td className='center'>
                                                {
                                                    booking?.status == "done" ? <span className='btn-status done'>Hoàn thành</span> :
                                                    booking?.status == "wait" && <span className='btn-status wait'>Mới</span>

                                                }
                                            </td>
                                            <td>
                                                <Link to={`${booking.id}`}>Chi tiết</Link>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div>
                            <a href onClick={()=>setPageSize(pageSize + 5)} className='view-more' >Xem thêm</a>
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

export default MyHistoryBooking