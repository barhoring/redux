import React, { PropTypes } from "react";
import Stats from "./Stats";
import Stopwatch from "./Stopwatch";
// Move to components/Header.js
// ----------------------------------------------
const Header = props => {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
};

Header.propTypes = {
  players: PropTypes.array.isRequired
};

export default Header;
