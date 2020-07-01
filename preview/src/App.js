import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import View from "./View";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/view/:bugId" component={View} />
        </Router>
      </div>
    );
  }
}
