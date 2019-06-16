class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        let x = scene.player.x;
        let y = scene.player.y;

        // add beam to the scene and to the projectiles group
        super(scene, x, y, 'beam');
        scene.add.existing(this);
        scene.projectiles.add(this);
        
        // play animation and move up
        this.play('beam_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = - 250;
    }

    update() {
        // remove the beam once it´s not seen for optimization
        if (this.y < 20) {
            this.destroy();
        }
    }
}