import React from 'react'

import { connect } from 'react-redux';

import { compose } from 'redux';
import Drawer from '@material-ui/core/Drawer'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const drawerWidth = 225;

const styles = theme => ({
    drawer: { 
      flexShrink: 0,     
      width: drawerWidth, 
    },
    drawerPaper: {
      backgroundColor: '#0D8087',
      color: '#FFFFFF'
    },
    whiteColor: {
      color: '#FFFFFF'
    },
    list: {
      marginTop: '3em'
    },
    toolbar: theme.mixins.toolbar,
});

const SideMenu = (props) => {
    const { classes } = props; 

    return(
      <Drawer variant="permanent" anchor="left"
        className={classes.drawer} classes={{ paper: classes.drawerPaper,}}
      >
        <div className={classes.toolbar} />
        <List className={classes.list}>
          {props.menuOptions.map((text, index) => (
            <ListItem button key={text} onClick={ (event) => {props.callback(index)}} >
              <ListItemText classes={{ primary: classes.whiteColor }}primary={text} />
            </ListItem>
          ))}
        </List>   
      </Drawer>  
   )
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.authenticated,
  }
}

export default compose (
    connect(mapStateToProps),
    withStyles(styles)
  ) (SideMenu);