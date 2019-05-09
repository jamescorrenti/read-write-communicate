import * as Cookies from 'js-cookie'
function handleAPIErrors(res) {
    // this is needed to catch 404, 500 errors, etc.
    if (!res.ok) {
        console.log("API errors",res)
        throw Error(res.statusText);
    }
    return res;   
}

export function loginUser(credentials,callback) {
    return (dispatch) => {
    //    const request = {"user": {"userid": credentials.userid, "password": credentials.password}}
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify(request),
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        // };
        // let auth;
        // fetch("/login", options)
        //     .then(res => handleAPIErrors(res))        
        //     .then(res => {
        //         auth = res.headers.get('authorization');          
        //         return res.json()            
        //     })
        //     .then (res =>{
        //         localStorage.setItem("token", auth);                   
        //         dispatch({type:"LOGIN_USER", token:auth, id: res.id, screenName: res.screen_name });
        //         callback();
        //     })
        //     .catch(function(error) {
        //         console.log("Login Error",error);
        //     });    
        localStorage.setItem("token","rwc-test") 
        dispatch({type:"LOGIN_USER", token:"rwc-test", role:'student', id: 99, screenName: "Joe" });
        callback('student',99);  /* user id */        
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
        localStorage.removeItem('token'); 
        dispatch({type: "LOGOUT_USER"}); 
        callback();    
    }
}    

