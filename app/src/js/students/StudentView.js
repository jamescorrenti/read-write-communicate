import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideMenu from '../components/SideMenu';
import StudentOpenAssignments from './StudentOpenAssignments'
import StudentSubmittedAssignments from './StudentSubmittedAssignments'
import ContentArea from '../components/ContentArea'
import AssignmentEdit from '../Assignments/AssignmentEdit'
import AssignmentView from '../Assignments/AssignmentView'
import { getOpenAssignments, getSubmittedAssignments } from '../actions/student'

class StudentView extends Component {
  // ToDo: a little cryptic.  options array is for menu.  selected index is 
  // options + edit (and maybe other things)
  state = {
    options: [ 'Current Assignments', 'Submitted Assignments' ],
    selectedIndex: 0,
    assignmentId: -1
  }

  componentDidMount() {
    // ToDo: here or in child components?  redux action needed?  how to handle updates
    this.props.getOpenAssignments()
    this.props.getSubmittedAssignments()
  }

  handleSelection = (index) => { this.setState({selectedIndex: index}); 
  };

  handleEdit = (index) => { this.setState({selectedIndex:2, assignmentId:index})}
  handleView = (index) => { this.setState({selectedIndex:3, assignmentId:index})}
  getContentArea() {
    switch (this.state.selectedIndex) {
      // ToDo: Do we really need 2 different components?
      case 0: return <StudentOpenAssignments assignments={this.props.openAssignments} editCallback={this.handleEdit}/>
      case 1: return <StudentSubmittedAssignments assignments={this.props.submittedAssignments}  viewCallback={this.handleView}/>
      case 2: return <AssignmentEdit id={this.state.assignmentId} />
      case 3: return <AssignmentView id={this.state.assignmentId} />
    }
  }
  render() {
       return (
        <React.Fragment>
          <SideMenu menuOptions={this.state.options} callback={this.handleSelection} />
          <ContentArea type={ this.getContentArea()} />
        </React.Fragment>
    )      
  }
}

const mapStateToProps = state => {
  return {
    openAssignments: state.student.openAssignments,
    submittedAssignments: state.student.submittedAssignments
  }
}

export default connect(
  mapStateToProps,
  {getOpenAssignments,getSubmittedAssignments}
)(StudentView)