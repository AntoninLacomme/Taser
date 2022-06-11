import Spawner from "./Spawner.js";
import DestructibleMunition from "../munition/DestructibleMunition.js";
import UndestructibleMunition from "../munition/UndestructibleMunition.js";

export default class SpawnerTest extends Spawner {

    constructor (scene, id, coordX, coordY, height) {
        super (scene, id, coordX, coordY, height, 0, 0);

        this.lifePoints = 5;
        this.alternate = true;
        this.speed = 0.5;
    }

    render (scene) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: this.height * 2, segments: 32}, scene);
        sphere.position = new BABYLON.Vector3(this.coordX, 0, this.coordY);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        material.specularColor = new BABYLON.Color3 (0, 0, 0);
        sphere.material = material;

        return sphere;
    }

    summonMunition (world) {
        this.alternate = !this.alternate;

        world.summonBullet (this.createMunitionWithAngle (world.scene, this.alternate ? DestructibleMunition: UndestructibleMunition, this.angleVisee));
        world.summonBullet (this.createMunitionWithAngle (world.scene, this.alternate ? DestructibleMunition: UndestructibleMunition, this.angleVisee + Math.PI / 6));
        world.summonBullet (this.createMunitionWithAngle (world.scene, this.alternate ? DestructibleMunition: UndestructibleMunition, this.angleVisee - Math.PI / 6));

    }

    move (listEntitys) {
        this.vx = Math.cos(this.angleVisee) * this.speed;
        this.vy = Math.sin(this.angleVisee) * this.speed;
        super.move();

        for (let entity of listEntitys) {
            if (entity.id != this.id) {
                if (entity.collision == 'circle') {
                    if (this.checkRectCollision(entity)) {
                        if (this.checkCircleCollision(entity)) {
                            entity.touch ();
                            return true;
                        }
                    }
                } else { // entity.collision == 'rect'
                    if (this.checkRectCollision(entity)) {
                        entity.touch ();
                        return true;
                    }
                }
            }
        }
        return false;
    }
}