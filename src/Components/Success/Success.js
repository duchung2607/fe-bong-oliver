import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import './Success.css';
function Success(props) {
  return (
    <div className="success-overlay">
      <FontAwesomeIcon icon={faCircleCheck}  className="success-icon" />
      <span className='success-message'>{props?.message}</span>
    </div>
  )
}

export default Success