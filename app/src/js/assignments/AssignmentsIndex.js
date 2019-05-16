import React from 'react'

import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
const AssignmentsIndex = (props) => {
  
  return(
    <Typography component="p" >
        Assignments Index placeholder
    </Typography>  
  )
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(AssignmentsIndex);


