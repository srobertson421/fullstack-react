import Phaser from 'phaser';

class BootState extends Phaser.State {
  init() {}

  preload() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
  }

  create() {
    this.state.start('loadState');
  }
}

export default BootState;
