import React from 'react'

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'

import UserMenu from '../users/UserMenu'
import LoginForm from '../users/LoginForm'
import logo from '../images/logo.png';

const TitleBar = (props) => {
  console.log('render titlebar now',props.userLoggedIn)
  return(
    <AppBar >
      <Toolbar >
        <Grid justify="space-between" alignItems="center" container >
          <Grid item><img src={logo} alt="Logo" style={{padding:'10'}} /></Grid>
          <Grid item>{ (props.userLoggedIn) ? <UserMenu /> : <LoginForm /> }</Grid>  
        </Grid>
      </Toolbar>
    </AppBar>  
  )
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.authenticated,
  }
}

export default connect(mapStateToProps)(TitleBar);


