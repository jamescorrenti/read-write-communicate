import React, {Component} from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';

import SuperTable from '../components/SuperTable';
import { API_VERSION } from '../rwcConstants';

class StudentAssignmentsOpen extends Component {

  state = {
    studentId: this.props.match.params.id,
    assignments: []
  }  

  componentDidMount() {
    try {
      axios.get( `${API_VERSION}/student/${this.state.studentId}/assignments/todo`, 
                {id:this.state.studentId},
                { headers: {
                    'Content-Type': 'application/json',                  
                }}).then((response)=>{
                  this.setState(()=>{
                    return {
                      assignments: response.data
                    }
                  })
                })
    }
    catch (e) {
      console.log(`Get ToDo Assignments for student ${this.state.studentId} Error: ${e}`)
    }
  }

  render() {
    let columns = [
      { label: '', style:'iconColumn', icon:'EditIcon'},    
      { label: 'Due Date', style:'smallColumn'},
      { label: 'Classx', style:'mediumColumn'},
      { label: 'Title', style:'largeColumn'}
    ];

    let data = this.state.assignments.map ((assn,index) => {
      return { id: assn.id, 
               date: new Date(assn.assignment.due_date).toLocaleDateString(), 
               class: assn.assignment._class.name ,
               title: assn.assignment.name }             
    });

    return (
      <Paper >
        <SuperTable columns={columns} data={data} />
      </Paper>
    );
  }
}

export default StudentAssignmentsOpen;
