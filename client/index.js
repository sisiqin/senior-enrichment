import ReactDOM from 'react-dom';
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import  Main from './components/main';
import { Provider } from 'react-redux';
import store from './store';



ReactDOM.render(
    <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>,
 document.getElementById('app'));
