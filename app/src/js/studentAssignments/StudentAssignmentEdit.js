import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignmentHeader from './AssignmentHeader'
import AssignmentWork from './AssignmentWork'
import { updateStudentAssignment, submitStudentAssignment } from '../actions/studentAssignment'
import { getStudentAssignment } from "../actions/studentAssignment";

class StudentAssignmentEdit extends Component {

  componentDidMount() {
    let assignmentId = this.props.match.params.id;        
    console.log("Student Assignment Edit for id",assignmentId);
    this.props.getStudentAssignment(assignmentId);
  }
 
  onEditCancel = () => { console.log("edit cancel") }
  onEditSave = (assignment) => {
    this.props.updateStudentAssignment(this.props.assignment.id,assignment);
  } 
  onEditSubmit = (assignment) => {
  //  this.props.submitStudentAssignment(this.props.assignment.id,assignment, go to view this assignment);
  console.log("edit submit"); 
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
            title={this.props.assignment.name}
            class={this.props.assignment.class.name} 
            instructions={this.props.assignment.instructions}
          />
          <AssignmentWork 
            question={this.props.assignment.questions[0].q}
            answer={this.props.assignment.questions[0].answer}
            cancel={this.onEditCancel}
            submit={this.onEditSubmit}
            save={this.onEditSave}
          />
        </React.Fragment>      
    )      
  }
}

const mapStateToProps = state => {
  return {
    assignment: state.studentAssignment.assignment,
  }
}
export default 
  withRouter
  (connect(
    mapStateToProps,
    {getStudentAssignment, updateStudentAssignment, submitStudentAssignment}
  ))
  (StudentAssignmentEdit)
