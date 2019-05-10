import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';

const StudentOpenAssignments = (props) => {

  const iconColumnStyle = {
    width: "5%",
  };
  const smallColumnStyle = {
    width: "10%",
  };
  const mediumColumnStyle = {
    wordWrap: "break-word",
    width: "15%",
  };
  //ToDo: sort initially so in date order
  // ToDo: Support sorting date, class, etc.
    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={iconColumnStyle} align="center"><EditIcon style={{ fontSize: 42 }} /></TableCell>
            <TableCell style={smallColumnStyle}>Due Date</TableCell>
            <TableCell style={smallColumnStyle}>Status</TableCell>
            <TableCell style={mediumColumnStyle}>Title</TableCell>
            <TableCell align='left'>Instructions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                  <IconButton aria-label="Edit" onClick={() => props.editCallback(row.id) } >
                    <EditIcon style={{ fontSize: 42 }}/>
                  </IconButton>   
                </TableCell>
                <TableCell style={smallColumnStyle}>{row.due_date}</TableCell>
                <TableCell  style={smallColumnStyle}>{row.status}</TableCell>
                <TableCell  style={mediumColumnStyle}>{row.title}</TableCell>
                <TableCell align='left'>{row.instructions}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default StudentOpenAssignments;

