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
  /*           <TableCell style={iconColumnStyle} align="center"><EditIcon style={{ fontSize: 42 }} /></TableCell>
  */
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
          {props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell align="center" style={iconColumnStyle} component="th" scope="row">
                  <IconButton aria-label="Edit" onClick={() => props.editCallback(row.id) } >
                    <EditIcon style={{ fontSize: 32 }}/>
                  </IconButton>   
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

export default StudentOpenAssignments;

