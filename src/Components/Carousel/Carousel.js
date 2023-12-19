import React from 'react'
import './Carousel.css'

import image1 from '../../Assets/Image/1.jpg'
import image2 from '../../Assets/Image/2.jpg'
import banner1 from '../../Assets/Image/banner1.png'

function Carousel() {
    return (
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
                <button style={{zIndex:0}} className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button style={{zIndex:0}} className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Carousel