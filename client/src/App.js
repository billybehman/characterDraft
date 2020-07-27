import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Login from "./pages/login"
import CreateGame from "./pages/createGame"
import Draft from "./pages/draft"
import Game from "./pages/game"
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
    <Router>
      <body id="body">
      <div className="App">
        <h1>
          Character Draft
        </h1>
      </div>
      <Route exact path="/" component={Login} />
      <Route path="/create-game" component={CreateGame} />
      <Route path="/draft" component={Draft} />
      <Route path="/game" component={Game} />
      </body>
    </Router>
  );
}

export default App;
