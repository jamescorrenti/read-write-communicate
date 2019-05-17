import { handleAPIErrors } from './handleAPIErrors';

export function getAssignments(teacherId) {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"SET_ASSIGNMENTS", payload: [
            { id: 40, due_date: '6/2/19', title: "Add", class: {name: "Math Intro"} },
            { id: 41, due_date: '7/2/19', title: "Long Division", class: {name: "Math Intermediate"} },
        ]});
       
    };
}

export function addAssignment(cls,cb) {
    return (dispatch) => {
    
// Fake code for not using backend 
       cb();
    };
}