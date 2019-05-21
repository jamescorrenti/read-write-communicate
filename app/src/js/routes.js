import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StudentAssignmentsIndex from './studentAssignments/StudentAssignmentsIndex';
import StudentAssignmentsOpen from './studentAssignments/StudentAssignmentsOpen';
import StudentAssignmentView from './studentAssignments/StudentAssignmentView';
import StudentAssignmentEdit from './studentAssignments/StudentAssignmentEdit';

import AssignmentsIndex from './assignments/AssignmentsIndex';
import AssignmentNew from './assignments/AssignmentNew';

import StudentsIndex from './students/StudentsIndex';

import ClassesIndex from './classes/ClassesIndex';
import ClsView from './classes/ClsView';
import ClsNew from './classes/ClsNew';

import Dashboard from './components/Dashboard';
import LandingPage from './components/Landingpage';

export default function getRoutes () {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />

            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/student/:id/assignments/todo" component={StudentAssignmentsOpen} />
            <Route exact path="/student/:id/assignments/submitted" component={StudentAssignmentsIndex} />
            <Route path="/studentassignments/:id/edit" component={StudentAssignmentEdit} />            
            <Route path="/student/:id/assignments/:assignment_id" component={StudentAssignmentView} />

            <Route exact path="/classes" component={ClassesIndex} />
            <Route exact path="/classes/new" component={ClsNew} />       
            <Route path="/classes/:id" component={ClsView} />

            <Route exact path="/assignments" component={AssignmentsIndex} />   
            <Route exact path="/assignments/new" component={AssignmentNew} /> 

            <Route exact path="/students" component={StudentsIndex} />  
        </Switch>
    )
}