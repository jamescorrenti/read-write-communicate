import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const AssignmentWork = (props) => {
    // ToDo: move this styling
    const customPaperStyle = {
        marginTop: "1em",
        padding: "1em"
    }
    return (
        <Paper style={customPaperStyle}>
            <Typography variant="h6" component="h6" gutterBottom >
               {props.question}
            </Typography>
            <Typography component="p" >
               PlaceHolder: text area (with current answer {props.answer}), buttons for cancel, save and submit
            </Typography>
        </Paper>
    )
}

export default AssignmentWork;

