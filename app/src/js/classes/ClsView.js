import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { getClass } from '../actions/cls';

class ClsView extends Component {

  componentDidMount() {
    this.props.getClass(this.props.classId)
  }
  render () {
    if (this.props.cls === null) 
    return (
      <Paper >
        <Typography component="p">
          Retrieving class...
        </Typography>
      </Paper>
    );
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
    return (
        <React.Fragment>
            <Paper>
                <Typography variant='h5' component='h6'>
                    {this.props.cls.name}
                </Typography>
            </Paper>
            <Paper >
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell style={largeColumnStyle}>Student</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {this.props.cls.roster.map(row => {
                    return (
                        <TableRow key={row.id}>
                            <TableCell style={largeColumnStyle} component="th" scope="row">
                                <Link component={RouterLink} to={{pathname: `/studentassignments`, state:{ studentId: row.id }}} >
                                    {row.name}
                                </Link>    
                            </TableCell>
                        </TableRow>
                    );
                })}
                </TableBody>
            </Table>        
            </Paper>
        </React.Fragment>  


    );
  } 
}
const mapStateToProps = state => {
  return {
    cls: state.classes.cls,
  }
}

export default connect(
  mapStateToProps,
  { getClass }
)(ClsView)

