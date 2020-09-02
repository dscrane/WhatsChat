import React from 'react';
import { avatarIcon } from "../../icons/icons";

const SidebarProfile = (props) => {

  return (
    <div className='d-flex flex-column my-3'>
      <div className='text-center'>
        <img
          className='rounded-circle img-thumbnail'
          src='http://ssl.gstatic.com/accounts/ui/avatar_2x.png'
          height='150'
          width='150'
          alt='avatar'/>
      </div>
      <div className='row justify-content-center my-3'>
        <div style={{ width: '80%', borderBottom: '.5px solid white', borderRadius: '75%'}}></div>
      </div>
    </div>
  )
}

export default SidebarProfile;