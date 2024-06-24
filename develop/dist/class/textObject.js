import { Util } from "../utility/util.js";
import GameObject from "./gameObject.js";
export default class TextObject extends GameObject {
    _fontName;
    _fontSize;
    _text;
    get fontName() {
        return this._fontName;
    }
    get fontSize() {
        return this._fontSize;
    }
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    /**
     * Constructor
     * @param params initial pramator
     */
    constructor(params) {
        super({
            element: Util.createElement({
                name: "div",
            }),
            ...params,
        });
        this._fontName = params.fontName;
        this._fontSize = params.fontSize;
        this._text = params.text ?? "";
    }
    draw() {
        this.element.style.fontFamily = this.fontName;
        this.element.style.fontSize = this.fontSize.toString() + "px";
        this.element.innerText = this.text;
        super.draw();
    }
}
