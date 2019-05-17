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

import { iconColumnStyle, smallColumnStyle, mediumColumnStyle, largeColumnStyle } 
  from '../styles/tableStyles';

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
            <AddIcon style={{fontSize: 28 }}/>
          </Button>                 
        </Grid>

        <Table >
          <TableHead>
            <TableRow>
              <TableCell style={iconColumnStyle} ></TableCell>
              <TableCell style={largeColumnStyle}>Name</TableCell>
              <TableCell style={iconColumnStyle} ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.classes.map(row => 
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                  <Link component={RouterLink} to={{pathname: `/classes/${row.id}`, state:{ teacherId: this.state.teacherId }}} >
                    <PeopleIcon style={{ fontSize: 28 }}/>
                  </Link>                    
                </TableCell>
                <TableCell style={largeColumnStyle}>
                  {row.name}
                </TableCell>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                  <IconButton aria-label="Edit" onClick={() => this.props.editCallback(row.id) } >
                    <EditIcon style={{ fontSize: 16 }}/>
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

