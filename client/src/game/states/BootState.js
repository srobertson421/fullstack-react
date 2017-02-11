import Phaser from 'phaser';

class BootState extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.state.start('loadState');
  }
}

export default BootState;
