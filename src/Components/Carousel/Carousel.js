import React from 'react'
import './Carousel.css'

import image1 from '../../Assets/Image/1.jpg'
import image2 from '../../Assets/Image/2.jpg'

function Carousel() {
    return (
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
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}

export default Carousel