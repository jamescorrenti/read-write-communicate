import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import StudentDashboard from './StudentDashboard'
import AssignmentsTable from '../containers/AssignmentsTable'
import AssignmentUpload from '../containers/AssignmentUpload'
import ContentArea from '../containers/ContentArea'

class StudentView extends Component {
  state = {
    options: [ 'Dashboard', 'Current Assignments', 'Submitted Assignments' ],
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
