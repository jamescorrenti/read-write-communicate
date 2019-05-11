import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignmentHeader from '../Assignments/AssignmentHeader'
import AssignmentWork from '../Assignments/AssignmentWork'
import { getStudentAssignment } from '../actions/student'

class AssignmentEdit extends Component {

  componentDidMount() {
    this.props.getStudentAssignment(this.props.id)
  }
 
  render() {

       if (this.props.assignment === null) 
        return (
          <Paper >
            <Typography component="p">
              Retrieving assignment...
            </Typography>
          </Paper>
        );

       return (
        <React.Fragment>
          <AssignmentHeader 
            title={this.props.assignment.assignment.name}
            class={this.props.assignment.assignment.class.name} 
            instructions={this.props.assignment.assignment.instructions}
          />
          <AssignmentWork question={this.props.assignment.assignment.questions[0].q}/>
        </React.Fragment>      
    )      
  }
}
/*

*/
const mapStateToProps = state => {
  return {
    assignment: state.student.assignment,
  }
}

export default connect(
  mapStateToProps,
  {getStudentAssignment}
)(AssignmentEdit)