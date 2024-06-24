import GameObject from "./gameObject.js";
export default class MovableObject extends GameObject {
    _velocity;
    _acceleration;
    get velocity() {
        return this._velocity;
    }
    set velocity(velocity) {
        this._velocity = velocity;
    }
    get acceleration() {
        return this._acceleration;
    }
    set acceleration(acceleration) {
        this._acceleration = acceleration;
    }
    constructor(params) {
        super(params);
        this._velocity = params.velocity;
        this._acceleration = params.acceleration;
    }
    move() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    accelerate() {
        this.velocity.x += this.acceleration.x;
        this.velocity.y += this.acceleration.y;
    }
    stop() {
        this.acceleration = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
    }
    update() {
        this.accelerate();
        this.move();
        super.update();
    }
}
