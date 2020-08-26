import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signup, login } from "../redux/actions";
import SignupForm from "./SignupForm";
import LoginForm from './LoginForm'

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      signupForm: true,
      activeFormStyle: true,
    };
  }

  handleForm = (formValues) => {
    if (!this.state.signupForm) {
      this.props.login(formValues)
    }
    this.props.signup(formValues)
  }

  updateCurrentForm = () => {
    this.setState({
      signupForm: !this.state.signupForm,
      activeFormStyle: !this.state.activeFormStyle
    });
  }

  renderForm = () => {
    return this.state.signupForm ? <SignupForm handleClick={this.handleForm} /> : <LoginForm handleClick={this.handleForm} />;
  }

  render() {
    console.log(this.state)
    return (
      <div className='ui equal width center aligned middle aligned padded grid'>
        <div className='two column row'>
          <div onClick={() => this.updateCurrentForm()} className='red four wide column'>
            <div className='item'>
              <h3 className='middle aligned content'>Sign Up Here!</h3>
            </div>
          </div>
          <div onClick={() => this.updateCurrentForm()} className='blue four wide column'>
            <h3 className='middle aligned'>Log In Here!</h3>
          </div>
        </div>
        <div className={`${this.state.activeFormStyle ? 'red' : 'blue'} eight wide column`}>
          {this.renderForm()}
        </div>
      </div>
    )
  }
}

export default connect(null, { signup, login })(Home);