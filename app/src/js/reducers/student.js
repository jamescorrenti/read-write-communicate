const INITIAL_STATE = {
    students: [],
}
export default function (
    state = INITIAL_STATE,
    action
){
  // console.log("Student Reducer",action.type);
    switch (action.type) { 
        case "SET_STUDENTS":
            return {...state, students: action.payload}    
        default:
            return state;
    }
}
