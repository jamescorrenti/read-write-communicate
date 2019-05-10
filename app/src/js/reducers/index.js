import { combineReducers } from 'redux';

import user from './user';
import student from './student';

const rootReducer = combineReducers({
     user: user,
     student: student
});

export default rootReducer