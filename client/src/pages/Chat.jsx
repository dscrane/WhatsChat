import React from 'react';
import { connect } from 'react-redux';

const Chat = (props) => {
  console.log(props)
  return (
    <div className='d-flex col-10 bg-secondary'>
      {props.location.pathname}
    </div>
  )
}

export default connect(null)(Chat);