import React from 'react';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import EditProfileDialog from './EditProfileDialog';
import { updateUserProfile } from '../actions/user';

class EditProfileContainer extends React.Component {
  state = {
    open: false,
    errorMessage: '',
    name: this.props.name,
    avatar: this.props.avatar,
    email: this.props.email, 
  };

  handleClickOpen = () => { 
    this.setState({ open: true }); 
  };

  handleDialogClose = () => {
    this.props.onDone();
    this.setState({ open: false, username: '', password: '' });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Edit Profile Submit",this.props.userId,this.state) 
    // To Do: move to actions
    let profile = {
      name: this.state.name,
      username: this.props.username,
      email: this.state.email,  
      id: this.props.userId,
  // temporary just so backend doesn't overwrite To Do
      avatar_hash: this.state.avatar,
      type: this.props.role,       
    }     
    // To Do: show the error message   
    this.props.updateUserProfile(
      this.props.userId, profile)   
    this.handleDialogClose();
  };

  onChange = (e) => {
    this.setState({ [e.target.id] : e.target.value, errorMessage: '' })
  }
  
  render() {
    return (
        <EditProfileDialog
          open={this.state.open} 
          handleOpen={this.handleClickOpen} 
          handleClose={this.handleDialogClose}
          handleSubmit={this.handleSubmit}
          onChange={this.onChange} 
          errorMessage={this.state.errorMessage}
          username={this.state.username} 
          name={this.state.name} 
          email={this.state.email} 
        />
    );
  }
}
const mapStateToProps = state => {
  return {
      userId: state.user.id,
      name: state.user.name,
      username: state.user.username,
      email: state.user.email,
  // temporary just so backend doesn't overwrite To Do
      avatar: state.user.avatar,
      role: state.user.role, 
  }
} 
export default withRouter(connect(mapStateToProps,{updateUserProfile})(EditProfileContainer))

