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
import AssignmentIcon from '@material-ui/icons/Assignment';

import * as TableStyles from '../styles/tableStyles';

import { getSubmittedAssignments } from '../actions/studentAssignment';

class StudentAssignmentIndex extends Component {

  state = {
    studentId: this.props.match.params.id
  }

  componentDidMount() {
    this.props.getSubmittedAssignments(this.state.studentId)
  }

  render() {

    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={TableStyles.iconColumn}></TableCell>
            <TableCell style={TableStyles.smallColumn}>Date</TableCell>
            <TableCell style={TableStyles.mediumColumn}>Class</TableCell>
            <TableCell style={TableStyles.largeColumn}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={TableStyles.iconColumn} component="th" scope="row">
                  <Link component={RouterLink} 
                        to={{pathname: `/studentassignments/${row.id}`, state:{ studentId: this.state.studentId }}} >
                    <AssignmentIcon style={TableStyles.actionIcon}/>
                  </Link>    
                </TableCell>
                <TableCell style={TableStyles.smallColumn}>{row.submit_date}</TableCell>
                <TableCell style={TableStyles.mediumColumn}>{row.class.name}</TableCell>
                <TableCell style={TableStyles.largeColumn}>{row.name}</TableCell>
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
      assignments: state.studentAssignment.submittedAssignments
  }
}    
export default 
  connect(mapStateToProps,{getSubmittedAssignments})
  (StudentAssignmentIndex);

