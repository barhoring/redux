import React from "react";
import Stopwatch from "../components/Stopwatch";
import Stats from "../components/Stats";
import Counter from "../components/Counter";

const INITIAL_STATE = {
  players: [
    {
      name: "Jim Hoskins",
      score: 31
    },
    {
      name: "Andrew Chalkley",
      score: 20
    },
    {
      name: "Alena Holligan",
      score: 50
    }
  ]
};

const Scoreboard = React.createClass({
  getInitialState: function() {
    return INITIAL_STATE;
  },
  onScoreChange: function(index, delta) {
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onAddPlayer: function(name) {
    this.state.players.push({ name: name, score: 0 });
    this.setState(this.state);
  },

  onRemovePlayer: function(index) {
    this.state.players.splice(index, 1);
    this.setState(this.state);
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header players={this.state.players} />
        <div className="players">
          {this.state.players.map(
            function(player, index) {
              return (
                <Player
                  name={player.name}
                  score={player.score}
                  key={player.name}
                  onScoreChange={delta => this.onScoreChange(index, delta)}
                  onRemove={() => this.onRemovePlayer(index)}
                />
              );
            }.bind(this)
          )}
        </div>
        <AddPlayerForm onAdd={this.onAddPlayer} />
      </div>
    );
  }
});

// Move to components/Header.js
// ----------------------------------------------
function Header(props) {
  return (
    <div className="header">
      <Stats players={props.players} />
      <h1>Scoreboard</h1>
      <Stopwatch />
    </div>
  );
}

Header.propTypes = {
  players: React.PropTypes.array.isRequired
};

// Move to components/Player.js
// ----------------------------------------------------------------------
function Player(props) {
  return (
    <div className="player">
      <div className="player-name">
        <a className="remove-player" onClick={props.onRemove}>
          ✖
        </a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter onChange={props.onScoreChange} score={props.score} />
      </div>
    </div>
  );
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onScoreChange: React.PropTypes.func.isRequired
};

const AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return { name: "" };
  },

  onNameChange: function(e) {
    const name = e.target.value;
    this.setState({ name: name });
  },

  onSubmit: function(e) {
    if (e) e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({ name: "" });
  },

  render: function() {
    return (
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.name}
            onChange={this.onNameChange}
            placeholder="Player Name"
          />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  }
});

export default Scoreboard;
