import { ScoreParams } from "../utility/type.js";
import TextObject from "./textObject.js";

export default class Score extends TextObject {
  protected _score: number;

  set score(score: number) {
    this._score = score
  }

  constructor(params: ScoreParams) {
    super(params)
    this._score = params.score;
  }

  draw() {
    this._text = this._score.toString().padStart(10, "0");
    super.draw();
  }
}