import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// ToDo: re-use content component"
const styles = theme => ({
  content: {
    marginTop: '20px',
    backgroundColor: '#3B4B63',
    height: '80vh',
    boxShadow: '0 0 5px 5px #3B4B63',           
  },
  landingPageSection: {
      width: "50%",
  },
  landingPageTitle: {
    color: '#FFFFFF',
    fontFamily: "'Shadows Into Light Two', cursive",
    fontSize: '48px',
    marginBottom: 0,
    marginTop: 0,
  },
  landingPageText: {
    color: '#FFFFFF',
    fontFamily: "courier",
    paddingLeft: '4em',
    fontSize: '16px'
  },  
  landingPageHeader: {
    color: '#FFFFFF',
    fontFamily: "'Shadows Into Light Two', cursive",
    fontSize: '32px',
    marginBottom: '0.5em'
  }      
});

class LandingPage extends Component {

  render() {
    const { classes } = this.props;
       
    if (this.props.userLoggedIn)
      return ( 
        <Redirect to={{pathname: `/dashboard`}} /> 
    )

    return (
        <Grid container spacing={40}    
            alignItems="center" direction="column" justify="center"
            className={classes.content}
          >
          <Grid item  className={classes.landingPageSection}>
            <Typography variant='h1' className={classes.landingPageTitle} align="center">
              Read Write Communicate
            </Typography>
          </Grid>

          <Grid item className={classes.landingPageSection}>
            <Typography variant='h2' className={classes.landingPageHeader}>          
              Teachers
            </Typography>
            <Typography component='p' className={classes.landingPageText}>
              Get real time data to help improve student's writing instantly!<br/>
              Track progress of individual students and classes!
            </Typography>
          </Grid>

          <Grid item className={classes.landingPageSection}>       
            <Typography variant='h2' className={classes.landingPageHeader}>          
              Students
            </Typography>
            <Typography component='p' className={classes.landingPageText}>
              Get instant feedback on your writing!<br/>
              Track your assignments and your progress!
            </Typography> 
          </Grid> 
        </Grid>
    )      
  }
}


const mapStateToProps = state => {
  return {
    userLoggedIn: state.user.authenticated
  }
}
export default compose (
  connect(mapStateToProps),
  withStyles(styles)
) (LandingPage);

