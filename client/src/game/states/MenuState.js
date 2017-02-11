import Phaser from 'phaser';

class MenuState extends Phaser.State {
  init() {}

  preload() {}

  create() {
    this.menuText = this.add.text(this.game.world.centerX, this.game.world.centerY, 'MenuState', {fill: 'white', font: 'Arial', fontSize: 30});
    this.menuText.anchor.setTo(0.5);
  }
}

export default MenuState;
