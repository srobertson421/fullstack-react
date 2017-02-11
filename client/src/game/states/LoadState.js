import Phaser from 'phaser';

class LoadState extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.state.start('menuState');
  }
}

export default LoadState;
