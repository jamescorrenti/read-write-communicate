import { handleAPIErrors } from './handleAPIErrors';

export function getCurrentClasses(teacherId) {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"CLASSES_INDEX", payload: [
            { id: 100, name: "US History" },
            { id: 101, name: "Biology"} ,
            { id: 102, name: "Creative Writing"},
        ]});
       
    };
}

export function getClass(classId) {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"SET_CLASS", payload: 
            { id: 100, name: "US History", roster:[ {id:0, name:"Joe"}, {id:1, name:"Kimo"}] },
        });
       
    };
}

export function addClass(cls,cb) {
    return (dispatch) => {
    
// Fake code for not using backend 
        // dispatch({type:"SET_CLASS", payload: 
        //     { id: 100, name: "US History", roster:[ {id:0, name:"Joe"}, {id:1, name:"Kimo"}] },
        // });
       cb();
    };
}