import { FuelParams } from "../utility/type.js";
import TextObject from "./textObject.js";

export default class Fuel extends TextObject {
  protected _fuel: number;

  set fuel(fuel: number) {
    this._fuel = fuel;
  }

  constructor(params: FuelParams) {
    super(params)
    this._fuel = params.fuel;
  }

  draw(): void {
    this._text = this._fuel.toString().padStart(3,"0") + "/100";
    super.draw();
  }
}