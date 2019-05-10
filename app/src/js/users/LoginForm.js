import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { loginUser } from '../actions/user';

class LoginForm extends React.Component {
  state = {
    open: false,
    email: '',
    password: ''
  };

  handleClickOpen = () => { this.setState({ open: true }); };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ open: false, email: '', password: '' });
  };

  handleLogin = () => {
    this.props.loginUser(this.state, (type,id) => {
      this.props.history.push(`/${type}s/${id}`)        
    });                 
    this.setState({ open: false, email: '', password: '' });
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.handleClickOpen}>
          Sign In
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" id="email" label="Email" type="text" fullWidth
              value={this.state.email} onChange={e => this.setState({ email: e.target.value })}
            />
            <TextField margin="dense" id="password" label="Password" type="password" fullWidth
              value={this.state.password} onChange={e => this.setState({ password: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" onClick={this.handleClose} >
              Cancel
            </Button>
            <Button variant="outlined" onClick={this.handleLogin} >
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withRouter(connect(null,{loginUser})(LoginForm))

