import Phaser from 'phaser';

class Player extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    this.game = game;
    this.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this);
  }
}

export default Player;
