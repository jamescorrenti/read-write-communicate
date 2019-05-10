import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StudentSubmittedAssignments = (props) => {

  const customColumnStyle = {
    wordWrap: "break-word",
    width: "12%",
  };
  //ToDo: sort initially so in date order
  // ToDo: Support sorting date, class, etc.
    return (
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <TableCell style={customColumnStyle}>Date</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.assignments.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell style={customColumnStyle} component="th" scope="row">
                 {row.submit_date}
                </TableCell>
                <TableCell >{row.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default StudentSubmittedAssignments;

