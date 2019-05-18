import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { cancelButtonStyle } from '../styles/buttonStyles';

import logo from '../images/logo.png';

function LoginForm (props) {
  
  const {open, handleOpen, handleClose, onChange, handleLogin} = props;

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Sign In
      </Button>
      <Dialog open={open} onClose={handleClose} 
              aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">
          <img src={logo} alt="Logo" style={{padding:"10"}} />
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus required
              variant="outlined" margin="normal" fullWidth
              id="username" label="Username" type="text" 
              onChange={e => onChange(e)}
          />
          <TextField required
              variant="outlined" margin="normal" fullWidth
              id="password" label="Password" type="password" 
              onChange={e => onChange(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} style={cancelButtonStyle}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleLogin} >
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LoginForm;

