import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';

import EditProfileContainer from '../users/EditProfileContainer';
import ChangePasswordContainer from '../users/ChangePasswordContainer';
import { logoutUser } from '../actions/user';
import { colors } from '../styles/colors';

class UserMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {   
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.logoutUser(this.props.id, () => { this.props.history.push('/') });    
    this.setState({ anchorEl: null });
  };

  render() {
    const iconWhite = {
      fill: colors.textContrast,
    };
    const { anchorEl } = this.state;
    return (    
      <div>
        <Fab variant="extended" onClick={this.handleClick}
            aria-label="Delete" aria-haspopup="true"
            aria-owns={anchorEl ? "user-menu" : undefined} >
          <PersonIcon style={iconWhite}/>                  
          {this.props.name}
          <ArrowDropDownIcon style={iconWhite}/> 
        </Fab>
        <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <EditProfileContainer onDone={this.handleClose} />
          <ChangePasswordContainer onDone={this.handleClose} />
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      id: state.user.id,
      name: state.user.name,  
  }
}    

export default withRouter(connect(mapStateToProps,{logoutUser})(UserMenu))
