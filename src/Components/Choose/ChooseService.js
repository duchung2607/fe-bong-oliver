import React, { useEffect, useState } from 'react'
import Item from '../Item/Item'
import './ChooseService.css'
import axios from 'axios'
function ChooseService(props) {
    const [choose, setChoose] = useState(props.choose)
    const [services, setService] = useState([])
    const [serviceTypes, setServiceType] = useState(['CẮT - GỘI - SẤY', 'UỐN - DUỖI', 'NHUỘM', 'DƯỠNG - PHỤC HỒI', 'THƯ GIÃN', 'DỊCH VỤ KHÁC'])
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        var type = await axios.get("https://localhost:7125/api/service/type")
        setServiceType(type?.data.data)

        var data = await axios.get("https://localhost:7125/api/service?page=1&pageSize=1000&key=&sortBy=id")
        setService(data?.data?.data)
    }

    const clickItem = (id) => {
        props.clickItem(id)
    }

    const handleSubmit = () => {

    }

    console.log(choose)
    return (
        <div className='item-group'>
            {
                serviceTypes?.map((type, index) => (
                    <>
                        <div className='title-group'>
                            {type?.name}
                        </div>
                        <div className='group' style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
                            {
                                services?.filter(s => s.serviceTypeDTO.id == type?.id).map((service, key) => (
                                    <Item sx={{ height: 400, width: '100%' }}
                                        check={choose.find(s => s == service?.id) ? true : false}
                                        id={service?.id}
                                        content={{
                                            src: service.image,
                                            title: service.name,
                                            des: 'Giá : ' + service.price + ' VND'
                                        }}
                                        handleClick={clickItem}
                                    />
                                ))
                            }
                        </div>
                    </>
                ))
            }
            <div style={{ width: "100%", textAlign: "center" }}>

                <button style={{ borderRadius: "5px", height: "48px", width: "100%", border: "none", backgroundColor: "#fc3" }}
                    onClick={() => props.moveStep()}>
                    Hoàn tất
                </button>
            </div>
        </div>


    )
}

export default ChooseService