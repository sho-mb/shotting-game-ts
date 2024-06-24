import IMovable from "../interface/movable.js";
import { MovableObjectParams, Point2D } from "../utility/type.js";
import GameObject from "./gameObject.js";

export default class MovableObject extends GameObject implements IMovable {
  protected _velocity: Point2D;
  protected _acceleration: Point2D;

  get velocity(): Point2D {
    return this._velocity
  }

  set velocity(velocity: Point2D) {
    this._velocity = velocity;
  }

  get acceleration(): Point2D {
    return this._acceleration;
  }

  set acceleration(acceleration: Point2D) {
    this._acceleration = acceleration;
  }

  constructor(params: MovableObjectParams) {
    super(params)
    this._velocity = params.velocity;
    this._acceleration = params.acceleration;
  }

  move(): void {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  accelerate(): void {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
  }

  stop(): void {
    this.acceleration = { x: 0, y: 0 };
    this.velocity = { x: 0, y: 0 };
  }

  update(): void {
    this.accelerate();
    this.move();
    super.update();
  }

}