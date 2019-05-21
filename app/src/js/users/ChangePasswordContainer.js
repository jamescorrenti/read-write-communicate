import React from 'react';
import { connect } from 'react-redux';

import ChangePasswordDialog from './ChangePasswordDialog';

class ChangePasswordContainer extends React.Component {
    state = {
      open: false,
      password: '',
      newPassword: '',
      confirmPassword: ''
    };
  
    handleOpen = () => { this.setState({ open: true });  }

    handleClose = () => {
      this.setState({ open: false });
      this.props.onDone();      
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //... submit here
        console.log("Change Password Submit",this.state)
        this.handleClose();
    };  

    onChange = (e) => {
        this.setState({ [e.target.id] : e.target.value, errorMessage: '' })
    }  

    render() {
        return (
            <ChangePasswordDialog
                open={this.state.open} 
                handleOpen={this.handleOpen} 
                handleClose={this.handleClose}
                handleSubmit={this.handleSubmit}
                onChange={this.onChange} 
                errorMessage={this.state.errorMessage}
                password={this.state.password} 
                newPassword={this.state.newPassword} 
                confirmPassword={this.state.confirmPassword} 
            />
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
    }
} 

export default connect(mapStateToProps)(ChangePasswordContainer);
