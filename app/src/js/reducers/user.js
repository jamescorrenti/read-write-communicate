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
            // profile from action contains backend db names.  Making them friendly here...
            let profile = { id:action.profile.id, name: action.profile.name, username: action.profile.username, 
                        email: action.profile.email, avatar: action.profile.avatar_hash,
                        role: action.profile.type }
            return {...state, errorMessage:'', 
                authenticated: action.authenticated, 
                ...profile }  
        case "LOGOUT_USER":
            return {...state, errorMessage: '', 
                    authenticated: '', id: 0, name: '', role: '', avatar: ''}
        default:
            return state;
    }
}