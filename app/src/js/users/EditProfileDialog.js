import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';

import { cancelButtonStyle } from '../styles/buttonStyles';
import { dialogStyles } from '../styles/dialogStyles';

function EditProfileDialog (props) {
  
    const {open, handleOpen, handleClose, onChange, handleSubmit, errorMessage} = props;
    const {name, username, email } = props;
    const { classes } = props; 

    return (
  
        <div> 
            <MenuItem onClick={handleOpen}>Edit Profile</MenuItem>
            <Dialog 
                    open={open}   
                    onClose={handleClose}
                    aria-labelledby="edit-profile-title"
                    className={classes.dialogBox} > 
                <DialogTitle id="form-dialog-title">
                    Edit Profile for {username}
                </DialogTitle>                    
                <form id="edit-profile-form" onSubmit={handleSubmit} >
                    <TextField autoFocus required
                        variant="outlined" margin="normal" className={classes.dialogTextField}
                        id="name" label="name" type="text" value={name}
                        onChange={e => onChange(e)}
                    />
                    <TextField required
                        variant="outlined" margin="normal" className={classes.dialogTextField}
                        id="email" label="Email" type="email" value={email}
                        onChange={e => onChange(e)}
                    />                
                    <div>
                        <Button variant="contained" onClick={handleClose} style={cancelButtonStyle}>
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



export default withStyles(dialogStyles)(EditProfileDialog);
