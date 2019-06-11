class PlayScene extends Phaser.Scene {
    constructor() {
        super('gameItself');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);

        this.ship1 = this.add.sprite(config.width / 2 - 50, -20, 'ship');
        this.ship2 = this.add.sprite(config.width / 2, -20, 'ship2');
        this.ship3 = this.add.sprite(config.width / 2 + 50, -20, 'ship3');

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.powerUps = this.physics.add.group();

        let maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            let powerUp = this.physics.add.sprite(16, 16, 'power-up');
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, game.config.width, game.config.height);

            if (Math.random() > 0.5) {
                powerUp.play('red');
            } else {
                powerUp.play('gray');
            }

            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.ship1.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');

        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        this.add.text(20, 20, 'Destroy the enemy fleet!', { font: '15px Verdana', fill: 'yellow' });
        this.progress = this.add.text(20, 40, '0 / 20', { font: '12px Verdana', fill: 'yellow' });

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
        this.player.play('thrust');
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUp) => {
            projectile.destroy();
        });
        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);

        this.sound.pauseOnBlur = false;
        this.backgroundMusic = this.sound.add('backgroundGameMusic');
        this.backgroundMusic.play({ loop: true });
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
    }

    hurtPlayer(player, enemy) {
        this.resetShipPos(enemy);

        (gameSettings.playerHealth === 1) ? this.sound.play('lastHurt') : this.sound.play('hurt');
        player.x = config.width / 2 - 8;
        player.y = config.height - 64;

        gameSettings.playerHealth--;
    }

    hitEnemy(projectile, enemy) {
        projectile.destroy();

        this.resetShipPos(enemy);
        if (enemy === this.ship1) {
            this.sound.play('ship1Explosion');
            gameSettings.score += 30;
        }
        else if (enemy === this.ship2) {
            this.sound.play('ship2Explosion', { volume: 0.5 });
            gameSettings.score += 20;
        }
        else if (enemy === this.ship3) {
            this.sound.play('ship3Explosion');
            gameSettings.score += 10;
        }

        gameSettings.killCount++;
    }

    resetShipPos(ship) {
        ship.y = 0;
        ship.x = Phaser.Math.Between(0, config.width);
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode');
    }

    update() {
        this.moveShip(this.ship1, 3);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 1);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.shootBeam();
        }

        for (let i = 0; i < this.projectiles.getChildren().length; i++) {
            let beam = this.projectiles.getChildren()[i];
            beam.update();
        }

        this.updateStats();

        if (gameSettings.playerHealth === 0) {
            this.scene.start('gameOver');
        }

        if (gameSettings.killCount === 20) {
            this.add.text(config.width / 2, config.height / 2, 'MISSION ACCOMPLISHED');
        }
    }

    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(- gameSettings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(gameSettings.playerSpeed);
        }

        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(- gameSettings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(gameSettings.playerSpeed);
        }

        if (!this.cursorKeys.left.isDown && !this.cursorKeys.right.isDown) {
            this.player.setVelocityX(0);
        }

        if (!this.cursorKeys.up.isDown && !this.cursorKeys.down.isDown) {
            this.player.setVelocityY(0);
        }
    }

    shootBeam() {
        new Beam(this);
        this.sound.play('beamShot', { volume: 5 });
    }

    updateStats() {
        this.progress.setText(`${gameSettings.killCount} / 20`);
    }
}