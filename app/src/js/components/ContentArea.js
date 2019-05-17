import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

// ToDo: move this styling code
const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },  
    toolbar: theme.mixins.toolbar,
});

const ContentArea = (props) => {
    const { classes, children } = props; 
    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}
        </main>
    )      
  }

export default withStyles(styles)(ContentArea);
