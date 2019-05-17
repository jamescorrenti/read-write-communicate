import { handleAPIErrors } from './handleAPIErrors';

export function getSchoolStudents() {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"SET_STUDENTS", payload: [
             {id:0, name:"Joe"},
             {id:1, name:"Kimo"}
        ]});
       
    };
}
