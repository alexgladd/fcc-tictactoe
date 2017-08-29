import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import { MARK_X, MARK_O } from '../constants';
import './MarkChooser.css';

class MarkChooser extends React.Component {
  constructor(props) {
    super(props);

    this.handleMarkXChosen = this.handleMarkXChosen.bind(this);
    this.handleMarkOChosen = this.handleMarkOChosen.bind(this);
  }

  handleMarkXChosen() {
    this.props.onChosen(MARK_X);
  }

  handleMarkOChosen() {
    this.props.onChosen(MARK_O);
  }

  render () {
    const btnX = "Play as " + MARK_X;
    const btnO = "Play as " + MARK_O;

    return (
      <div className="MarkChooser">
        <div>
          <h3>New Game!</h3>
        </div>
        <Button text={btnX} onClick={this.handleMarkXChosen} />
        <Button text={btnO} onClick={this.handleMarkOChosen} />
      </div>
    );
  }
}

MarkChooser.propTypes = {
  onChosen: PropTypes.func.isRequired
};

export default MarkChooser;
