import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideMenu from '../components/SideMenu';
import ContentArea from '../components/ContentArea'
import Classes from '../classes/ClassesIndex'
import Students from '../students/StudentsIndex'
import Assignments from '../assignments/AssignmentsIndex'

class TeacherView extends Component {
  state = {
    options: [ 'Classes', 'Assignments', 'Students' ],
    selectedIndex: 0,
    assignmentId: -1
  }

  componentDidMount() {
    // ToDo: here or in child components?  redux action needed?  how to handle updates
  }

  handleSelection = (index) => { this.setState({selectedIndex: index}); 
  };

  getContentArea() {
    switch (this.state.selectedIndex) {
      case 0: return <Classes teacherId={this.props.teacherId}/>
      case 1: return <Assignments teacherId={this.props.teacherId} />      
      case 2: return <Students teacherId={this.props.teacherId}/>
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
    teacherId: state.user.id
  }
}

export default connect(
  mapStateToProps
)(TeacherView)