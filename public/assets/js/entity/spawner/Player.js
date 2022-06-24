import { Spawner } from "./Spawner.js"

class PlayerEntity extends Spawner {

    constructor (scene, id, coordX, coordY, height) {
        super (scene, id, coordX, coordY, height, 0, 0);

        this.cheight = this.height*0.5;

        this.lifePoints = 3;
        this.speed = 0.5;

        this.collision = 'circle'

        this.scene = scene;
        this.shape = this.render (scene);
        this.shape.position.y = this.height;
    }

    render (scene) {
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: this.cheight * 2, segments: 32}, scene);
        sphere.position = new BABYLON.Vector3(0, 0, 0);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 0.3);
        material.specularColor = new BABYLON.Color3 (0, 0, 0);
        sphere.material = material;

        this.body = [sphere, this.renderHead (scene, "box1", this.height, 0), this.renderHead (scene, "box3", this.height>>1, -this.height>>1), this.renderHead (scene, "box2", this.height>>1, this.height>>1)];

        switch (this.lifePoints) {
            case 2:
                this.body[this.lifePoints].setEnabled (true);
            case 3:
                this.body[this.lifePoints].setEnabled (true);
        }

        return BABYLON.Mesh.MergeMeshes(this.body, true, true, undefined, false, true);;
    }

    renderHead (scene, name, x, y) {
        const box = BABYLON.MeshBuilder.CreateBox(name, {
            height: this.height>>1,
            width: this.height>>1,
            depth: this.height>>1
        }, scene);
        box.rotation = new BABYLON.Vector3(0, 90, 0);
        box.position = new BABYLON.Vector3 (x, 0, y);

        var material = new BABYLON.StandardMaterial(scene);
        material.alpha = 1;
        material.diffuseColor = new BABYLON.Color3(0.6, 0.6, 0.6);
        material.specularColor = new BABYLON.Color3 (0, 0, 0);
        box.material = material;
        return box;
    }

    touch () {
        super.touch ();

        this.body[this.lifePoints+1].setEnabled (true);
        console.log (this.body[this.lifePoints+1], this.body[this.lifePoints+1].isEnabled (), this.lifePoints+1)
        let newShape = this.render (this.scene);
        this.scene.removeMesh(this.shape);
        this.shape = newShape;
    }
}

export {
    PlayerEntity
}