import { CometParams } from "../utility/type.js";
import { Util } from "../utility/util.js";
import MovableObject from "./movableObject.js";

export default class Comet extends MovableObject {
  constructor(params: CometParams) {
    super({
      element: Util.createElement({
        name: "img",
        attr: {
          src: "./assets/images/comet.png",
          class: "blink",
        }
      }),
      ...params,
    });
  }
}