const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    screenName: '',
    role: '',
    userId: 0,
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("User Reducer",action.type, action.token);
    switch (action.type) { 
        case "LOGIN_USER":
            return {...state, errorMessage: '', 
                authenticated: action.token, userId: action.id, screenName: action.name, role: 'student'}
        case "LOGOUT_USER":
                return {...state, errorMessage: '', 
                    authenticated: '', userId: 0, screenName: '', type: ''}
        default:
            return state;
    }
}