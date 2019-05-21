const INITIAL_STATE = {
    assignments: [],
}
export default function (
    state = INITIAL_STATE,
    action
){
  // console.log("Assignment Reducer",action.type);
    switch (action.type) { 
        case "SET_ASSIGNMENTS":
            return {...state, assignments: action.payload}    
        default:
            return state;
    }
}