import 'pixi'
import 'p2'
import Phaser from 'phaser';

import BootState from './states/BootState';
import LoadState from './states/LoadState';
import MenuState from './states/MenuState';

class Game extends Phaser.Game {
  constructor(elemId) {
    let width = 800;
    let height = 600;

    super(width, height, Phaser.AUTO, elemId='');

    this.state.add('bootState', BootState);
    this.state.add('loadState', LoadState);
    this.state.add('menuState', MenuState);

    this.state.start('bootState');
  }
}

export default Game;
