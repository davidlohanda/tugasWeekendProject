import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './2.reducers'
import 'semantic-ui-css/semantic.min.css'

const GlobalState=createStore(Reducers,{},applyMiddleware(ReduxThunk))

ReactDOM.render(<Provider store={GlobalState}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
