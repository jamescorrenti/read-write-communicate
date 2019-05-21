import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

import App from './components/App';

const store = createStore(
    rootReducer,
    {   //initial state --- ToDo: cannot just rely on the token, need to keep the id somewhere too...
        // user: { authenticated: localStorage.getItem('access_token')}
    },   
    // {},   
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store} >
        <App />  
    </Provider>,
    document.getElementById('root')
)
