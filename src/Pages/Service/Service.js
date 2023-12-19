import React, { useEffect, useState } from 'react'
import './Service.css'
import Navbar from '../../Components/Navbar/Navbar'
import Item from '../../Components/Item/Item'
import Carousel from '../../Components/Carousel/Carousel'
import { getServices } from '../../Axios/handleAPI'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom'
const types = ['CẮT - GỘI - SẤY', 'UỐN - DUỖI', 'NHUỘM', 'DỊCH VỤ KHÁC']
function Service() {
  const [services, setServices] = useState()
  const [typeSearch, setTypeSearch] = useState("Tất cả")
  const [serviceTypes, setServiceType] = useState(['CẮT - GỘI - SẤY', 'UỐN - DUỖI', 'NHUỘM', 'DỊCH VỤ KHÁC'])
  const navigate = useNavigate()
  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    var res = await getServices(1, 1000, "", "id")
    console.log(res.data)
    setServices(res.data)
  }

  const clickItem = (id) => {
    navigate("/service/" + id)
  }
  return (
    <div className='main-service'>
      {/* <div className='navbar'>
        <Navbar />
      </div> */}

      <div className='main'>
        <div className='carousel'>
          <Carousel />
        </div>
        <div className='border-carousel'>
          <div className='main-border-carousel'>
            <div className='item-border-carousel'>
              Kinh nghiệm
            </div>
            <div className='item-border-carousel'>
              Cam kết chất lượng
            </div>
            <div className='item-border-carousel'>
              {/* <img src='https://shop.30shine.com/icons/new-usp-icon-4.svg'></img> */}
              Uy tín
            </div>
          </div>
        </div>
        <div className='menu-tab'>
          <ul>
            {
              types.map((type, typeKey) => (
                <a href={'#type' + typeKey}><li>{type}</li></a>
              ))
            }
          </ul>
        </div>
        <div className='group-service'>
          <div className='search-group'>
            <select onChange={(e) => setServiceType(e.target.value != "all"? [e.target.value] :types)}>
              {
                types.map((type, index) => (
                  <option value={type}>{type}</option>
                ))
              }
                  <option value="all">TẤT CẢ</option>
            </select>
          </div>
          {
            serviceTypes.map((type, typeKey) => (
              <>
                <div className='title-list-service' id={'type' + typeKey}>
                  {type}
                </div>
                <div className='list-service'>
                  {
                    services?.filter(s => s.serviceTypeDTO.name == type).map((service, key) => (
                      <Item sx={{ height: 500, width: '100%' }}
                        content={{
                          src: service.image,
                          title: service.name,
                          des: 'Giá : ' + service.price + ' VND'
                        }}
                        id={service.id}
                        handleClick={clickItem}
                      />
                    ))
                  }
                </div>
              </>
            ))
          }
        </div>
      </div>
      {/* <div className='footer'>
        <Footer />
      </div> */}
    </div >
  )
}

export default Service