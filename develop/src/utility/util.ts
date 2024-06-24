import GameObject from "../class/gameObject.js";
import Screen from "../class/screen.js";
import { Point2D } from "./type.js";

/**
 * Type of args of createElement method
 */
type createElementOptions = {
  name: string,
  attr?: Record<string, string>
}

/**
 * Common functions
 */
export namespace Util {
  /**
   * Create HTML element
   * @param name tag name
   * @param attr attributes
   * @returns HTMLElement object
   */

  export const createElement = ({ name, attr }: createElementOptions): HTMLElement => {
    const element = document.createElement(name);
    if (typeof attr !== "undefined") {
      let key: keyof typeof attr;
      for (key in attr) {
        const value = attr[key];
        element.setAttribute(key, value);
      }
    }

    return element;
  } 

  /**
   * Limit cordinate in the screen 
   * @param obj validation object
   * @param strict true: strict / false: slack
   * @returns Point2D limited cordinate
   */
  export const clampScreen = <T extends GameObject>(obj: T, strict: boolean = false): Point2D => {
    let [x, y] = [obj.position.x, obj.position.y];
  
    // Strict limit : Limit if the object over the screen even a bit
    // Slack limit : No limit if the object in the screen
    let offsetX = strict ? obj.size.x / 2 : -(obj.size.x);
    let offsetY = strict ? obj.size.y / 2 : -(obj.size.y);
  
    x = Math.max(x, offsetX);
    x = Math.min(x, Screen.width - offsetX);
  
    y = Math.max(y, offsetY);
    y = Math.min(y, Screen.height - offsetY);
  
    return {
      x: x,
      y: y,
    };
  };

  /**
   * Power of creating shots
   * @param level Current level
   * @returns number power
   */
  export const getShotPower = (level: number): number => {
    return Math.min(Math.floor(Math.pow(level, 1.3)), 1000);
  }

  /**
   * get random number from specific range
   * @param min minimum
   * @param max maximum
   * @return numner random
   */

  export const random = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
  }

  /**
   * Create meteo power
   * @param level current level
   * @return number power
   */
  export const getMeteoPower = (level: number): number => {
    return Math.min(Math.floor(Math.pow(level, 1.5)), 5000);
  }

  /**
   * Score for level up to the next
   * @param level Current level
   * @return number score
   */
  export const getNextScore = (level: number) => {
    return Math.floor(Math.pow(level, 2) * 100);
  }

  /**
   * Judgemnt objects out
   * @param obj validation obj
   * @return boolean true: outside of screen / false: inside of screen
   */
  export const isOutsideScreen = <T extends GameObject>(obj: T): boolean => {
    let result = false;

    const clamped_pos = Util.clampScreen(obj, false);
    if (clamped_pos.x !== obj.position.x || clamped_pos.y !== obj.position.y) {
      result = true;
    }
    return result;
  }

  /**
   * Delete gameObjects
   * @param obj Delete target object
   * @return array Array include with object
   */

  export const removeObject = <T extends GameObject>(obj: T, array: Array<T>): void => {
    obj.dispose();
    if (typeof array !== "undefined") {
      array.splice(array.indexOf(obj), 1);
    }
  } 

  /**
   * Judge collding
   * @param obj1 target object 1
   * @param obj2 target object 2 
   * @param radius distance of collding
   * @return boolean true: collding / false: not collding
   */

  export const isCollding = <T1 extends GameObject, T2 extends GameObject>(obj1: T1, obj2: T2, radius: number): boolean => {
    const [x1, y1] = [obj1.position.x, obj1.position.y];
    const [x2, y2] = [obj2.position.x, obj2.position.y];
    const [dx, dy] = [x1 - x2, y1 - y2];
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= radius;
  };
}

