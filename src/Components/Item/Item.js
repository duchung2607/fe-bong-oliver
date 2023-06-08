import React, { useState } from 'react'
import './Item.css'

function Item(props) {
  const [check, setCheck] = useState(props.check)

  const clickItem = (id) => {
    setCheck(!check)
    props.handleClick(id)
  }
  return (
    <div className='main-item' style={{ ...props.sx }} onClick={()=> {clickItem(props?.id)}}>
      <div className= {check? "card check" : "card"}
      //  style={check&& {border: "1px solid #fc3"}}
       >
        <div className='card-body'>
          {/* <img className='img-item' src='https://30shine-store-images.s3.ap-southeast-1.amazonaws.com/uploads/small_Hoang_Dung_cd7a187836.png'></img> */}
          {/* {{...props.content.src}} */}
          <img className='img-item' src={props?.content?.src}></img>
          <div className='content-item'>
            <div className='title'>
              {props?.content?.title}
            </div>
            <div className='des'>
              {props?.content?.des}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item