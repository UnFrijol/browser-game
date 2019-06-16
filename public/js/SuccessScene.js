class SuccessScene extends Phaser.Scene {
    constructor() {
        super('success');
    }

    preload() {
        this.load.audio('happyTune', 'assets/audio/happy_tune.mp3');
        this.load.audio('happyNoises', 'assets/audio/happy_noises.mp3');
        this.load.audio('claps', 'assets/audio/claps.mp3');
    }

    create() {
        this.successBackground = this.sound.add('happyTune');
        this.successBackground.play({ loop: true });
        this.sound.play('claps');
        this.sound.play('happyNoises');

        this.add.tileSprite(0, 0, config.width, config.height, 'background').setOrigin(0, 0);
        
        this.add.text(config.width / 2 - 120, 50, `MISSION\nACCOMPLISHED`, { font: '30px Verdana', fill: 'yellow' });
        this.add.text(config.width / 2 - 80, 175, `FINAL SCORE ${gameSettings.score}`, { font: '16px Verdana', fill: 'yellow' });
        this.restart = this.add.text(25, 220, `PRESS R TO KEEP GOING`, { font: '16px Verdana', fill: 'yellow' });
        
        this.input.keyboard.on('keydown-R', () => {
            this.successBackground.pause();
            gameSettings.endlessMode = true;
            this.scene.start('gameItself');
        });
    }
}