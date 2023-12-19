import React, { useEffect, useState } from 'react'
import './ViewHairStyle.css'
import Navbar from '../../Components/Navbar/Navbar'
import Item from '../../Components/Item/Item'
import { getHairStylesByTypeHair } from '../../Axios/hairStyleAPI'
import { useNavigate } from 'react-router-dom'

function ViewHairStyle() {
    const [focus, setFocus] = useState('trending')
    const [hairs, setHairs] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [focus])

    const fetchData = async () => {
        var res = await getHairStylesByTypeHair()
        setHairs(res?.data);
    }
    const clickItem = (id) => {
        navigate("/hair-style/" + id)
      }
    return (
        <div className='main-hair-style'>
            <div className='main'>
                <div className='group-main'>
                    {/* <div className='group-category'>
                        <button className={focus == 'trending' ? 'btn on-focus' : 'btn'} onClick={() => { setFocus('trending') }}>
                            <i className="fa-sharp fa-solid fa-fire"></i>
                            Top Trending</button>
                        <button className={focus == 'stylist-master' ? 'btn on-focus' : 'btn'} onClick={() => { setFocus('stylist-master') }}>
                            <i className="fa-solid fa-meteor"></i>
                            Stylist Master</button>
                        <button className={focus == 'like' ? 'btn on-focus' : 'btn'} onClick={() => { setFocus('like') }}>
                            <i className="fa-solid fa-heart"></i>
                            Đã Thích
                            <div className='like-number'>0</div>
                        </button>
                    </div> */}
                    <div className="title-hair-style">CÙNG BỔNG OLIVER KHÁM PHÁ
                        {
                            focus == 'trending' ? <span>XU HƯỚNG TÓC HOT NHẤT</span>
                                : focus == 'like' ? <span>CÁC MẪU TÓC MÀ BẠN THÍCH</span>
                                    : <span>CÁC MẪU TÓC DO STYLIST MASTER THỰC HIỆN</span>
                        }
                    </div>
                    <div className='group-hair-style'>
                        <div className='title-list-hair-style'>
                            MẪU TÓC NỮ
                        </div>
                        <div className='list-hair-style'>
                            {
                                hairs?.filter(h => h.type == false).map((hair, index) => (
                                    <Item sx={{ height: 450, width: '100%' }}
                                        content={{
                                            src: hair.image,
                                            title: hair.name,
                                            des: hair.sortDes
                                        }}
                                        id={hair.id}
                                        handleClick={clickItem}
                                    />
                                ))
                            }
                        </div>

                        <div className='title-list-hair-style'>
                            MẪU TÓC NAM
                        </div>
                        <div className='list-hair-style'>
                            {
                                hairs?.filter(h => h.type == true).map((hair, index) => (
                                    <Item sx={{ height: 450, width: '100%' }}
                                        content={{
                                            src: hair.image,
                                            title: hair.name,
                                            des: hair.sortDes
                                        }}
                                        id={hair.id}
                                        handleClick={clickItem}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewHairStyle