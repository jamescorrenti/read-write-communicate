import { combineReducers } from 'redux';

import user from './user';
import studentAssignment from './studentAssignment';
import classes from './classes';

const rootReducer = combineReducers({
     user: user,
     studentAssignment: studentAssignment,
     // classes: classes
});

export default rootReducer