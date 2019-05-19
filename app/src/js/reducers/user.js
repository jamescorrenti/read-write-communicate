const INITIAL_STATE = {
    authenticated: '',
    errorMessage: '',
    name: '',
    username: '',
    email: '',
    avatar: '',
    role: '',
    id: 0,
}
export default function (
    state = INITIAL_STATE,
    action
){
   console.log("User Reducer",action.type);
    switch (action.type) { 
        case "LOGIN_USER":
            return {...state, errorMessage:'', ...action}
        case "LOGOUT_USER":
            return {...state, errorMessage: '', 
                    authenticated: '', id: 0, name: '', role: '', avatar: ''}
        case 'SET_USER':
            return {...state, user: action.payload }     
        default:
            return state;
    }
}