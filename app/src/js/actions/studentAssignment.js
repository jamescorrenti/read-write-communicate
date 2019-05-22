
import axios from 'axios';
const API_VERSION='/api/v1'

// export const getOpenAssignments = (id) => async (dispatch) => {
//     try {         
//         const res = await axios.get(
//                 `${API_VERSION}/student/${id}/assignments/todo`, 
//                 {id:id},
//                 { headers: {
//                     'Content-Type': 'application/json',                  
//                 }});
//         console.log('get todo assignments',res.data);
//         dispatch({type:"STUDENT_OPEN_ASSIGNMENTS", payload: res.data});        
//     }
//     catch (e) {
//         console.log(`Get Open Assignments for student ${id} Error: ${e}`)
//     }
//         // Fake code for not using backend 
//         // dispatch({type:"STUDENT_OPEN_ASSIGNMENTS", payload: [
//         //     "0": {
//         //         "assignment_id": 74,
//         //         "class": "Biology",
//         //         "due_date": "02-16-2019T00:00:00+00:00",
//         //         "name": "Author wide answer property step key. Surface job western.\nThere character should chair course image mouth. Close talk glass class. Decide must theory again development gun."
//         //     },         
//         //     { assignment_id: 0, due_date: '2019-06-22T00:00:00+00:00', status: "draft", title: "First", class: "Math" },
//         //     { assignment_id: 1, due_date: '2019-06-23T00:00:00+00:00', status: "draft", title: "Second", class: "Social Studies" },
//         //     { assignment_id: 3, due_date: '2019-06-24T00:00:00+00:00', status: "", title: "Third", class: "Language Arts"},
//         // ]});    
// }

// export const getSubmittedAssignments = (id) => async (dispatch) => {
//     try {         
//         const res = await axios.get(
//                 `${API_VERSION}/student/${id}/assignments/submitted`, 
//                 {id:id},
//                 { headers: {
//                     'Content-Type': 'application/json',                  
//                 }});
//         console.log('get assignments',res.data)   
//         dispatch({type:"STUDENT_SUBMITTED_ASSIGNMENTS", payload: res.data});  
//     }
//     catch (e) {
//         console.log(`Get Submitted Assignments for student ${id} Error: ${e}`)
//     }
//     // Fake code for not using backend 
//     // dispatch({type:"STUDENT_SUBMITTED_ASSIGNMENTS", payload: [
//     //     { id: 0, submit_date: '2019-05-17T00:00:00+00:00', name: '22', class: {name: "Social Studies"}, ease: 51, grade:12},
//     //     { id: 1, submit_date: '2019-05-18T00:00:00+00:00', name: 'Assignment 2', class: {name: "Language Arts"}},
//     //     { id: 3, submit_date: '2019-05-17T00:00:00+00:00', name: 'Assignment 3', class: {name: "Math"}},
//     // ]});    
// }

export const getStudentAssignment = (id,assignmentId) => async (dispatch) => {
    try {         
        const res = await axios.get(
                `${API_VERSION}/student/${id}/assignments/${assignmentId}`, 
                {id:id},
                { headers: {
                    'Content-Type': 'application/json',                  
                }});
        console.log('get assignment',res)
        dispatch({type:"STUDENT_ASSIGNMENT", payload: res.data});  
    }
    catch (e) {
        console.log(`Get Submitted Assignments for student ${id} Error: ${e}`)
    }
    // console.log("action get student assignment", id);
    // return (dispatch) => {
    //     // Fake code for not using backend 
    //     dispatch({
    //         type: "STUDENT_ASSIGNMENT", payload: {
                // class: "Biology",
                // teacher: "Joshua Anderson",
                // due_date: "02-16-2019T00:00:00+00:00",
                // id: 74,
                // instructions: "Try operation young reveal tough better cold not. Actually able arrive western.\nMinute identify kid foreign.\nRoad material because. Reason reach first but. Board occur best contain.",
                // question: "Pretty all size by decade third pressure.",
                // answer: null,
                // submitted: false,
                // fk_ease: 70.6333117563898,
                // fk_grade: 21.253687298391434       
     //         },
    //     });
    // };
}

// ToDo: Really don't need redux here - just want to tell backend to do its thing and report any errors
export function updateStudentAssignment(id,newWork) {
    return (dispatch) => {
        console.log("Updating student assignment id",id,' new writing',newWork)
        dispatch({type:"UPDATE_STUDENT_ASSIGNMENT", payload: {
            answer: newWork
        }});  
    };
}

export function submitStudentAssignment(id,newWork,cb) {
    return (dispatch) => {
        console.log("Submit student assignment id",id,' new writing',newWork)
        cb();
    };
}

