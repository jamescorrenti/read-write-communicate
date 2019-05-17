import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

import App from './components/App';

const store = createStore(
    rootReducer,
    // {   //initial state
    //     user: { authenticated: localStorage.getItem('token')}
    // },   
    {},   
    applyMiddleware(reduxThunk)
);

ReactDOM.render(
    <Provider store={store} >
        <App />  
    </Provider>,
    document.getElementById('root')
)
