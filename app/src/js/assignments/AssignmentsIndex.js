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
import AssignmentIcon from '@material-ui/icons/Assignment';

import { getAssignments } from '../actions/assignment';

class AssignmentIndex extends Component {

  state = {
    teacherId: this.props.location.state
  }
  componentDidMount() { 
    this.props.getAssignments(this.state.teacherId)
  }

  render() {
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
            <TableCell style={iconColumnStyle}></TableCell>
            <TableCell style={smallColumnStyle}>Date</TableCell>
            <TableCell style={mediumColumnStyle}>Class</TableCell>
            <TableCell style={largeColumnStyle}>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
 
                </TableCell>
                <TableCell style={smallColumnStyle}>{row.due_date}</TableCell>
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
      assignments: state.assignment.assignments
  }
}    
export default 
  connect(mapStateToProps,{getAssignments})
  (AssignmentIndex);

/*
                  <Link component={RouterLink} to={{pathname: `/assignments/${row.id}`, state:{ teacherId: this.state.teacherId }}} >
                    <AssignmentIcon style={{ fontSize: 32 }}/>
                  </Link>   
                  */

