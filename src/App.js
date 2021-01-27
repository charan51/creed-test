import React from 'react';
import './App.css';
import Login from './login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: ''
    }
  }
  render() {
    return (
      <Router>
        <div className="App">
         
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
