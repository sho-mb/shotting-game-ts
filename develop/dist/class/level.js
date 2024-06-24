import TextObject from "./textObject.js";
export default class Level extends TextObject {
    _level;
    set level(level) {
        this._level = level;
    }
    constructor(params) {
        super(params);
        this._level = params.level;
    }
    draw() {
        this._text = "LEVEL:" + this._level.toString();
        super.draw();
    }
}
