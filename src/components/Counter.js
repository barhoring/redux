import React, { PropTypes } from "react";

const Counter = props => {
  return (
    <div className="counter">
      <button
        className="counter-action decrement"
        onClick={() => props.onChange(-1)}
      >
        -
      </button>
      <div className="counter-score"> {props.score} </div>
      <button
        className="counter-action increment"
        onClick={() => props.onChange(1)}
      >
        +
      </button>
    </div>
  );
};

Counter.propTypes = {
  onChange: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired
};

export default Counter;
