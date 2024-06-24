import { LevelParams } from "../utility/type.js";
import TextObject from "./textObject.js";

export default class Level extends TextObject {
  protected _level: number;

  set level(level: number) {
    this._level = level;
  } 

  constructor(params: LevelParams) {
    super(params)
    this._level = params.level;
  }

  draw(): void {
    this._text = "LEVEL:" + this._level.toString();
    super.draw();
  }
}