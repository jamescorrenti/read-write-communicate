import React from 'react'
import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { compose } from 'redux';

import Drawer from '@material-ui/core/Drawer'
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 220;

const styles = theme => ({
    drawer: { 
      flexShrink: 0,     
      width: drawerWidth, 
    },
    drawerPaper: {
      backgroundColor: '#0D8087',
      color: '#FFFFFF',
      width: drawerWidth,       
    },
    whiteColor: {
      color: '#FFFFFF',
    },
    list: {
      marginTop: '3em'
    },
    toolbar: theme.mixins.toolbar,
});

const SideMenu = (props) => {
    const { classes } = props; 

    function getMenuOptions() {
      switch (props.userRole) {
        case 'student':
          return [
            {text:'Dashboard', path:'/dashboard'},
            {text:'Current Assignments', path:`/student/${props.userId}/assignments/todo` },
            {text:'Submitted Assignments', path:`/student/${props.userId}/assignments/submitted` }]
        case 'faculty':
          return [
            {text:'Dashboard', path:'/dashboard'},
            {text:'Classes', path:'/classes', params:{teacherId: props.userId}},
            {text:'Assignments', path:'/assignments', params:{teacherId: props.userId}},
            {text:'Students', path:'/students'}
          ]
      }
    }

    if (!props.userLoggedIn) 
      return null;
    return(
      <Drawer variant="permanent" anchor="left"
        className={classes.drawer} classes={{ paper: classes.drawerPaper,}}
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          {getMenuOptions().map((option, index) => (
            <ListItem 
                key={option.text} 
                button component={Link} to={{pathname: option.path, state:option.params}}
            >
              <ListItemText classes={{ primary: classes.whiteColor }}>
                {option.text}
              </ListItemText>
           </ListItem>         
          ))}
        </List>   
      </Drawer>  
   )
}

const mapStateToProps = state => {
  return {
    userRole: state.user.role,
    userLoggedIn: state.user.authenticated,
    userId: state.user.id
  }
}

export default compose (
    connect(mapStateToProps),
    withStyles(styles)
  ) (SideMenu);

