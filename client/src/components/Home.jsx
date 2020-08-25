import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup } from "../redux/actions";
import SignupForm from "../components/SignupForm";

class Home extends Component {
  handleClick = (formValues) => {
    console.log(formValues)
    this.props.signup(formValues)
  }

  render() {
    return (
      <div className='ui container'>
        <SignupForm handleClick={this.handleClick} />
      </div>
    )
  }
}

export default connect(null, { signup })(Home);