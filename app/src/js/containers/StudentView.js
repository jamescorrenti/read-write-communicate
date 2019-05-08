import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import StudentDashboard from './StudentDashboard'
import AssignmentsTable from './AssignmentsTable'
import AssignmentUpload from './AssignmentUpload'
import ContentArea from './ContentArea'

class StudentView extends Component {
  state = {
    options: [ 'Dashboard', 'Assignments', 'Assignment Upload' ],
    selectedIndex: 0
  }

  handleSelection = (index) => { this.setState({selectedIndex: index}); 
  };

  getContentArea() {
    switch (this.state.selectedIndex) {
      case 0: return <StudentDashboard />
      case 1: return <AssignmentsTable />
      case 2: return <AssignmentUpload />
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

export default StudentView;
