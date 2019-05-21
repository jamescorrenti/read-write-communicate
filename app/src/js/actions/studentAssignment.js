import { handleAPIErrors } from './handleAPIErrors';
import axios from 'axios';
const API_VERSION='/api/v1'
export function getOpenAssignments() {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"STUDENT_OPEN_ASSIGNMENTS", payload: [
            { id: 0, due_date: '1/2/19', status: "draft", title: "First", class: {name: "Math"} },
            { id: 1, due_date: '2/2/19', status: "draft", title: "Second", class: {name: "Social Studies"} },
            { id: 3, due_date: '3/2/19', status: "", title: "Third", class: {name: "Language Arts"}},
        ]});
       
    };
}

export const getSubmittedAssignments = (id) => async (dispatch) => {
    try {         
        const res = await axios.get(
                `${API_VERSION}/student/${id}/assignments/submitted`, 
                {id:id},
                { headers: {
                    'Content-Type': 'application/json',                  
                }});
        console.log('get assignments',res)
        // Fake code for not using backend 
        dispatch({type:"STUDENT_SUBMITTED_ASSIGNMENTS", payload: [
            { id: 0, submit_date: '1/2/18', name: 'Assignment 1', class: {name: "Social Studies"}},
            { id: 1, submit_date: '2/2/18', name: 'Assignment 2', class: {name: "Language Arts"}},
            { id: 3, submit_date: '3/2/18', name: 'Assignment 3', class: {name: "Math"}},
        ]});
    }
    catch (e) {
        console.log(`Get Submitted Assignments for student ${id} Error: ${e}`)
    }
}

export function getStudentAssignment(id) {
    console.log("action get student assignment", id);
    return (dispatch) => {
        // Fake code for not using backend 
        dispatch({
            type: "STUDENT_ASSIGNMENT", payload: {
                id: 42,
                name: 'Assignment 1', instructions: "don't cheat",
                class: { name: "Social Studies" },
                questions: [{ q: 'Is President Trump a good president?', answer: 'Let me think about it' }]
            },
        });
    };
}

// ToDo: Really don't need redux here - just want to tell backend to do its thing and report any errors
export function updateStudentAssignment(id,newWork) {
    return (dispatch) => {
        console.log("Updating student assignment id",id,' new writing',newWork)
        dispatch({type:"UPDATE_STUDENT_ASSIGNMENT", payload: {
            answer: newWork
        }});  
    };
}

export function submitStudentAssignment(id,newWork,cb) {
    return (dispatch) => {
        console.log("Submit student assignment id",id,' new writing',newWork)
        cb();
    };
}

