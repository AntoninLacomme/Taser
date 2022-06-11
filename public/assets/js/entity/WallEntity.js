import { Entity } from "./Entity.js";

class WallEntity extends Entity {

    constructor (scene, id, coordX, coordY, height) {
        super (scene, id, coordX, coordY, height, 0, 0);

        this.collision = 'rect';
        this.cheight = height * 0.8;
    }

    render (scene) {
        let box = BABYLON.MeshBuilder.CreateBox("box", {
            height: this.height * 2,
            width: this.height * 2,
            depth: this.height * 2
        }, scene);

        box.position = new BABYLON.Vector3(this.coordX, 0, this.coordY);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.8, 0.8, 0.8);
        material.specularColor = new BABYLON.Color3 (0, 0, 0);
        box.material = material;
        
        return box;
    }
}

class BlackWallEntity extends WallEntity {
    constructor (scene, id, coordX, coordY, height) {
        super (scene, id, coordX, coordY, height);

        this.lifePoints = 5;
    }

    render (scene) {
        let box = BABYLON.MeshBuilder.CreateBox("box", {
            height: this.height * 2,
            width: this.height * 2,
            depth: this.height * 2
        }, scene);

        box.position = new BABYLON.Vector3(this.coordX, 0, this.coordY);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.1, 0.1, 0.1);
        material.specularColor = new BABYLON.Color3 (0, 0, 0);
        box.material = material;
        
        return box;
    }

    touch () {
        this.lifePoints -= 1;
    }
}

export {
    WallEntity, BlackWallEntity
}