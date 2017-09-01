import React from 'react';
import PropTypes from 'prop-types';
import './Tile.css';

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // console.log("Tile " + this.props.tileIdx + " clicked");
    this.props.onClick(this.props.tileIdx);
  }

  render() {
    let classes = "Tile";

    if (!this.props.mark && this.props.clickable) {
      classes += " Tile-Clickable"
      return <div className={classes} onClick={this.handleClick}></div>;
    } else {
      return <div className={classes}>{this.props.mark}</div>;
    }
  }
}

Tile.propTypes = {
  tileIdx: PropTypes.number.isRequired,
  clickable: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  mark: PropTypes.string
};

export default Tile;
