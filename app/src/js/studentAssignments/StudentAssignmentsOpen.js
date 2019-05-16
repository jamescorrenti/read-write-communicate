import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';

import { getOpenAssignments } from '../actions/studentAssignment';

class StudentAssignmentsOpen extends Component {

  state = {
    studentId: this.props.location.state
  }  
  componentDidMount() {
    this.props.getOpenAssignments(this.state.studentId)
  }

  render() {
    if (this.props.assignments === null) {
      return (
        <Typography component='p'>
          Retrieving Assignments...
        </Typography>
      )
    }

    const iconColumnStyle = {
      width: "5%",
    };
    const smallColumnStyle = {
      width: "12%",
    };
    const mediumColumnStyle = {
      wordWrap: "break-word",
      width: "20%",
    };
    const largeColumnStyle = {
      wordWrap: "break-word",
      width: "51%",
    };
    //ToDo: sort initially so in date order
    // ToDo: Support sorting date, class, etc.
  
    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={iconColumnStyle} ></TableCell>
            <TableCell style={smallColumnStyle}>Date</TableCell>
            <TableCell style={smallColumnStyle}>Status</TableCell>
            <TableCell style={mediumColumnStyle}>Class</TableCell>
            <TableCell style={largeColumnStyle}>Title</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                <Link component={RouterLink} to={{pathname: `/studentassignments/${row.id}/edit`, state:{ studentId: this.state.studentId }}} >
                    <EditIcon style={{ fontSize: 32 }}/>
                  </Link>    
                </TableCell>
                <TableCell style={smallColumnStyle}>{row.due_date}</TableCell>
                <TableCell style={smallColumnStyle}>{row.status}</TableCell>
                <TableCell style={mediumColumnStyle}>{row.class.name}</TableCell>
                <TableCell style={largeColumnStyle}>{row.title}</TableCell>
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

