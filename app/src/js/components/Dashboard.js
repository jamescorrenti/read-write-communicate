import React, { Component } from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';


class Dashboard extends Component {

  render() {
    console.log('dashboard')
     return (

        <Typography component='p'>Dashboard Placeholder</Typography>

    )      
  }
}


const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(Dashboard);

