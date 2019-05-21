import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import { cancelButtonStyle } from '../styles/buttonStyles';
import { dialogStyles } from '../styles/dialogStyles';

import logo from '../images/logo.png';


function LoginForm (props) {
  
  const {open, handleOpen, handleClose, onChange, handleLogin, errorMessage} = props;
  const { classes } = props; 

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose} 
              aria-labelledby="form-dialog-title" className={classes.dialogBox}>

        <DialogTitle id="form-dialog-title">
          <img src={logo} alt="Logo" />
        </DialogTitle>
        <Typography component="p">
          {errorMessage}
        </Typography>
        <form id="login-form" onSubmit={handleLogin} >
           <TextField autoFocus required
              variant="outlined" margin="normal" className={classes.dialogTextField}
              id="username" label="Username" type="text" 
              onChange={e => onChange(e)}
          />
          <TextField required
              variant="outlined" margin="normal" className={classes.dialogTextField}
              id="password" label="Password" type="password" 
              onChange={e => onChange(e)}
          />
          <div>
          <Button variant="contained" onClick={handleClose} style={cancelButtonStyle}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" >
            Sign In
          </Button>
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default withStyles(dialogStyles)(LoginForm);


