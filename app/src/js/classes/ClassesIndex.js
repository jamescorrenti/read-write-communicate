import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';

import * as TableStyles from '../styles/tableStyles';

import { getCurrentClasses } from '../actions/cls';

class ClassesIndex extends Component {
  state = {

  }

  componentDidMount() {
    let teacherId = this.props.location.state;
    this.props.getCurrentClasses(teacherId);
    console.log("Classes Index for teacher",teacherId);
  }

  render () {   
    return (
      <Paper >

        <Grid container justify='space-between' > 
          <Typography variant="h4" component="h5">
            Current Classes
          </Typography>
          <Button variant="contained" color="primary" component={RouterLink} to="/classes/new" >
            Add Class
            <AddIcon style={TableStyles.actionIcon}/>
          </Button>                 
        </Grid>

        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={TableStyles.iconColumn} ></TableCell>
              <TableCell style={TableStyles.largeColumn}>Name</TableCell>
              <TableCell style={TableStyles.iconColumn} ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.classes.map(row => 
              <TableRow key={row.id}>
                <TableCell align="center" style={TableStyles.iconColumn} component="th" scope="row">
                  <Link component={RouterLink} to={{pathname: `/classes/${row.id}`, state:{ teacherId: this.state.teacherId }}} >
                    <PeopleIcon style={TableStyles.actionIcon}/>
                  </Link>                    
                </TableCell>
                <TableCell style={TableStyles.largeColumn}>
                  {row.name}
                </TableCell>
                <TableCell align="center" style={TableStyles.iconColumn} component="th" scope="row">
                  <IconButton aria-label="Edit" onClick={() => this.props.editCallback(row.id) } >
                    <EditIcon style={TableStyles.actionIcon}/>
                  </IconButton> 
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    classes: state.classes.index,
  }
}

export default connect(
  mapStateToProps,
  { getCurrentClasses }
)(ClassesIndex)

