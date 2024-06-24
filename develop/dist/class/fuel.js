import TextObject from "./textObject.js";
export default class Fuel extends TextObject {
    _fuel;
    set fuel(fuel) {
        this._fuel = fuel;
    }
    constructor(params) {
        super(params);
        this._fuel = params.fuel;
    }
    draw() {
        this._text = this._fuel.toString().padStart(3, "0") + "/100";
        super.draw();
    }
}
