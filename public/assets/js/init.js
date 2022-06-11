import { World } from './world/World.js';
import { BlackWallEntity, WallEntity } from './entity/WallEntity.js';
import { SpawnerTest } from './entity/spawner/SpawnerTest.js';

window.onload = () => {
    var canvas = document.querySelector("#canvas-taser");
    resizeCanvas(canvas);
    window.addEventListener("resize", () => {
        resizeCanvas(canvas);
    });

    var engine = new BABYLON.Engine(canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
    });

    let WORLD = [];
    for (let i=0; i<20; i++) {
        let line = [];
        for (let j=0; j<20; j++) {
            line.push (0);

            // if ((i == 0 || j == 0) || (i == 19 || j == 19)) {
            //     line[j] = {
            //         classe: WallEntity,
            //         id: 1
            //     };
            // }
        }
        WORLD.push (line);
    }

    WORLD[9][9] = {
        classe: SpawnerTest,
        id: 2,
        options: {
            angleVisee: Math.PI / 2
        }
    };

    WORLD[15][15] = {
        classe: BlackWallEntity,
        id: 1
    }

    let world = new World (engine, WORLD);
    world.mainloop ();

    

}

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
