import { handleAPIErrors } from './handleAPIErrors';

export function loginUser(credentials,callback) {
    return (dispatch) => {
       const request = {'username': credentials.username, 'password': credentials.password};
console.log('login user request body',JSON.stringify(request))
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
              //  auth = res.headers.get('authorization');          
                return res.json()            
            })
            .then (res =>{
                localStorage.setItem('access_token', res.access_token);  
                localStorage.setItem('refresh_token', res.refresh_token);                  
                console.log('login response',res)                
                dispatch({ type:'LOGIN_USER', 
                        accessToken: res.access_token, 
                        // following hardcoded temporarily
                        id: 1, screenName: 'JoeStudent', role:'student' });
                callback();
            })
            .catch(function(error) {
                console.log('Login Error',error);
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

