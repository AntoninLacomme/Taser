
export default class Entity {

    constructor (scene, id, coordX, coordY, height, vx=0, vy=0) {
        if (this.constructor == Entity.constructor) {
            throw "This constructor can't be called";
        }

        this.id = id;

        this.coordX = coordX;
        this.coordY = coordY;

        this.height = height;
        this.cheight = height;

        this.vx = vx;
        this.vy = vy;

        this.shape = this.render (scene);
        this.shape.position.y = height;

        this.physic = true;
        this.collision = 'circle' || 'rect'

        this.lifePoints = 1;
    }

    move () {
        this.coordX += this.vx;
        this.coordY += this.vy;

        this.shape.position.x = this.coordX;
        this.shape.position.z = this.coordY;
    }

    shoot () {
        // to override
    }

    render () {
        return null;
    }

    touch () {
        // to override
    }
    
    checkRectCollision(entity) {
        if (Math.abs(entity.coordX - this.coordX) < this.cheight + entity.cheight && Math.abs(entity.coordY - this.coordY) < this.cheight + entity.cheight) {
            return true;
        }
        return false;
    }

    checkCircleCollision(entity) {
        return (Math.sqrt((entity.coordX - this.coordX) ** 2 + (entity.coordY - this.coordY) ** 2) < this.cheight + entity.cheight);
    }
}