import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { getCurrentClasses } from '../actions/cls';
import { addAssignment } from '../actions/assignment';

class AssignmentNew extends Component {

    state = {
        teacherId:this.props.location.state,
        name:'',
        instructions:'',
        dueDate: '',
        assignedClasses:[]
    }

    componentDidMount() {
        this.props.getCurrentClasses(this.state.teacherId);
    }  

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleClassesChange = (event,checked) => {
        let classId = event.target.value;
        let idx = this.state.assignedClasses.indexOf(classId);
        let workClasses = this.state.assignedClasses;

        if (checked && idx===-1) {
            workClasses.push(classId)
            this.setState({assignedClasses: workClasses})
        }
        else if (!checked && idx!==-1) {
            workClasses.splice(idx,1)
            this.setState({assignedClasses:workClasses})
        }
    }

    onSubmit = () => { this.props.addAssignment(this.state,()=>this.props.history.goBack())}

    onCancel = () => { this.props.history.goBack() }

    render() {
        const customPaperStyle = {
            marginTop: "1em",
            padding: "1em"
        }  
        const accentColor = {
            backgroundColor: '#DF7214'
        }               
        return (
            <Paper style={customPaperStyle}>
                <Typography variant="h6" component="h6" gutterBottom >
                    Add Assignment
                </Typography>
                <TextField
                    id="name"
                    label="Assignment Title"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                />
                <TextField
                    id="instructions"
                    label="Instructions"
                    value={this.state.instructions}
                    onChange={this.handleChange('instructions')}
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                />                
                <FormControl component="fieldset" >
                    <FormLabel component="legend">Assign to Classes</FormLabel>
                    <FormGroup>
                        {this.props.classes.map(row =>
                            <FormControlLabel
                                key={row.id}
                                control={
                                    <Checkbox onChange={this.handleClassesChange} value={row.id.toString()} />
                                }
                                label={row.name}
                            />
                        )}
                    </FormGroup>
                </FormControl>
                <Grid container justify='flex-end' spacing={16} >
                    <Button variant="contained" color="primary" 
                            onClick={this.onSubmit}>
                        Save
                    </Button>
                    <Button variant="contained" style={accentColor} 
                            onClick={this.onCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Paper>
        )      
    }
}


const mapStateToProps = state => {
  return {
    classes: state.classes.index,
  }
}
export default withRouter(
  connect(
      mapStateToProps,
      {getCurrentClasses, addAssignment}
  )
  (AssignmentNew)
)
