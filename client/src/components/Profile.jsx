import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUserData } from '../redux/actions';

const Profile = (props) => {
  const { fetchUserData, user } = props;

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData, user.attributes])

  const renderUserData = () => {
    /*return Object.keys(props.user.attributes)
      .map(key => {
        return (<div className='item' key={key}>
          <p>{key}:<span>{props.user[key]}</span></p>
        </div>)
      })*/
    return <div>{user.username}</div>

  }
  return (
    <div className='ui container'>
      {renderUserData()}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.userState
  }
}

export default connect(mapStateToProps, { fetchUserData })(Profile);