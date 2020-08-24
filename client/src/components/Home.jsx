import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Signup } from '../components';


class Home extends Component {

  componentDidMount() {
    this.connectToSocket()
  }

  connectToSocket = () => {
    const SOCKET_IO_URL = 'http://localhost:5500'
    const socket = io(SOCKET_IO_URL);
    socket.emit('connection')
  }



  render() {
    return (
      <div>
        Home
        <Signup onSubmit={this.onSubmit}/>
      </div>
    )
  }
}

export default connect(null)(Home)