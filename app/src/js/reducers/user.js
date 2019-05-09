const INITIAL_STATE = {
    authenticated: false,
    errorMessage: '',
    screenName: '',
    role: '',
    userId: 0,
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("User Reducer",action.type, action);
    switch (action.type) { 
        case "LOGIN_USER":
            return {...state, errorMessage: '', 
                authenticated: action.token, userId: action.id, screenName: action.name, role: 'teacher'}
        case "LOGOUT_USER":
                return {...state, errorMessage: '', 
                    authenticated: '', userId: 0, screenName: '', type: ''}
        default:
            return state;
    }
}