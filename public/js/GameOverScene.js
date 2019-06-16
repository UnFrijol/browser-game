class GameOverScene extends Phaser.Scene {
    constructor() {
        super('gameOver');
    }

    preload() {
        this.load.image('gameOver', 'assets/images/game_over.png');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);
        
        this.add.image(0, 0, 'gameOver').setOrigin(0, 0).setScale(.65);
        this.finalScore = this.add.text(config.width / 2 - 80, 175, `FINAL SCORE ${gameSettings.score}`, { font: '16px Verdana', fill: 'yellow' });
        this.restart = this.add.text(40, 220, `PRESS R TO RESTART`, { font: '16px Verdana', fill: 'yellow' });
    
        this.input.keyboard.on('keydown-R', () => {
            gameSettings.playerHealth = 4;
            gameSettings.killCount = 0;
            gameSettings.score = 0;
            gameSettings.endlessMode = false;

            this.scene.start('gameItself');
        });
    }
}