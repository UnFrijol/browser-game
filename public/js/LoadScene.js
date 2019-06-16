class LoadScene extends Phaser.Scene {
    constructor() {
        super('bootGame');
    }

    // executed once: load all assets into the browser's memory
    preload() {
        this.load.image('background', 'assets/images/background.png');
        
        this.load.spritesheet('ship', 'assets/spritesheets/ship.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('ship2', 'assets/spritesheets/ship2.png', {
            frameWidth: 32,
            frameHeight: 16
        });
        this.load.spritesheet('ship3', 'assets/spritesheets/ship3.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet('explosion', 'assets/spritesheets/explosion.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('power-up', 'assets/spritesheets/power-up.png', {
            frameWidth: 16,
            frameHeight: 16
        });
        this.load.spritesheet('player', 'assets/spritesheets/player.png', {
            frameWidth: 16,
            frameHeight: 24
        });
        this.load.spritesheet('beam', 'assets/spritesheets/beam.png', {
            frameWidth: 16,
            frameHeight: 16
        });

        // audio files for the PlayScene
        this.load.audio('backgroundGameMusic', 'assets/audio/background_game.mp3');
        this.load.audio('hurt', 'assets/audio/hurt.mp3');
        this.load.audio('lastHurt', 'assets/audio/last_hurt.mp3');
        this.load.audio('gameOver', 'assets/audio/game_over.mp3');
        this.load.audio('beamShot', 'assets/audio/beam_shot.mp3');
        this.load.audio('ship1Explosion', 'assets/audio/ship1_explosion.mp3');
        this.load.audio('ship2Explosion', 'assets/audio/ship2_explosion.mp3');
        this.load.audio('ship3Explosion', 'assets/audio/ship3_explosion.mp3');
    }

    // executed once: adds anything into the game
    create() {
        this.add.text(20, 20, 'Loading game...');
        this.scene.start('gameItself');

        this.anims.create({
            key: 'ship1_anim',
            frames: this.anims.generateFrameNumbers('ship'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'ship2_anim',
            frames: this.anims.generateFrameNumbers('ship2'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'ship3_anim',
            frames: this.anims.generateFrameNumbers('ship3'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion'),
            frameRate: 20,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: 'red',
            frames: this.anims.generateFrameNumbers('power-up', {
                start: 0,
                end: 1
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'gray',
            frames: this.anims.generateFrameNumbers('power-up', {
                start: 2,
                end: 3
            }),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNumbers('player'),
            frameRate: 20,
            repeat: -1
        });
        this.anims.create({
            key: 'beam_anim',
            frames: this.anims.generateFrameNumbers('beam'),
            frameRate: 20,
            repeat: -1
        });
    }
}