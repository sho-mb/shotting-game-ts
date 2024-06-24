import Screen from "../class/screen.js";
/**
 * Common functions
 */
export var Util;
(function (Util) {
    /**
     * Create HTML element
     * @param name tag name
     * @param attr attributes
     * @returns HTMLElement object
     */
    Util.createElement = ({ name, attr }) => {
        const element = document.createElement(name);
        if (typeof attr !== "undefined") {
            let key;
            for (key in attr) {
                const value = attr[key];
                element.setAttribute(key, value);
            }
        }
        return element;
    };
    /**
     * Limit cordinate in the screen
     * @param obj validation object
     * @param strict true: strict / false: slack
     * @returns Point2D limited cordinate
     */
    Util.clampScreen = (obj, strict = false) => {
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
    Util.getShotPower = (level) => {
        return Math.min(Math.floor(Math.pow(level, 1.3)), 1000);
    };
    /**
     * get random number from specific range
     * @param min minimum
     * @param max maximum
     * @return numner random
     */
    Util.random = (min, max) => {
        return Math.random() * (max - min) + min;
    };
    /**
     * Create meteo power
     * @param level current level
     * @return number power
     */
    Util.getMeteoPower = (level) => {
        return Math.min(Math.floor(Math.pow(level, 1.5)), 5000);
    };
    /**
     * Score for level up to the next
     * @param level Current level
     * @return number score
     */
    Util.getNextScore = (level) => {
        return Math.floor(Math.pow(level, 2) * 100);
    };
    /**
     * Judgemnt objects out
     * @param obj validation obj
     * @return boolean true: outside of screen / false: inside of screen
     */
    Util.isOutsideScreen = (obj) => {
        let result = false;
        const clamped_pos = Util.clampScreen(obj, false);
        if (clamped_pos.x !== obj.position.x || clamped_pos.y !== obj.position.y) {
            result = true;
        }
        return result;
    };
    /**
     * Delete gameObjects
     * @param obj Delete target object
     * @return array Array include with object
     */
    Util.removeObject = (obj, array) => {
        obj.dispose();
        if (typeof array !== "undefined") {
            array.splice(array.indexOf(obj), 1);
        }
    };
    /**
     * Judge collding
     * @param obj1 target object 1
     * @param obj2 target object 2
     * @param radius distance of collding
     * @return boolean true: collding / false: not collding
     */
    Util.isCollding = (obj1, obj2, radius) => {
        const [x1, y1] = [obj1.position.x, obj1.position.y];
        const [x2, y2] = [obj2.position.x, obj2.position.y];
        const [dx, dy] = [x1 - x2, y1 - y2];
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance <= radius;
    };
})(Util || (Util = {}));
