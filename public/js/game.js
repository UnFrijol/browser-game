let config = {
    width: 256,
    height: 272,
    backgroundColor: 0x000000,
    scene: [MenuScene, LoadScene, PlayScene, GameOverScene, SuccessScene],
    pixelArt: true, // don't add antialias
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
}

let gameSettings = {
    playerSpeed: 200,
    playerHealth: 4,
    killCount: 0,
    score: 0,
    endlessMode: false
}

let game = new Phaser.Game(config);