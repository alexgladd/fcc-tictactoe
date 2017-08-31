import React from 'react';
import GameBoard from './GameBoard';
import MarkChooser from './MarkChooser';
import TurnTracker from './TurnTracker';
import { gameStates, gamePlayers, MARK_X, MARK_O } from '../constants';
import './Game.css';

import Minimax from 'tic-tac-toe-minimax';
const { ComputerMove, GameStep } = Minimax;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: gameStates.newGame,
      difficulty: "Normal",
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };

    this.handlePlayerMarkChosen = this.handlePlayerMarkChosen.bind(this);
    this.handleTurnStart = this.handleTurnStart.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
  }

  handlePlayerMarkChosen(playerMark) {
    // start playing
    const compMark = (playerMark === MARK_X) ? MARK_O : MARK_X;
    const goesFirst = (Math.random() < 0.5) ? gamePlayers.player : gamePlayers.computer;

    this.setState({
      gameState: gameStates.playing,
      currentTurn: goesFirst,
      playerMark: playerMark,
      computerMark: compMark,
      symbols: {
        huPlayer: playerMark,
        aiPlayer: compMark
      }
    });
  }

  handleTurnStart(currentTurn) {
    this.setState({
      gameState: gameStates.playing,
      currentTurn
    });
  }

  handleTileClick(tileIdx) {
    console.log("Game got clicked tile event with index " + tileIdx);

    let newBoard = this.state.board.slice();
    newBoard[tileIdx] = this.state.playerMark;

    // check for win condition
    const result = GameStep(newBoard, this.state.symbols,
      this.state.difficulty);

    if (result.winner) {
      this.setState({
        gameState: gameStates.gameOver,
        winner: result.winner,
        board: newBoard,
        currentTurn: gamePlayers.computer
      });
    } else {
      this.setState({
        board: newBoard,
        currentTurn: gamePlayers.computer
      });
    }
  }

  get controlsComponent() {
    switch (this.state.gameState) {
      case gameStates.newGame:
        return <MarkChooser onChosen={this.handlePlayerMarkChosen} />;
      case gameStates.playing:
        return <TurnTracker turn={this.state.currentTurn} />;
      case gameStates.gameOver:
        console.log(this.state);
        return <div>Game Over!</div>;
      default:
        return null;
    }
  }

  get boardComponent() {
    switch (this.state.gameState) {
      case gameStates.newGame:
      case gameStates.gameOver:
        return <GameBoard tiles={this.state.board}/>;
      case gameStates.playing:
        if (this.state.currentTurn === gamePlayers.player) {
          return <GameBoard tiles={this.state.board} onTileClick={this.handleTileClick} />;
        } else {
          return <GameBoard tiles={this.state.board} />;
        }
      default:
        return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Game did update");
    if (this.state.gameState === gameStates.playing &&
        this.state.currentTurn === gamePlayers.computer) {
      console.log("Game starting computer move");
      // set timeout for computer move
      setTimeout(() => {
        // apply minimax game step
        const moveIdx = ComputerMove(this.state.board, this.state.symbols,
          this.state.difficulty);
        const result = GameStep(this.state.board, this.state.symbols,
          this.state.difficulty);

        if (result.winner) {
          this.setState({
            gameState: gameStates.gameOver,
            winner: result.winner,
            board: result.board,
            currentTurn: gamePlayers.player
          });
        } else {
          this.setState({
            board: result.board,
            currentTurn: gamePlayers.player
          });
        }

      }, 2000);
    }
  }

  render () {
    return (
      <div className="Game">
        {this.controlsComponent}
        {this.boardComponent}
      </div>
    );
  }
}

export default Game;
