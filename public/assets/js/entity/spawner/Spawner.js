import {Entity} from "../Entity.js";

class Spawner extends Entity {

    constructor (scene, id, coordX, coordY, height, vx, vy) {
        super (scene, id, coordX, coordY, height, vx, vy);

        this.nbFrameBeforeShoot = 15;
        this.currentFrameBeforeShoot = 0;

        this.angleVisee = 0;
        this.speedMunition = 2;
    }

    move () {
        super.move();
    }

    shoot (world) {
        if (this.currentFrameBeforeShoot == 0) {
            this.summonMunition (world);
        }

        this.currentFrameBeforeShoot++;
        this.angleVisee += 0.01;
        if (this.currentFrameBeforeShoot >= this.nbFrameBeforeShoot) {
            this.currentFrameBeforeShoot = 0;
        }
    }

    summonMunition (world) {
        // to override
    }

    createMunitionWithAngle (scene, classe, angle) {
        let obj = Object.create (classe.prototype);
        obj = new obj.constructor (scene, this.id, this.coordX, this.coordY, 5, Math.cos(angle)*this.speedMunition, Math.sin (angle)*this.speedMunition);
        return obj;
    }

    touch () {
        this.lifePoints -= 1;
    }
}

export {
    Spawner
}