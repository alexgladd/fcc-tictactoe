import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { gamePlayers } from '../constants';
import './GameOver.css';

const GameOver = (props) => {
  let winner = "It's a draw!";

  if (props.winner === gamePlayers.player) {
    winner = "You're the winner!";
  } else if (props.winner === gamePlayers.computer) {
    winner = "The computer is the winner!";
  }

  return (
    <div className="GameOver">
      <h3>{winner}</h3>
      <Button text="New game" onClick={props.onReset} />
    </div>
  );
};

GameOver.propTypes = {
  winner: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired
};

export default GameOver;
