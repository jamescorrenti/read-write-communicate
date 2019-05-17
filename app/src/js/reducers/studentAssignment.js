const INITIAL_STATE = {
    openAssignments: [],
    submittedAssignments: [],
    assignment: null
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("StudentAssignment Reducer",action.type);
    switch (action.type) { 
        case "STUDENT_OPEN_ASSIGNMENTS":
            return {...state, openAssignments: action.payload}
        case "STUDENT_SUBMITTED_ASSIGNMENTS":
            return {...state, submittedAssignments: action.payload}
        case "STUDENT_ASSIGNMENT":
        console.log("student assignment reducer setting assignment")
            return {...state, assignment: action.payload}
        case "UPDATE_STUDENT_ASSIGNMENT":   
            return {...state, assignment: {...state.assignment, answer:action.payload}    }         
        default:
            return state;
    }
}