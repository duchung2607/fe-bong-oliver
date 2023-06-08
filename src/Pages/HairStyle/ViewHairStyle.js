import React, { useEffect, useState } from 'react'
import './ViewHairStyle.css'
import Navbar from '../../Components/Navbar/Navbar'
import Item from '../../Components/Item/Item'

function ViewHairStyle() {
    const [focus, setFocus] = useState('top-trending')
    useEffect(()=>{
        console.log(focus)
    },[focus])
    return (
        <div className='main-hair-style'>
            {/* <div className='navbar'>
                <Navbar />
            </div> */}
            <div className='main'>
                <div className='group-main'>
                    <div className='group-category'>
                        <button className={focus=='top-trending'? 'btn on-focus':'btn'} onClick={()=>{setFocus('top-trending')}}>
                            <i className="fa-sharp fa-solid fa-fire"></i>
                            Top Trending</button>
                        <button className={focus=='stylist-master'? 'btn on-focus':'btn'} onClick={()=>{setFocus('stylist-master')}}>
                            <i className="fa-solid fa-meteor"></i>
                            Stylist Master</button>
                        <button className={focus=='like'? 'btn on-focus':'btn'} onClick={()=>{setFocus('like')}}>
                            <i className="fa-solid fa-heart"></i>
                            Đã Thích
                            <div className='like-number'>0</div>
                        </button>
                    </div>
                    <div className="title-hair-style">CÙNG BỔNG OLIVER KHÁM PHÁ
                        {
                            focus=='top-trending'? <span>XU HƯỚNG TÓC HOT NHẤT</span>
                            : focus =='like' ? <span>CÁC MẪU TÓC MÀ BẠN THÍCH</span>
                            : <span>CÁC MẪU TÓC DO STYLIST MASTER THỰC HIỆN</span>
                        }
                    </div>
                    <div className='group-hair-style'>
                        <div className='title-list-hair-style'>
                            MẪU TÓC NAM
                        </div>
                        <div className='list-hair-style'>
                            {/* <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://www.ldg.com.vn/media/uploads/uploads/16205746-gai-xinh-mac-bikini-mau-do.jpg',
                                    title: 'Combo cắt gội 12 bước',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://www.ldg.com.vn/media/uploads/uploads/16210146-gai-xinh-bikini-do-0001.jpg',
                                    title: 'Combo cắt gội 12 bước',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://www.ldg.com.vn/media/uploads/uploads/16210423-gai-xinh-bikini-do-0001-0001.jpg',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://www.ldg.com.vn/media/uploads/uploads/16210648-gai-xinh-bikini-do-001.jpg',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            /> */}
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Artboard_33_198a8efad1.png',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                        </div>

                        <div className='title-list-hair-style'>
                            MẪU TÓC NAM
                        </div>
                        <div className='list-hair-style'>
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://storage.30shine.com/ResourceWeb/data/images/home/stylist/9.jpg?v=2',
                                    title: 'Combo cắt gội 12 bước',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://storage.30shine.com/ResourceWeb/data/images/home/stylist/9.jpg?v=2',
                                    title: 'Combo cắt gội 12 bước',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://storage.30shine.com/ResourceWeb/data/images/home/stylist/9.jpg?v=2',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Artboard_33_198a8efad1.png',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                            <Item sx={{ height: 350, width: '100%' }}
                                content={{
                                    src: 'https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Artboard_33_198a8efad1.png',
                                    title: 'Kiểu tóc mohican',
                                    des: 'Kiểu tóc hot trend 2023'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewHairStyle