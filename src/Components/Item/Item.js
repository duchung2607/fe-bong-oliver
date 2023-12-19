import React, { useState } from 'react'
import './Item.css'

function Item(props) {
  const [check, setCheck] = useState(props.check)

  const clickItem = (id) => {
    setCheck(!check)
    props.handleClick(id)
  }
  return (
    <div className='main-item' style={{ ...props.sx }} onClick={() => { clickItem(props?.id) }}>
      <div className={check ? "card check" : "card"}>
        <div className='card-body'>
          {/* <img className='img-item' src={props?.content?.src}></img> */}
          <div className="image-item">
            <div style={{
              height:"100%"
            }}>
              <img className='img-item' src={props?.content?.src}></img>
            </div>
          </div>
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