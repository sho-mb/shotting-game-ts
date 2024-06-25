import { FuelPackParams } from "../utility/type.js";
import { Util } from "../utility/util.js";
import MovableObject from "./movableObject.js";

export default class FuelPack extends MovableObject {
  constructor(params: FuelPackParams) {
    super({
      element: Util.createElement({
        name: "img",
        attr: {
          src: "./assets/images/fuelPack.png",
        }
      }),
      ...params,
    })
  }
}