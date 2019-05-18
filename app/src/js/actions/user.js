import { handleAPIErrors } from './handleAPIErrors';

const API_VERSION='/api/v1'
export function loginUser(credentials,successCallback,errorCallback) {
    return (dispatch) => {
       const request = {'username': credentials.username, 'password': credentials.password};
       const options = {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
              'Content-Type': 'application/json'
            }
        };
        let auth;
        fetch(`${API_VERSION}/login`, options)
            .then(res => handleAPIErrors(res))        
            .then(res => {   
                return res.json()            
            })
            .then (res =>{
                // ToDo: if already logged in, seems that we get 200 with no token?
                localStorage.setItem('access_token', res.access_token);  
                localStorage.setItem('refresh_token', res.refresh_token);                             
                dispatch({ type:'LOGIN_USER', 
                        accessToken: res.access_token,
                        id: res.id,
                        role: res.type,
                        avatar: res.avatar,
                        screenName: res.username});
                successCallback();
            })
            .catch(function(error) {
                errorCallback(`Login Error: ${error}`);
            });               
    };
}

export function logoutUser(callback) {
    return (dispatch) => {
        const token = localStorage.getItem('access_token');
        const options = {
            method: 'POST',
            headers: new Headers({
                'Authorization': `Bearer ${token}`,  
                'Content-Type': 'application/json'
            })
        };           
        fetch(`${API_VERSION}/logout/access`, options)
            .then(res => handleAPIErrors(res))         
            .then(res => {
                localStorage.removeItem('access_token');
                dispatch({type: 'LOGOUT_USER'});
                callback();
        }).catch(function(error) {
            console.log(error);     
        })  
        //TODO: Logout refresh token
        // // fake code for no backend
        // localStorage.removeItem('token'); 
        // dispatch({type: "LOGOUT_USER"}); 
        // callback();    
    }
}    

