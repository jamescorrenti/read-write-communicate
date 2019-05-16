import React, { Component } from 'react';

import RichTextEditor from 'react-rte';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
   
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

    onSubmit = () => { 
        this.props.submit(this.state.value.toString('html'))
    }
    onSave = () => { 
        console.log('save')
        this.props.save(this.state.value.toString('html'))
        this.setState({ changesSinceSave: false})
     }

    render() {
        // ToDo: move this styling
        const customPaperStyle = {
            marginTop: "1em",
            padding: "1em"
        }
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_DROPDOWN: [
              {label: 'Normal', style: 'unstyled'},
              {label: 'Heading Large', style: 'header-one'},
              {label: 'Heading Medium', style: 'header-two'},
              {label: 'Heading Small', style: 'header-three'}
            ],
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item'},
              {label: 'OL', style: 'ordered-list-item'}
            ]
          };   
          const accentColor = {
              backgroundColor: '#DF7214'
          } 

        return (
            <Paper style={customPaperStyle}>
                <Typography variant="h6" component="h6" gutterBottom >
                {this.props.question}
                </Typography>
                <RichTextEditor
                    toolbarConfig={toolbarConfig}
                    editorState={this.state.value} 
                    value={this.state.value}
                    onChange={this.onChange}
                    editorStyle={{minHeight: '10em'}}
                />
                <Grid container justify='flex-end' spacing={16} >
                    <Button variant="contained" color="default" 
                            onClick={this.onSave} disabled={!this.state.changesSinceSave}>
                        Save Draft
                    </Button>
                    <Button variant="contained" color="primary" 
                            onClick={this.onSubmit}>
                        Submit
                    </Button>
                    <Button variant="contained" style={accentColor} 
                            onClick={this.props.cancel}>
                        Cancel
                    </Button>
                </Grid>
            </Paper>
        )
       }    
}

export default AssignmentWork;

