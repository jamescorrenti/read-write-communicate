import { combineReducers } from 'redux';

import user from './user';
import studentAssignment from './studentAssignment';
import cls from './cls';
import assignment from './assignment';
import student from './student';

const rootReducer = combineReducers({
     user: user,
     studentAssignment: studentAssignment,
     classes: cls,
     assignment: assignment,
     student: student
});

export default rootReducer