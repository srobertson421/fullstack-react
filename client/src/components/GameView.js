import React, { Component } from 'react';

import Game from '../game';

class GameView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: []
    }
  }

  componentDidMount() {
    this.game = new Game('game');
  }

  render() {
    return (
      <div id="game"></div>
    );
  }
}

export default GameView;
