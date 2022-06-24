import {Entity} from "../Entity.js";

class Munition extends Entity {

    constructor(scene, id, coordX, coordY, height, vx, vy) {
        super(scene, id, coordX, coordY, height, vx, vy);

        this.physic = false;

        this.shape = this.render (scene);
        this.shape.position.y = this.height;
    }

    render(scene) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: this.height * 2,
            segments: 32
        }, scene);
        sphere.position = new BABYLON.Vector3(this.coordX, 0, this.coordY);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        sphere.material = material;

        return sphere;
    }

    move(listEntitys) {
        super.move();

        if (this.outOfWorld ()) { return true; }

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

export {
    Munition
}