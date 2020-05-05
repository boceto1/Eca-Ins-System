import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from '../LoginPage/'

function App() {
  return (
    <Router>
        <Switch>
        <Route path="/login" component={LoginPage}/>
        <Route path="/">
            <About />
        </Route>
        </Switch>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}


export default React.memo(App);