import React from 'react';
import GameBoard from './GameBoard';
import MarkChooser from './MarkChooser';
import TurnTracker from './TurnTracker';
import GameOver from './GameOver';
import { gameStates, gamePlayers, MARK_X, MARK_O } from '../constants';
import './Game.css';

import Minimax from 'tic-tac-toe-minimax';
const { GameStep } = Minimax;

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: gameStates.newGame,
      difficulty: "Normal",
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };

    this.handlePlayerMarkChosen = this.handlePlayerMarkChosen.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleReset = this.handleReset.bind(this);
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

  handleTileClick(tileIdx) {
    // console.log("Game got clicked tile event with index " + tileIdx);

    let newBoard = this.state.board.slice();
    newBoard[tileIdx] = this.state.playerMark;

    // check for win condition
    const result = GameStep(newBoard, this.state.symbols,
      this.state.difficulty);

    if (result.winner === 'huPlayer' ||
        (result.winner === 'draw' && this.isBoardFull(newBoard))) {
      this.setState({
        gameState: gameStates.gameOver,
        winner: this.getWinner(result.winner),
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

  handleReset() {
    this.setState({
      gameState: gameStates.newGame,
      board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      winner: null,
      currentTurn: null
    });
  }

  isBoardFull(board) {
    let count = board.reduce((acc, val) => {
      if (val === MARK_X || val === MARK_O) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    return count === 9;
  }

  getWinner(winner) {
    if (winner === 'huPlayer') {
      return gamePlayers.player;
    } else if (winner === 'aiPlayer') {
      return gamePlayers.computer;
    } else {
      return winner;
    }
  }

  get controlsComponent() {
    switch (this.state.gameState) {
      case gameStates.newGame:
        return <MarkChooser onChosen={this.handlePlayerMarkChosen} />;
      case gameStates.playing:
        return <TurnTracker turn={this.state.currentTurn} />;
      case gameStates.gameOver:
        return <GameOver winner={this.state.winner} onReset={this.handleReset} />;
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
    // console.log("Game did update");
    // console.log(this.state);
    if (this.state.gameState === gameStates.playing &&
        this.state.currentTurn === gamePlayers.computer) {
      // console.log("Game starting computer move");
      // set timeout for computer move
      setTimeout(() => {
        // apply minimax game step
        const result = GameStep(this.state.board, this.state.symbols,
          this.state.difficulty);

        //console.log(result);

        if (result.winner) {
          this.setState({
            gameState: gameStates.gameOver,
            winner: this.getWinner(result.winner),
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
