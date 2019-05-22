import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';

import * as TableStyles from '../styles/tableStyles';

import { getOpenAssignments } from '../actions/studentAssignment';

class StudentAssignmentsOpen extends Component {

  state = {
    studentId: this.props.match.params.id
  }  
  componentDidMount() {
        // To Do: no need for redux, just handle it locally in the component
    this.props.getOpenAssignments(this.state.studentId)
  }

  render() {
    //ToDo: sort initially so in date order
    // ToDo: Support sorting date, class, etc.
    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={TableStyles.iconColumn} ></TableCell>
            <TableCell style={TableStyles.smallColumn}>Date</TableCell>
            <TableCell style={TableStyles.smallColumn}>Status</TableCell>
            <TableCell style={TableStyles.mediumColumn}>Class</TableCell>
            <TableCell style={TableStyles.largeColumn}>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.assignments.map(row => {
            return (
              <TableRow key={row.assignment_id}>
                <TableCell align="center" style={TableStyles.iconColumn} component="th" scope="row">
                <Link component={RouterLink} to={{pathname: `/studentassignments/${row.assignment_id}/edit`, state:{ studentId: this.state.studentId }}} >
                    <EditIcon style={TableStyles.actionIcon}/>
                  </Link>    
                </TableCell>
                <TableCell style={TableStyles.smallColumn}>{Date(row.due_date).toLocaleDateString()}</TableCell>
                <TableCell style={TableStyles.smallColumn}>{row.status}</TableCell>
                <TableCell style={TableStyles.mediumColumn}>{row.class}</TableCell>
                <TableCell style={TableStyles.largeColumn}>{row.title}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
      assignments: state.studentAssignment.openAssignments
  }
}    
export default 
  connect(mapStateToProps,{getOpenAssignments})
  (StudentAssignmentsOpen);

