import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
class AssignmentWork extends Component { 

    state = {
        value: this.props.answer ?
            RichTextEditor.createValueFromString(this.props.answer, 'markdown') :
            RichTextEditor.createEmptyValue(),
        changesSinceSave: false
    }

    onChange = (value) => {
        this.setState({value: value, changesSinceSave: true});
      };

      // ToDo: cancel redirect back to open assignments
    onCancel = () => { console.log('cancel'); }
    onSubmit = () => { console.log('submit') }
    onSave = () => { 
        console.log('save')
        this.setState({ changesSinceSave: false})
     }

    render() {
        console.log("assignment work render")
        // ToDo: move this styling
        const customPaperStyle = {
            marginTop: "1em",
            padding: "1em"
        }
// To Do:
// - Save button -add disable keywoard when there are no new changes
// - Submit - if <1 length, disable.  Add confirmation
        return (
            <Paper style={customPaperStyle}>
                <Typography variant="h6" component="h6" gutterBottom >
                {this.props.question}
                </Typography>
                <RichTextEditor
                    editorState={this.state.value} 
                    value={this.state.value}
                    onChange={this.onChange}
                />
                <Button variant="contained" color="default" 
                        onClick={this.onSave} disabled={!this.state.changesSinceSave}>
                        Save Draft
                </Button>
                <Button variant="contained" color="primary" 
                        onClick={this.onSubmit} >
                        Submit
                </Button>
                <Button variant="contained" color="secondary" onClick={this.onCancel}>Cancel</Button>
            </Paper>
        )
       }    
}

export default AssignmentWork;

