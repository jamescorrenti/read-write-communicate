import React, { Component } from 'react';
import { connect } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AssignmentHeader from './AssignmentHeader'
import { getStudentAssignment } from "../actions/studentAssignment";

class StudentAssignmentView extends Component {

    componentDidMount() {
      let studentId = this.props.match.params.id; 
      let assignmentId = this.props.match.params.assignment_id; 
      this.props.getStudentAssignment(studentId, assignmentId)
    }

    render () {
        const customPaperStyle = {
            marginTop: "1em",
            padding: "1em"
        }
        if (this.props.assignment === null) 
            return (
                <Typography component="p">
                    Retrieving assignment...
                </Typography>
            );
          
        return (
            <React.Fragment>
                <AssignmentHeader 
                    title={this.props.assignment.name}
                    class={this.props.assignment.class} 
                    teacher={this.props.assignment.teacher} 
                    instructions={this.props.assignment.instructions}
                />
                <Paper style={customPaperStyle}>
                    <Typography variant="h6" component="h6" >
                        {this.props.assignment.question}
                    </Typography>
                    <Typography component="p" gutterBottom>
                        {this.props.assignment.question.answer}
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

const mapStateToProps = state => {
  return {
    assignment: state.studentAssignment.assignment,
  }
}

export default connect(mapStateToProps,{getStudentAssignment })(StudentAssignmentView);

