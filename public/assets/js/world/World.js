import {Entity} from "../entity/Entity.js";

class World {

    static WIDTH = 200;
    static HEIGHT = 200;

    constructor(engine, world) {
        this.entitys = [];
        this.bullets = [];

        this.world = world;


        this.engine = engine;

        this.scene = this.createScene();

        // Register a render loop to repeatedly render the scene
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

    summonBullet(bullet) {
        this.bullets.push(bullet);
    }

    createScene() {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(this.engine);

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 500, -500), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());

        // This attaches the camera to the canvas
        // camera.attachControl(canvas, true);


        var light1 = new BABYLON.DirectionalLight("light1", new BABYLON.Vector3(0, -1, 0), scene);
        var light2 = new BABYLON.DirectionalLight("light2", new BABYLON.Vector3(1, 0, 0), scene);
        var light3 = new BABYLON.DirectionalLight("light3", new BABYLON.Vector3(-1, 0, 0), scene);
        var light4 = new BABYLON.DirectionalLight("light4", new BABYLON.Vector3(0, 0, 1), scene);
        var light5 = new BABYLON.DirectionalLight("light5", new BABYLON.Vector3(0, 0, -1), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light1.intensity = 1;
        light2.intensity = 0.8;
        light3.intensity = 1;
        light4.intensity = 0.6;
        light5.intensity = 1;

        const height = 20, sheight = height * 0.6;
        World.WIDTH = this.world.length * height;
        World.HEIGHT = this.world[0].length * height;

        for (let i = 0; i < this.world.length; i++) {
            for (let j = 0; j < this.world[i].length; j++) {
                if (typeof this.world[i][j] === 'object') {
                    let obj = Object.create (this.world[i][j].classe.prototype);
                    obj = new obj.constructor (scene, this.world[i][j].id, j * height + sheight - World.WIDTH / 2, 
                                                        i * height + sheight - World.HEIGHT / 2, height - sheight);
                    
                    if (this.world[i][j].classe.prototype instanceof Entity) {
                        this.entitys.push (obj)
                    }
                }
            }
        }

        // Our built-in 'ground' shape.
        var ground = BABYLON.MeshBuilder.CreateGround("ground", {
            width: World.WIDTH,
            height: World.HEIGHT
        }, scene);

        return scene;
    }

    mainloop() {
        for (let i = this.entitys.length - 1; i >= 0; i--) {
            if (this.entitys[i].lifePoints <= 0) {
                this.scene.removeMesh(this.entitys[i].shape);
                this.entitys.splice(i, 1);
            } else {
                this.entitys[i].move(this.entitys);
                this.entitys[i].shoot(this);
            }
        }
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            if (this.bullets[i].move(this.entitys)) {
                this.scene.removeMesh(this.bullets[i].shape);
                this.bullets.splice(i, 1);
            }
        }


        requestAnimationFrame(() => {
            this.mainloop();
        })
    }
}

export { World }