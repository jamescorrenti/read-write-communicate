import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const AssignmentHeader = (props) => {
    const customPaperStyle = {
        marginTop: "1em",
        padding: "1em"
    }
    return (
        <Paper style={customPaperStyle}>
            <div>
            <Typography variant="headline" >
                {props.title} 
            </Typography>
            <Typography color="textSecondary" gutterBottom>
                {props.class}
            </Typography>
            <Typography variant="h6" component="h6" >
                Instructions:
            </Typography>
            <Typography component="p" gutterBottom>
                {props.instructions}
            </Typography>
            </div>
        </Paper>
    )
}

export default AssignmentHeader;

