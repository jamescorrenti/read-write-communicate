import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import { loginUser } from '../actions/user';
import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  state = {
    open: false,
    username: '',
    password: ''
  };

  handleClickOpen = () => { this.setState({ open: true }); };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ open: false, username: '', password: '' });
  };

  handleLogin = () => {
    this.props.loginUser(this.state, () => {
      this.props.history.push(`/dashboard`)        
    });                 
    this.setState({ open: false, username: '', password: '' });
  };

  onChange = (e) => {
    this.setState({ [e.target.id] : e.target.value })
  }
  
  render() {
    return (
        <LoginForm 
          open={this.state.open} 
          handleOpen={this.handleClickOpen} 
          handleClose={this.handleClose}
          handleLogin={this.handleLogin}
          onChange={this.onChange} />
    );
  }
}

export default withRouter(connect(null,{loginUser})(LoginFormContainer))

