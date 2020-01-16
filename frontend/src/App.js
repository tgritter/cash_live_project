import React from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login'
import Todo from './components/Todo'

export default function App() {
  return (
    <Router>
      <Switch>  
        <Route exact path='/' component={Login} />
        <Route path='/todo' component={Todo} />
      </Switch>
    </Router>
  );
}
