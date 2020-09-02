import React from 'react';
import { Link } from 'react-router-dom';

const SidebarChats = (props) => {

  return (
    <div>
      <ul className='list-unstyled'>
        <li>
          <Link to={'/chats/1'}>
            chat 1
          </Link>
        </li>
        <li>
          <Link to={'/chats/2'}>
            chat 2
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SidebarChats;