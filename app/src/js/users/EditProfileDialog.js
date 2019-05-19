import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { cancelButtonStyle } from '../styles/buttonStyles';

class EditProfileDialog extends React.Component {
    state = {
      open: false,
    };
  
    handleOpen = () => { this.setState({ open: true });  }


    handleClose = () => {
      this.setState({ open: false });
      this.props.onDone();      
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //... submit here
        handleClose();
      };    
    render() {
        const actions = [<Button 
            label="Close"
            primary={true} 
            onClick={this.handleClose} />
        ]       
        return(
            <div> 
                <MenuItem onClick={this.handleOpen}>Edit Profile</MenuItem>
                <Dialog 
                    open={this.state.open}   
                    actions={actions}
                    onClose={this.handleClose}
                    aria-labelledby="edit-profile-title"> 
                    <DialogTitle id="edit-profile-title">
                        Edit Profile
                    </DialogTitle>    
                    <form id="edit-profile-form" onSubmit={this.handleSubmit} >
                        <TextField disabled
                            variant="outlined" margin="normal"
                            id="email" label="Email" 
                            type="text" value={this.props.email}
                        />

                        <div>
                            <Button variant="contained" onClick={this.handleClose} style={cancelButtonStyle}>
                                Cancel
                            </Button>
                            <Button variant="contained" type="submit" >
                                Save
                            </Button>
                        </div>
                    </form>                              
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userId: state.user.id,
        name: state.user.name,
        username: state.user.username,
        email: state.user.email,
        avatar: state.user.avatar,
        type: state.user.type
    }
} 

export default connect(mapStateToProps)(EditProfileDialog);
