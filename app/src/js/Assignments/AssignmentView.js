import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignmentHeader from './AssignmentHeader'
import { getStudentAssignment } from '../actions/student'

class AssignmentView extends Component {

  componentDidMount() {
    this.props.getStudentAssignment(this.props.id)
  }
 
  render() {
    const customPaperStyle = {
      marginTop: "1em",
      padding: "1em"
  }
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
          <Paper style={customPaperStyle}>
            <Typography variant="h6" component="h6" >
                {this.props.assignment.assignment.questions[0].q}
            </Typography>
            <Typography component="p" gutterBottom>
                {this.props.assignment.assignment.questions[0].answer}
            </Typography>            
          </Paper>
          <Paper style={customPaperStyle}>
            <Typography component="p" gutterBottom>
                Placeholder for feedback....
            </Typography>            
          </Paper>
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
  {getStudentAssignment }
)(AssignmentView)