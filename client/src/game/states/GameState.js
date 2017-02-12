import Phaser from 'phaser';
import Player from '../entities/Player';

class GameState extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.chicken = new Player({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'chicken'
    });

    this.chicken.animations.add('walkLeft', [4,5,6,7], 10, true);
    this.chicken.animations.add('walkRight', [12,13,14,15], 10, true);
    this.chicken.animations.add('walkUp', [0,1,2,3], 10, true);
    this.chicken.animations.add('walkDown', [8,9,10,11], 10, true);

    this.game.add.existing(this.chicken);

    this.keys = this.game.input.keyboard.createCursorKeys();
  }

  update() {
    this.chicken.body.velocity.setTo(0);

    if(this.keys.left.isDown) {
      this.chicken.body.velocity.x = -150;
      this.chicken.animations.play('walkLeft');
    } else if (this.keys.right.isDown) {
      this.chicken.body.velocity.x = 150;
      this.chicken.animations.play('walkRight');
    } else if(this.keys.up.isDown) {
      this.chicken.body.velocity.y = -150;
      this.chicken.animations.play('walkUp');
    } else if (this.keys.down.isDown) {
      this.chicken.body.velocity.y = 150;
      this.chicken.animations.play('walkDown');
    } else {
      this.chicken.animations.stop();
    }
  }
}

export default GameState;
