import World from './world/World.js';

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

            if ((i == 0 || j == 0) || (i == 19 || j == 19)) {
                line[j] = 1;
            }
        }
        WORLD.push (line);
    }

    WORLD[10][5] = 3;

    let world = new World (engine, WORLD);
    world.mainloop ();

    

}

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
