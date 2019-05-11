const INITIAL_STATE = {
    openAssignments: [],
    submittedAssignments: [],
    assignment: null
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("Student Reducer",action.type);
    switch (action.type) { 
        case "STUDENT_OPEN_ASSIGNMENTS":
            return {...state, openAssignments: action.payload}
        case "STUDENT_SUBMITTED_ASSIGNMENTS":
            return {...state, submittedAssignments: action.payload}
        case "STUDENT_ASSIGNMENT":
            return {...state, assignment: action.payload}
        default:
            return state;
    }
}