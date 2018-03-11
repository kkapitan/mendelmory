import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import GameBoard from "./components/gameBoard";
import { periodicTable } from "./model/periodicTable";
import { allElements } from "./model/allElements";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard periodicTable={periodicTable} allElements={allElements} />
      </div>
    );
  }
}

export default App;
