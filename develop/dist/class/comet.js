import { Util } from "../utility/util.js";
import MovableObject from "./movableObject.js";
export default class Comet extends MovableObject {
    constructor(params) {
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
