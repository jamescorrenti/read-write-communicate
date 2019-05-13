function handleAPIErrors(res) {
    // this is needed to catch 404, 500 errors, etc.
    if (!res.ok) {
        console.log("API errors",res)
        throw Error(res.statusText);
    }
    return res;   
}

export function getOpenAssignments() {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"STUDENT_OPEN_ASSIGNMENTS", payload: [
            { id: 0, due_date: '1/2/19', status: "draft", title: "First", class: {name: "Math"} },
            { id: 1, due_date: '2/2/19', status: "draft", title: "Second", class: {name: "Social Studies"} },
            { id: 3, due_date: '3/2/19', status: "", title: "Third", class: {name: "Language Arts"}},
        ]});
       
    };
}

export function getSubmittedAssignments() {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"STUDENT_SUBMITTED_ASSIGNMENTS", payload: [
            { id: 0, submit_date: '1/2/18', name: 'Assignment 1', class: {name: "Social Studies"}},
            { id: 1, submit_date: '2/2/18', name: 'Assignment 2', class: {name: "Language Arts"}},
            { id: 3, submit_date: '3/2/18', name: 'Assignment 3', class: {name: "Math"}},
        ]});
       
    };
}

export function getStudentAssignment(id) {
    return (dispatch) => {
    
// Fake code for not using backend 
        dispatch({type:"STUDENT_ASSIGNMENT", payload: {
            id: 42, 
            assignment: {
                name: 'Assignment 1', instructions: "don't cheat",
                class: {name: "Social Studies"}, 
                questions: [{q:'Is President Trump a good president?', answer:'Let me think about it'}]
            },
        }});  
    };
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

