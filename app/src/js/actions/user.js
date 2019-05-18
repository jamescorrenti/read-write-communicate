import { handleAPIErrors } from './handleAPIErrors';

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
        fetch('/api/v1/login', options)
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
        // const token = localStorage.getItem("token");
        // const options = {
        //     method: 'DELETE',
        //     headers: new Headers({
        //         'Authorization': `${token}`, 
        //         'Content-Type': 'application/json'
        //     })
        // };           
        // fetch("/logout", options)
        //     .then(res => handleAPIErrors(res))         
        //     .then(res => {
        //         localStorage.removeItem('token');
        //         dispatch({type: "LOGOUT_USER"});
        //         callback();
        // }).catch(function(error) {
        //     console.log(error);     
        // })  
        // fake code for no backend
        localStorage.removeItem('token'); 
        dispatch({type: "LOGOUT_USER"}); 
        callback();    
    }
}    

