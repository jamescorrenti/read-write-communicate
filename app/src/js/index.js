import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './containers/App';
import rootReducer from './reducers';
import LandingPage from './containers/LandingPage'
import StudentView from './containers/StudentView'

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
        <BrowserRouter>
            <App>
                <Route exact path="/" component={LandingPage} />
                <Route path="/students/:id" component={StudentView} />          
            </App>
        </BrowserRouter>
    </Provider>,
  document.getElementById('content')
)
