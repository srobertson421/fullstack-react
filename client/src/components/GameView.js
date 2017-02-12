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

  componentWillUnmount() {
    this.game.destroy();
    document.getElementById('game').innerHTML = '';
    console.log('Game destroyed and element cleared');
  }
}

export default GameView;
