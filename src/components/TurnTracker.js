import React from 'react';
import PropTypes from 'prop-types';
import { gamePlayers } from '../constants';
import './TurnTracker.css';

const TurnTracker = (props) => {
  let label = "";
  if (props.turn === gamePlayers.player) {
    label = "It's your turn!";
  } else {
    label = "Waiting for computer's turn...";
  }

  return (
    <div className="TurnTracker">
      <h3>{label}</h3>
    </div>
  );
};

TurnTracker.propTypes = {
  turn: PropTypes.string.isRequired
};

export default TurnTracker;
