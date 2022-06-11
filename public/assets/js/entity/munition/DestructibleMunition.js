import {Munition} from "./Munition.js";

class DestructibleMunition extends Munition {

    constructor(scene, id, coordX, coordY, height, vx, vy) {
        super(scene, id, coordX, coordY, height, vx, vy);
    }

    render(scene) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {
            diameter: this.height * 2,
            segments: 32
        }, scene);
        sphere.position = new BABYLON.Vector3(this.coordX, 0, this.coordY);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.6, 0.3, 0.3);
        material.specularColor = new BABYLON.Color3(0, 0, 0);
        sphere.material = material;

        return sphere;
    }

    move(listEntitys) {
        return super.move(listEntitys);
    }
}

export { DestructibleMunition }