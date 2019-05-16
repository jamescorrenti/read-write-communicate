import React from 'react';
import { Route, Switch } from 'react-router-dom';

import StudentAssignmentsIndex from './studentAssignments/StudentAssignmentsIndex';
import StudentAssignmentsOpen from './studentAssignments/StudentAssignmentsOpen';
import StudentAssignmentView from './studentAssignments/StudentAssignmentView';
import StudentAssignmentEdit from './studentAssignments/StudentAssignmentEdit';

import AssignmentsIndex from './assignments/AssignmentsIndex';
import StudentsIndex from './students/StudentsIndex';
import ClassesIndex from './classes/ClassesIndex';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landingpage';

export default function getRoutes () {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />

            <Route exact path="/dashboard" component={Dashboard} />

            <Route exact path="/studentassignments/open" component={StudentAssignmentsOpen} />
            <Route exact path="/studentassignments" component={StudentAssignmentsIndex} />
            <Route path="/studentassignments/:id/edit" component={StudentAssignmentEdit} />            
            <Route path="/studentassignments/:id" component={StudentAssignmentView} />

            <Route exact path="/classes" component={ClassesIndex} />

            <Route exact path="/assignments" component={AssignmentsIndex} />   

            <Route exact path="/students" component={StudentsIndex} />  
        </Switch>
    )
}