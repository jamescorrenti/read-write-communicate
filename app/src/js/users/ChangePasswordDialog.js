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

function ChangePasswordDialog (props) {
    const {open, handleOpen, handleClose, onChange, handleSubmit, errorMessage} = props;
    const {password, newPassword, confirmPassword } = props;
    const { classes } = props;  

    return(
        <div> 
            <MenuItem onClick={handleOpen}>Change Password</MenuItem>
            <Dialog 
                open={open}   
                onClose={handleClose}
                aria-labelledby="change-password-title"
                className={classes.dialogBox} 
            > 
            <DialogTitle id="change-password-title">
                Change Password 
            </DialogTitle>    

            <form id="change-password-form" onSubmit={handleSubmit} >                                        
                <TextField required
                    variant="outlined" margin="normal" className={classes.dialogTextField}
                    id="password" label="Current Password" type="password" 
                    value={password} onChange={e => onChange(e)}
                />
                <TextField required
                    variant="outlined" margin="normal" className={classes.dialogTextField}
                    id="newPassword" label="New Password" type="password" 
                    value={newPassword} onChange={e => onChange(e)}
                />
                <TextField required
                    variant="outlined" margin="normal" className={classes.dialogTextField}
                    id="confirmPassword" label="Confirm New Password" type="password" 
                    value={confirmPassword}  onChange={e => onChange(e)}
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

export default withStyles(dialogStyles)(ChangePasswordDialog);
