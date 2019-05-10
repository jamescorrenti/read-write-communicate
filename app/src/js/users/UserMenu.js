import React from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonIcon from '@material-ui/icons/Person';

import { logoutUser } from '../actions/user';

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
    this.props.logoutUser(() => { this.props.history.push('/') });    
    this.setState({ anchorEl: null });
  };

  render() {
    console.log('render user menu')
    const { anchorEl } = this.state;
    return (    
      <div>
        <Fab variant="extended" onClick={this.handleClick}
            aria-label="Delete" aria-haspopup="true"
            aria-owns={anchorEl ? 'user-menu' : undefined} >
          <PersonIcon />                  
          {this.props.name}
          <ArrowDropDownIcon /> 
        </Fab>
        <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
          <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      name: state.user.screenName,
  }
}    

export default withRouter(connect(mapStateToProps,{logoutUser})(UserMenu))
