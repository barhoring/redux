import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import AddPlayerForm from "../components/AddPlayerForm";
import Player from "../components/Player";
import Header from "../components/Header";

class Scoreboard extends Component {
  static propTypes = {
    players: PropTypes.array.isRequired
  };

  render() {
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
}

const mapStateToProps = state => {
  {
    player: state;
  }
};

export default connect(mapStateToProps(Scoreboard));
