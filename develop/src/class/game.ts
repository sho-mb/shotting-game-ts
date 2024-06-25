import { Point2D, SaveData } from "../utility/type.js";
import { Util } from "../utility/util.js";
import Comet from "./comet.js";
import Fuel from "./fuel.js";
import FuelPack from "./fuelPack.js";
import KeyBoard from "./keyboard.js";
import Level from "./level.js";
import Meteo from "./meteo.js";
import Player from "./player.js";
import Score from "./score.js";
import Screen from "./screen.js";
import Shot from "./shot.js";

export default class Game {
  private readonly _player: Player;
  private _shots: Array<Shot>;
  private _comets: Array<Comet>;
  private _meteos: Array<Meteo>;
  private _fuelPacks: Array<FuelPack> 

  private _score: number;
  private _level: number;
  private readonly _scoreBoard: Score;
  private readonly _levelBoard: Level;
  private readonly _fuelBoard: Fuel;

  private readonly _mainTimer: number;
  private readonly _cometTimer: number;
  private readonly _fuelTimer: number;
  private _shotTimer: number;
  private _meteoTimer: number;
  private _fuelInterval: number;
  private _shotInterval: number;
  private _meteoInterval: number;

  constructor() {
    this._player = new Player({
      position: { x: Screen.width / 2, y: 45 },
      size: { x: 100, y: 90 },
      fuel: 20,
      initialSpeed: 20,
      keyboard: new KeyBoard(),
    });
    this._shots = [];
    this._meteos = [];
    this._comets = [];
    this._fuelPacks = [];

    this._score = 0;
    this._scoreBoard = new Score({
      position: { x: 25, y: Screen.height - 25 },
      fontName: "Bungee Inline",
      fontSize: 40,
      score: this._score,
    })

    this._level = 1;
    this._levelBoard = new Level({
      position: { x: 25, y: Screen.height - 75 },
      fontName: "Bungee Inline",
      fontSize: 24,
      level: this._level,
    })

    this._fuelBoard = new Fuel({
      position: { x: Screen.width - 200, y: Screen.height - 25 },
      fontName: "Bungee Inline",
      fontSize: 40,
      fuel: this._player._fuel,
    })

    this.load();

    this._shotInterval = 1000;
    this._meteoInterval = 2000;
    this._fuelInterval = 5000;

    this._mainTimer = setInterval(this.mainTimer.bind(this), 50);
    this._shotTimer = setInterval(this.createShot.bind(this), this._shotInterval);
    this._cometTimer = setInterval(this.createComet.bind(this), 5000);
    this._meteoTimer = setInterval(this.createMeteo.bind(this), this._meteoInterval);
    this._fuelTimer = setInterval(this.createFuel.bind(this), this._fuelInterval);
  }
  
  private mainTimer(): void {
    this.addScore(1);
    this.checkFuel();
    this.checkBoundary();
    this.detectCollision();
    this.save()
  }
  
  /**
   * Add score 
   * @param score Added score
   */
  private addScore(score: number): void {
    this._score += score;
    this._scoreBoard.score = this._score;
    
    this.updateLevel();
  }
  
  private updateLevel(): void {
    const nextScore = Util.getNextScore(this._level);
    if (nextScore <= this._score) {
      this._level++;
      this._levelBoard.level = this._level;
    }
  }

  /**
   * Update fuel
   * @param fuel update fuel
   */
  private updateFuel(): void {
    this._fuelBoard.fuel = this._player._fuel;
  }

  private checkFuel(): void {
    this.updateFuel();
    if (this._player._fuel <= 0) {
      clearInterval(this._shotTimer);
      this._shotTimer = 0;
    } else if (this._player._fuel > 0 && this._shotTimer <= 0) {
      this._shotTimer = setInterval(this.createShot.bind(this), this._shotInterval)
    }
  }
  
  private checkBoundary(): void {
    this._shots.forEach((shot) => {
      if (Util.isOutsideScreen(shot)) {
        Util.removeObject<Shot>(shot, this._shots);
      }
    })

    this._comets.forEach((comet) => {
      if (Util.isOutsideScreen(comet)) {
        Util.removeObject<Comet>(comet, this._comets);
      }
    })

    this._meteos.forEach((meteo) => {
      if (Util.isOutsideScreen(meteo)) {
        Util.removeObject<Meteo>(meteo, this._meteos);
      }
    })

    this._fuelPacks.forEach((pack) => {
      if (Util.isOutsideScreen(pack)) {
        Util.removeObject<FuelPack>(pack, this._fuelPacks);
      }
    })
  }
  
  private detectCollision(): void {
    this._comets.forEach((comet) => {
      if (Util.isCollding(this._player, comet, 30)) {
        Util.removeObject<Comet>(comet, this._comets);
        const nextScore = Util.getNextScore(this._level);
        this.addScore(nextScore - this._score);
      }
    })

    this._shots.forEach((shot) => {
      for (const meteo of this._meteos) {
        if (Util.isCollding(meteo, shot, 80)) {
          this.addScore(100)
          if ((meteo.power -= shot.power) <= 0) {
            Util.removeObject<Meteo>(meteo, this._meteos);
          }
          Util.removeObject<Shot>(shot, this._shots);
          break;
        }
      }
    })

    this._meteos.forEach((meteo) => {
      if (Util.isCollding(this._player, meteo, 50)) {
        this._player.reduceFuel(5);
      }
    })

    this._fuelPacks.forEach((pack) => {
      if (Util.isCollding(this._player, pack, 30)) {
        Util.removeObject<FuelPack>(pack, this._fuelPacks);
        this._player._fuel += 20;
      }
    })
  }
  
