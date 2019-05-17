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

import { getSchoolStudents } from '../actions/student';
import { addClass } from '../actions/cls';

class ClsNew extends Component {

    state = {
        name:'',
        roster:[]
    }

    componentDidMount() {
        this.props.getSchoolStudents();
    }  

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    handleRosterChange = (event,checked) => {
        let studentId = event.target.value;
        let idx = this.state.roster.indexOf(studentId);
        let workRoster = this.state.roster;
        if (checked && idx===-1) {
            workRoster.push(studentId)
            this.setState({roster: workRoster})
        }
        else if (!checked && idx!==-1) {
            workRoster.splice(idx,1)
            this.setState({roster:workRoster})
        }
    }

    onSubmit = () => { this.props.addClass(this.state,()=>this.props.history.goBack())}

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
                    Add Class
                </Typography>
                <TextField
                    id="name"
                    label="Class Title"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    required
                    fullWidth
                />
                <Paper></Paper>
                <FormControl component="fieldset" >
                    <FormLabel component="legend">Roster</FormLabel>
                    <FormGroup>
                        {this.props.students.map(row =>
                            <FormControlLabel
                                key={row.id}
                                control={
                                    <Checkbox onChange={this.handleRosterChange} value={row.id.toString()} />
                                }
                                label={row.name}
                            />
                        )}
                    </FormGroup>
                </FormControl>
                <Paper></Paper>
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
    students: state.student.students,
  }
}
export default withRouter(
  connect(
      mapStateToProps,
      {getSchoolStudents, addClass}
  )
  (ClsNew)
)
