import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import './GameBoard.css';

class GameBoard extends React.Component {
  renderTile(tile, idx) {
    const tKey = "tile_" + idx;
    let tMark = "";

    if (typeof tile === "string") {
      tMark = tile;
    }

    if (this.props.onTileClick) {
      return <Tile mark={tMark} tileIdx={idx} clickable={true}
        onClick={this.props.onTileClick} key={tKey} />;
    } else {
      return <Tile mark={tMark} tileIdx={idx} clickable={false} key={tKey} />;
    }
  }

  render () {
    // console.log("GameBoard render");
    const tiles = this.props.tiles.map((tile, idx) => {
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
  tiles: PropTypes.array.isRequired,
  onTileClick: PropTypes.func
};

export default GameBoard;
