import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import { loginUser } from '../actions/user';
import LoginForm from './LoginForm';

class LoginFormContainer extends React.Component {
  state = {
    open: false,
    username: '',
    password: '',
    errorMessage: ''
  };

  handleClickOpen = () => { this.setState({ open: true }); };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ open: false, username: '', password: '' });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.loginUser(
        this.state, 
        () => { this.props.history.push('/dashboard')},
        (message) => { this.setState({errorMessage: message}); this.handleClickOpen()}        
    );                 
    this.setState({ open: false, username: '', password: '' });
  };

  onChange = (e) => {
    this.setState({ [e.target.id] : e.target.value, errorMessage: '' })
  }
  
  render() {
    return (
        <LoginForm 
          open={this.state.open} 
          handleOpen={this.handleClickOpen} 
          handleClose={this.handleClose}
          handleLogin={this.handleLogin}
          onChange={this.onChange} 
          errorMessage={this.state.errorMessage} />
    );
  }
}

export default withRouter(connect(null,{loginUser})(LoginFormContainer))

