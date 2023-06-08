import React, { useEffect, useState } from 'react'
import './Home.css'
import Navbar from '../../Components/Navbar/Navbar'
import image1 from '../../Assets/Image/1.jpg'
import image2 from '../../Assets/Image/2.jpg'
import FormBooking from '../../Components/FormBooking/FormBooking'
import { useNavigate } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import Footer from '../../Components/Footer/Footer'

function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState(sessionStorage.getItem("token")&&jwtDecode(sessionStorage.getItem("token")))
    const Booking = (phone) => {
        navigate('/booking?phone='+phone + "&step=0")
    }

    useEffect(()=>{
    },[])
    
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
                                <img className="d-block w-100 img-carousel" src="https://images.squarespace-cdn.com/content/v1/5edee990a8696a7b8618fe6d/1592794368345-KP26O2DQ6O0SR8N0KOTN/DomMiguelPhotography6164+copy.jpg?format=2500w" />
                            </div>
                            <div className="carousel-item" data-bs-interval="3000">
                                <img className="d-block w-100 img-carousel" src={image1} />
                            </div>
                            <div className="carousel-item" data-bs-interval="3000">
                                <img className="d-block w-100 img-carousel" src={image2} />
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            {/* <span className="carousel-control-prev-icon" aria-hidden="true" /> */}
                            <i className="fa-solid fa-chevron-left"></i>
                            {/* <span className="visually-hidden">Previous</span> */}
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            {/* <span className="carousel-control-next-icon" aria-hidden="true" />
                            <span className="visually-hidden">Next</span> */}
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div className='form-booking'>
                        <FormBooking handleBooking={Booking} phone={user&& user.phone}/>
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