  private createShot(): void {
    const size = { x: 20, y: 65 };
    const acceleration = { x: 0, y: 2 };
    const x_array: Array<number> = [];
    const v_array: Array<Point2D> = [];
    if (this._level < 5) {
      x_array.push(this._player.position.x);
      v_array.push({ x:0, y:20 })
    } else if (this._level < 10) {
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x + size.x);
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
    } else if (this._level < 20) {
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x)
      x_array.push(this._player.position.x + size.x);
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 0, y: 20 });
    } else if (this._level < 50) {
      x_array.push(this._player.position.x - size.x * 2);
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x)
      x_array.push(this._player.position.x + size.x);
      x_array.push(this._player.position.x + size.x * 2);
      v_array.push({ x: -4, y: 20 });
      v_array.push({ x: -2, y: 20 });
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 2, y: 20 });
      v_array.push({ x: 4, y: 20 });
    } else {
      x_array.push(this._player.position.x - size.x * 3);
      x_array.push(this._player.position.x - size.x * 2);
      x_array.push(this._player.position.x - size.x);
      x_array.push(this._player.position.x)
      x_array.push(this._player.position.x + size.x);
      x_array.push(this._player.position.x + size.x * 2);
      x_array.push(this._player.position.x + size.x * 3);
      v_array.push({ x: -6, y: 20 });
      v_array.push({ x: -4, y: 20 });
      v_array.push({ x: -2, y: 20 });
      v_array.push({ x: 0, y: 20 });
      v_array.push({ x: 2, y: 20 });
      v_array.push({ x: 4, y: 20 });
      v_array.push({ x: 6, y: 20 });
    }
    const y = this._player.position.y + this._player.size.y / 2;
    const power = Util.getShotPower(this._level);

    x_array.forEach((x: number, i: number) => {
      const position = { x: x, y: y };
      const velocity = v_array[i];
      this._shots.push(
        new Shot({
          position: position,
          size: size,
          velocity: velocity,
          acceleration: acceleration,
          power: power,
        })
      );
    });
    clearInterval(this._shotTimer);
    this._shotInterval = Math.max(100, 1000 - this._level);
    this._shotTimer = setInterval(this.createShot.bind(this), this._shotInterval)
  }
  
  private createMeteo(): void {
    const size = { x: 150, y: 150 };
    const position = {
      x: Util.random(0, Screen.width),
      y: Screen.height + 75,
    };

    const velocity = {
      x: Util.random(-2, -1),
      y: Util.random(-1, 1),
    };

    const acceleration = {
      x: 0,
      y: Util.random(-1, 0),
    };
    
    const power = Util.getMeteoPower(this._level);

    this._meteos.push(
      new Meteo({
        position: position,
        size: size,
        velocity: velocity,
        acceleration: acceleration,
        power: power,
      })
    );
    
    clearInterval(this._meteoTimer);
    this._meteoInterval = Math.max(500, 2000 - this._level * 100);
    this._meteoTimer = setInterval(this.createMeteo.bind(this), this._meteoInterval)
  }
  
  private createComet(): void {
    const size = { x: 50, y: 50 };
    const position = { x: 0, y: 0 };
    const velocity = { x: 0, y: 0 };
    const acceleration = { x: 0, y: 0 };

    if (Util.random(0, 100) < 50) {
      [position.x, position.y] = [Screen.width + 25, Screen.height - Util.random(0, 500)];
      [velocity.x, velocity.y] = [-6, -3];
      [acceleration.x, acceleration.y] = [-0.6, -0.3];
    } else {
      [position.x, position.y] = [-25, Screen.height - Util.random(0, 500)];
      [velocity.x, velocity.y] = [6, -3];
      [acceleration.x, acceleration.y] = [0.6, -0.3];
    }
    
    this._comets.push(new Comet({
      position: position,
      velocity: velocity,
      acceleration: acceleration,
      size: size,
    }))
  }

  private createFuel(): void {
    const size = { x: 100, y: 100 };
    const position = {
      x: Util.random(0, Screen.width),
      y: Screen.height + 75,
    };

    const velocity = {
      x: Util.random(-2, -1),
      y: Util.random(-1, 1),
    };

    const acceleration = {
      x: 0,
      y: Util.random(-1, 0),
    };

    this._fuelPacks.push(new FuelPack({
      position: position,
      velocity: velocity,
      acceleration: acceleration,
      size: size,
    }))
  }
  
  private save(): void {
    const data: SaveData = {
      level: this._level,
      score: this._score,
      shotInterval: this._shotInterval,
      meteoInterval: this._meteoInterval,
    };
    localStorage.setItem("data", JSON.stringify(data));
  }
  
  private load(): void {
    const json = localStorage.getItem("data");

    if (json !== null) {
      const data: SaveData = JSON.parse(json);
      this._level = data.level;
      this._score = data.score;
      this._shotInterval = data.shotInterval;
      this._meteoInterval = data.meteoInterval;
      this._scoreBoard.score = this._score;
      this._levelBoard.level = this._level;
    }
  }
}


