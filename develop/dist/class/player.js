import { Util } from "../utility/util.js";
import MovableObject from "./movableObject.js";
export default class Player extends MovableObject {
    _speed;
    _fuel;
    _keyboard;
    constructor(params) {
        super({
            element: Util.createElement({
                name: "img",
                attr: { src: "./assets/images/player.png" }
            }),
            velocity: { x: 0, y: 0 },
            acceleration: { x: 0, y: 0 },
            ...params,
        });
        this._fuel = params.fuel;
        this._speed = params.speed;
        this._keyboard = params.keyboard;
    }
    move() {
        if (this._keyboard.up && !this._keyboard.down) {
            this.velocity.y = this._speed;
        }
        else if (!this._keyboard.up && this._keyboard.down) {
            this.velocity.y = -this._speed;
        }
        else {
            this.velocity.y = 0;
        }
        if (this._keyboard.left && !this._keyboard.right) {
            this.velocity.x = -this._speed;
        }
        else if (!this._keyboard.left && this._keyboard.right) {
            this.velocity.x = this._speed;
        }
        else {
            this.velocity.x = 0;
        }
        super.move();
        this.position = Util.clampScreen(this, true);
    }
}
