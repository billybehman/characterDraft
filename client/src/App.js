import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/login"
import CreateGame from "./pages/createGame"

function App() {
  return (
    <Router>
        <div className="App">
          <h1>
            Character Draft
          </h1>
        </div>
        <Route exact path="/" component={Login} />
        <Route path="/create-game" component={CreateGame} />
    </Router>
  );
}

export default App;
