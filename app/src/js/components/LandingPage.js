import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// ToDo: re-use content component?
const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },  
    toolbar: theme.mixins.toolbar,
});
class LandingPage extends Component {

  render() {
    const { classes } = this.props; 
    if (this.props.userLoggedIn)
      return ( 
        <Redirect to={{pathname: `/${this.props.userRole}s/${this.props.userId}`  }} /> 
    )            
    else return (
      <main className={classes.content}>
  <Typography paragraph>Landing Page - Placeholder</Typography>
</main>
    )      
  }
}


const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.isLoggedIn,
    userId: state.user.userId,
    userRole: state.user.role
  }
}

export default compose (
  connect(mapStateToProps),
  withStyles(styles)
) (LandingPage);
