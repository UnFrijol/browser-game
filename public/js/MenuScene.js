class MenuScene extends Phaser.Scene {
    constructor() {
        super('gameMenu');
    }

    preload() {
        this.load.image('backgroundMenu', 'assets/images/background_menu.png');
        this.load.image('title', 'assets/images/title.png');

        this.load.audio('backgroundMenuMusic', 'assets/audio/background_menu.mp3');
    }

    create() {
        this.add.image(0, 0, 'backgroundMenu').setOrigin(0, 0);
        this.add.image(config.width / 2, config.height * 0.2, 'title').setScale(.5);
        
        this.sound.pauseOnBlur = false;
        this.backgroundMusic = this.sound.add('backgroundMenuMusic');
        this.backgroundMusic.play({ loop: true });

        this.input.once('pointerdown', () => {
            this.backgroundMusic.pause();
            this.scene.start('bootGame');
        });
        /*
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.scene.start('bootGame');
        }
        */
    }
}