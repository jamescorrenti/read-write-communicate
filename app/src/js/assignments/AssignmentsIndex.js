import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import AddIcon from '@material-ui/icons/Add';

import { iconColumnStyle, smallColumnStyle, mediumColumnStyle, largeColumnStyle } 
  from '../styles/tableStyles';

import { getAssignments } from '../actions/assignment';

class AssignmentIndex extends Component {

  state = {
    teacherId: this.props.location.state
  }
  componentDidMount() { 
    this.props.getAssignments(this.state.teacherId)
  }

  render() {
    //ToDo: sort initially so in date order
    // ToDo: Support sorting date, class, etc.
    return (
      <Paper >

        <Grid container justify='space-between' > 
          <Typography variant="h4" component="h5">
            Assignments
          </Typography>
          <Button variant="contained" color="primary" 
                  component={RouterLink} 
                  to={{pathname: "/assignments/new", state:{ teacherId: this.state.teacherId}}}         
                  >
            Add Assignment
            <AddIcon style={{fontSize: 28 }}/>
          </Button>                 
        </Grid>      

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



