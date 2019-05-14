import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import AssignmentIcon from '@material-ui/icons/Assignment';

const StudentSubmittedAssignments = (props) => {

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
          {props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                  <IconButton aria-label="View" onClick={() => props.viewCallback(row.id) } >
                    <AssignmentIcon style={{ fontSize: 32 }}/>
                  </IconButton>   
                </TableCell>
                <TableCell style={smallColumnStyle}>{row.submit_date}</TableCell>
                <TableCell style={mediumColumnStyle}>{row.class.name}</TableCell>
                <TableCell style={largeColumnStyle}>{row.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default StudentSubmittedAssignments;

