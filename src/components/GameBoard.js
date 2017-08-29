import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import { gamePlayers } from '../constants';
import './GameBoard.css';

class GameBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      tiles: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.playing && nextProps.playerMark && nextProps.computerMark
      && nextProps.onTurnStart && nextProps.onWin) {
      // start playing
      const goesFirst = (Math.random() < 0.5) ? gamePlayers.player : gamePlayers.computer;

      nextProps.onTurnStart(goesFirst);

      this.setState({
        playing: true,
        currentTurn: goesFirst,
        playerMark: nextProps.playerMark,
        computerMark: nextProps.computerMark
      });
    }
  }

  handleTileClick(tileIdx) {
    console.log("GameBoard got clicked tile event with index " + tileIdx);
  }

  renderTile(tile, idx) {
    const tKey = "tile_" + idx;

    if (this.state.playing && (this.state.currentTurn === gamePlayers.player)) {
      return <Tile tileIdx={idx} clickable={true} onClick={this.handleTileClick} key={tKey} />;
    } else {
      return <Tile tileIdx={idx} clickable={false} key={tKey} />;
    }
  }

  render () {
    const tiles = this.state.tiles.map((tile, idx) => {
      return this.renderTile(tile, idx);
    });

    return (
      <div className="GameBoard">
        {tiles}
      </div>
    );
  }
}

GameBoard.propTypes = {
  playerMark: PropTypes.string,
  computerMark: PropTypes.string,
  onTurnStart: PropTypes.func,
  onWin: PropTypes.func
};

export default GameBoard;
