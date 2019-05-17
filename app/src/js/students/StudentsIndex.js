import React from 'react'

import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
const StudentsIndex = (props) => {
  
  return(
    <Typography component="p" >
        Students (for a teacher) Index placeholder
    </Typography>  
  )
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(StudentsIndex);


