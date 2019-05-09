class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        this.load.image('background', '../../assets/images/background_image.jpg');
    }

    create() {
        let background = this.add.sprite(0, 0, 'background');
        background.setOrigin(0, 0);

        let title_text = this.add.text(100, 100, 'INSERT GAME TITLE HERE');
    }
}