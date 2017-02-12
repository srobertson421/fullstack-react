import Phaser from 'phaser';
import chickenSprite from '../assets/chicken_walk.png';

class LoadState extends Phaser.State {
  init() {}

  preload() {
    this.game.load.spritesheet('chicken', chickenSprite, 32, 32);
  }

  create() {
    this.state.start('menuState');
  }
}

export default LoadState;
