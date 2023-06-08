import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './ServiceDetails.css'
import Footer from '../../Components/Footer/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

function ServiceDetails() {
    const [user, setUser] = useState(sessionStorage.getItem("token")&&jwtDecode(sessionStorage.getItem("token")))
    const params = useParams()
    const navigate = useNavigate()
    const [service, setService] = useState()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        var res = await axios.get("https://localhost:7125/api/service/" + params.id)
        setService(res?.data?.data)
    }
    return (
        <div className='main-service-details'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='container'>
                    <div className='banner'>
                        <img className='img-banner' src={service?.image} />
                    </div>
                    {/* <div style={{display:"flex", justifyContent:"center"}}>
                        <span style={{color:"#fc3", fontSize:"50px"}}>
                            {service?.name}
                        </span>
                    </div> */}
                    <div className='price'>
                        <div>
                           Giá chỉ: <strong style={{paddingLeft:"10px",paddingRight:"10px", color:"red"}}> {service?.price}</strong>VNĐ
                        </div>
                    </div>
                    <div className='info'>
                        <div className='des'> Ngay khi bước vào 30Shine,
                            bạn sẽ cùng chúng tôi trải nghiệm chuyến hành trình tỏa sáng đầy thú vị -
                            nơi mỗi người đàn ông không chỉ cắt tóc mà còn tìm thấy nhiều hơn như thế.
                            Đây là trải nghiệm gắn kết hàng triệu lượt khách mỗi năm và cũng là niềm cảm
                            hứng để chúng tôi nỗ lực mỗi ngày.   Ngay khi bước vào 30Shine, bạn sẽ cùng
                            chúng tôi trải nghiệm chuyến hành trình tỏa sáng đầy thú vị - nơi mỗi người đàn ôn
                            g không chỉ cắt tóc mà còn tìm thấy nhiều hơn như thế. Đây là trải nghiệm gắn kết h
                            àng triệu lượt khách mỗi năm và cũng là niềm cảm hứng để chúng tôi nỗ lực mỗi ngày.
                            Ngay khi bước vào 30Shine, bạn sẽ cùng chúng tôi trải nghiệm chuyến hành trình tỏa sáng
                            đầy thú vị - nơi mỗi người đàn ông không chỉ cắt tóc mà còn tìm thấy nhiều hơn như thế. Đâ
                            y là trải nghiệm gắn kết hàng triệu lượt khách mỗi năm và cũng là ni
                            ềm cảm hứng để chúng tôi nỗ lực mỗi ngày.
                        </div>
                    </div>
                    <div className='group-button'>
                        <button className='button left' onClick={()=> navigate("/service")}>Khám phá thêm dịch vụ</button>
                        <button className='button right' onClick={()=>user?navigate("/booking?phone=" + user.phone + "&step=0") : navigate("/booking?phone=&step=0")}>Đặt lịch ngay</button>
                    </div>
                </div>
            </div>
            {/* <div className='footer'>
                <Footer />
            </div> */}
        </div>
    )
}

export default ServiceDetails