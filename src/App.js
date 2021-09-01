import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import Dashboard from "./components/Dashboard.js"
import Login from "./components/Login.js"
import Signup from "./components/Signup.js"


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/home">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/new-trip">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/future-visits">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/will-visit-again">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/settings">
            <Dashboard></Dashboard>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
