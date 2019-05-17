const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    screenName: '',
    role: '',
    id: 0,
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("User Reducer",action.type, action.token);
    switch (action.type) { 
        case "LOGIN_USER":
            return {...state, errorMessage: '', 
                authenticated: action.token, id: action.id, screenName: action.name, role: action.role}
        case "LOGOUT_USER":
                return {...state, errorMessage: '', 
                    authenticated: '', id: 0, screenName: '', type: ''}
        default:
            return state;
    }
}