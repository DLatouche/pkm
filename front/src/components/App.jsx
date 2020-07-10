import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import LogIn from './login/LogIn';
import SignIn from './signin/SignIn'
import User from './user/User';
import PrivateRoute from '../utility/privateRoute/PrivateRoute'
import Box from './user/box/Box';

export default function App() {

  return (
    <Router>
      <Route exact path="/" component={LogIn}>
      </Route>
      <Route path="/signin" component={SignIn}>
      </Route>
      <PrivateRoute path="/trainer" component={User} />
      <PrivateRoute path="/box/:id" component={Box} />
    </Router>
  );
}