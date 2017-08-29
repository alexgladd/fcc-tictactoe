import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import MarkChooser from './components/MarkChooser';
import TurnTracker from './components/TurnTracker';
import { gameStates, MARK_X, MARK_O } from './constants';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: gameStates.newGame
    };

    this.handlePlayerMarkChosen = this.handlePlayerMarkChosen.bind(this);
    this.handleTurnStart = this.handleTurnStart.bind(this);
    this.handleGameOver = this.handleGameOver.bind(this);
  }

  handlePlayerMarkChosen(playerMark) {
    this.setState({
      gameState: gameStates.setup,
      playerMark: playerMark
    });
  }

  handleTurnStart(currentTurn) {
    this.setState({
      gameState: gameStates.playing,
      currentTurn
    });
  }

  handleGameOver(winner) {
    console.log("Game over! (" + winner + " won)");
  }

  get controlsComponent() {
    switch (this.state.gameState) {
      case gameStates.newGame:
      case gameStates.setup:
        return <MarkChooser onChosen={this.handlePlayerMarkChosen} />;
      case gameStates.playing:
        return <TurnTracker turn={this.state.currentTurn} />;
      case gameStates.gameOver:
        return <div>Game Over!</div>;
      default:
        return null;
    }
  }

  get boardComponent() {
    switch (this.state.gameState) {
      case gameStates.newGame:
        return <GameBoard />;
      case gameStates.setup:
      case gameStates.playing:
        const compMark = (this.state.playerMark === MARK_X) ? MARK_O : MARK_X;
        return <GameBoard playerMark={this.state.playerMark}
          computerMark={compMark} onTurnStart={this.handleTurnStart}
          onWin={this.handleGameOver} />;
      default:
        return null;
    }
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="Header">
          <h1>Tic Tac Toe!</h1>
        </div>
        {this.controlsComponent}
        {this.boardComponent}
        <div className="Footer">
          Footer placeholder
        </div>
      </div>
    );
  }
}

export default App;
