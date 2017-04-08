import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux'
import { Router, Route, browserHistory,IndexRoute } from 'react-router'
import App from './containers/index.jsx'
import store from './configureStore'
import Home from './components/Home.jsx'
import Result from './components/Result.jsx'

render(
  <Provider store = {store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component = {Home}/>
        <Route path = '/results' component = {Result}/>
      </Route>
    </Router>
  </Provider>
  ,document.getElementById('root'));
