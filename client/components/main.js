'use strict'
import React, { Component } from 'react';
import Navbar from'./Navbar';
import CampusList from './CampusList';
import CampusStudents from './CampusStudents';
import store from '../store';
import { Provider } from 'react-redux'
import { fetchCampuses, fetchStudents } from '../store';
import { Route, Switch } from 'react-router-dom';



export default class Main extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    const studentsThunk = fetchStudents();
    store.dispatch(studentsThunk);
  }

  render () {
    return (
    
        <div>
          <Navbar />
          <Switch>
          <Route exact path='/campuses' component={CampusList} /> 
          <Route path='/campuses/:campusId' component={CampusStudents} />
          </Switch>
        </div>

    )
  }
}