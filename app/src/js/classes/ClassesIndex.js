import React from 'react'

import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
const ClassesIndex = (props) => {
  
  return(
    <Typography component="p" >
        Classes Index placeholder
    </Typography>  
  )
}

const mapStateToProps = state => {
  return {

  }
}

export default connect(mapStateToProps)(ClassesIndex);


