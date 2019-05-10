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
        // ToDo: this is wrong
        <Redirect to={{pathname: `/users/${this.props.userId}`  }} /> 
    )            
    else return (
      <main className={classes.content}>
      <div className={classes.toolbar} />
  <Typography paragraph>Landing Page - Placeholder</Typography>
</main>
    )      
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.isLoggedIn,
    userId: state.user.userId
  }
}

export default compose (
  connect(mapStateToProps),
  withStyles(styles)
) (LandingPage);
