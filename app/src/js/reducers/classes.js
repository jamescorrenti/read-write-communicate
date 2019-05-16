const INITIAL_STATE = {
    index: [],
    cls: null
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("Classes Reducer",action.type);
    switch (action.type) { 
        case "CLASSES_INDEX":
            return {...state, index: action.payload}   
        case "SET_CLASS":
            return {...state, cls: action.payload}       
        default:
            return state;
    }
}