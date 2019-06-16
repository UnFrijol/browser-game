class MenuScene extends Phaser.Scene {
    constructor() {
        super('gameMenu');
    }

    preload() {
        this.load.image('backgroundMenu', 'assets/images/background_menu.png');
        this.load.image('title', 'assets/images/title.png');

        this.load.audio('backgroundMenuMusic', 'assets/audio/background_menu.mp3');

        // necessary files for the bitmap, which enables us to use the font
        this.load.bitmapFont('pixelFont', 'assets/font/font.png', 'assets/font/font.xml');
    }

    create() {
        // images
        this.add.image(0, 0, 'backgroundMenu').setOrigin(0, 0);
        this.add.image(config.width / 2, config.height * 0.2, 'title').setScale(.5);
        
        // audio
        this.sound.pauseOnBlur = false;
        this.backgroundMusic = this.sound.add('backgroundMenuMusic');
        this.backgroundMusic.play({ loop: true });

        // text
        this.targetLabel = this.add.bitmapText(10, 175, 'pixelFont', 'Pilot the ship with the arrow keys', 16);
        this.targetLabel = this.add.bitmapText(10, 190, 'pixelFont', 'Shoot with spacebar', 16);
        this.targetLabel = this.add.bitmapText(60, 250, 'pixelFont', 'Press any key to start', 16);

        // interaction
        this.input.once('pointerdown', () => {
            this.backgroundMusic.pause();
            this.scene.start('bootGame');
        });
        
        this.input.keyboard.on('keydown', () => {
            this.backgroundMusic.pause();
            this.scene.start('bootGame');
        });
    }
}