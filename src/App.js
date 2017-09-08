import React, { Component } from 'react';
import Game from './components/Game';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>Tic Tac Toe!</h1>
        </div>
        <Game />
        <div className="Footer">
          <i className="fa fa-github fa-lg"></i> by <a href="https://github.com/alexgladd/fcc-tictactoe">Alex Gladd</a>
        </div>
      </div>
    );
  }
}

export default App;
