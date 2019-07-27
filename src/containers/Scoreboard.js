import React from "react";
import Stopwatch from "../components/Stopwatch";
import Stats from "../components/Stats";
import Counter from "../components/Counter";
import AddPlayerForm from "../components/AddPlayerForm";
import Player from "../components/Player";

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

export default Scoreboard;
