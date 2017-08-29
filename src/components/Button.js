import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = (props) => {
  return (
    <button className="Button" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Button;
