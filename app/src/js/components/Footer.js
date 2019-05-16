import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withTheme } from '@material-ui/core/styles';
const Footer = (props) => {
    // ToDo: better styling and move this code...
    const footerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: '0',
        width: '100%',
        padding: '5px',
        zIndex: 1201, //theme.zIndex.drawer + 1,
        backgroundColor: '#FFFFFF'
     };
     const textStyle = {
        fontSize: '14px',
        fontFamily:  'Roboto'
     };
console.log('footer',props.theme.palette)
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

export default withTheme()(Footer);