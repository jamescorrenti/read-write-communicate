import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Footer = (props) => {
    // ToDo: better styling and move this code...
    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '5px'
     };
     const textStyle = {
        fontSize: "14px",
     };

    return (
        <div style={footerStyle}>
            <Typography variant="display3" style={textStyle}>
               Read Write Communicate
            </Typography> 
            <Typography  variant="display3" style={textStyle}>
                Copyright 2019-2019
            </Typography>
            <Link href={"mailto: readwritecommunicate2018@gmail.com"} style={textStyle} >
                Email Us
            </Link>

        </div>
    )
}

export default Footer;