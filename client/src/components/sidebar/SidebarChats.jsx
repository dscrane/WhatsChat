import React from 'react';
import { Link } from 'react-router-dom';
import { profileIcon} from "../../icons/icons";

const SidebarChats = (props) => {

  return (
    <div className='d-flex flex-column w-100 align-items-center'>
      <ul className='list-unstyled d-flex flex-column align-items-center w-100'>
        <li className='row justify-content-center' style={{width: '90%'}}>
          <div className='col-3 my-auto' style={{fontSize: '50px', lineHeight: '50px'}} >
            {profileIcon}
          </div>
          <Link
            className='d-flex flex-row justify-content-center align-items-center text-center text-white w-75 text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white'}}
            to={'/chats/1'}
          >
            <div className='col-4 text-center'>
              chat 1
            </div>
          </Link>
        </li>
        <li className='row justify-content-center' style={{width: '90%'}}>
          <div className='col-3 my-auto' style={{fontSize: '50px', lineHeight: '50px'}} >
            {profileIcon}
          </div>
          <Link
            className='d-flex flex-row justify-content-center align-items-center text-center text-white w-75 text-decoration-none'
            style={{height: '8vh', borderBottom: '1px solid white'}}
            to={'/chats/2'}
          >
            <div className='col-4 text-center'>
              chat 2
            </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarChats;