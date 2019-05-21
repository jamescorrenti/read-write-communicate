import axios from 'axios';

const API_VERSION='/api/v1'

export const loginUser = (credentials,successCallback,errorCallback) => async (dispatch) => {
    console.log('login user start')
    try {
        const request = {'username': credentials.username, 'password': credentials.password};  
        console.log('go to post')
        const res = await axios.post(
                `${API_VERSION}/login`, 
                JSON.stringify(request),
                { headers: {
                    'Content-Type': 'application/json',
                }});
        console.log('back from post')
        localStorage.setItem('access_token', res.data.access_token);  
        localStorage.setItem('refresh_token', res.data.refresh_token);
        console.log('go to get profile')
        const res2 = await axios.get(
            `${API_VERSION}/user/${res.data.id}`,
            {
                headers: {
                  'Authorization': 'Bearer ' + res.data.access_token,
                  'Content-Type': 'application/json'
                }
            });       
            // To Do: adjust res2.data to profile fields that front end wants.
            console.log("login id",res.data.id,res2.data.id)            
            dispatch({ type:'LOGIN_USER', 
                        authenticated: res.data.access_token,
                        profile: res2.data
            });
        successCallback();
    }
    catch (e) {
        errorCallback(`Login Error: ${e}`)
    }
};

export const logoutUser = (id,callback) => async (dispatch) => {
    try {
        const token = localStorage.getItem('access_token');        
        const res = await axios.post(
                `${API_VERSION}/logout/access`,
                {id:id},
                { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,       
                }}
        );      
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');                
        dispatch({type: 'LOGOUT_USER'});
        callback();
    }
    catch (e) {
        console.log(`Logout Error: ${e}`)
    }
};

export const updateUserProfile = (id,profile) => async (dispatch) => {
    try {
        const request = {...profile};  
        const token = localStorage.getItem('access_token');        
        const res = await axios.post(
                `${API_VERSION}/user/${id}`, 
                JSON.stringify(request),
                { headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,       
        }});      
        dispatch({ type:'USER_PROFILE', payload: profile });
    }
    catch (e) {
        console.log(`Update Profile Error: ${e}`)
    }
};
