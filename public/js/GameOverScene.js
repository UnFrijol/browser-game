class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/images/game_over.png');

        this.load.audio('backgroundMusic', 'assets/audio/background_menu.mp3');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);
        this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(.65);
    }
}