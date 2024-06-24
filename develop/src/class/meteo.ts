import { MeteoParams } from "../utility/type.js";
import { Util } from "../utility/util.js";
import MovableObject from "./movableObject.js";

export default class Meteo extends MovableObject {
  protected _power: number;
  protected readonly _initial_power: number;

  get power(): number {
    return this._power;
  }

  set power(power: number) {
    this._power = power;
  }

  get initial_power(): number {
    return this._initial_power;
  }

  constructor(params: MeteoParams) {
    super({
      element: Util.createElement({
        name: "img",
        attr: { src: "./assets/images/meteo.png" }
      }),
      ...params,
    });
    this._power = params.power;
    this._initial_power = params.power;
  }

  draw(): void {
    const scale = (this.power / this.initial_power).toString();
    this.element.style.transform = "scale(" + scale + ")";
    const h_angle = ((this.power % 12) * 30).toString();
    this.element.style.filter = "hue-rotate(" + h_angle + "deg)";
    super.draw();
  }
}