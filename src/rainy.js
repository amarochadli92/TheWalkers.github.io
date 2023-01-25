let height_two = document.querySelector("#intro-company").clientHeight;
const height_one = document.querySelector("#discount").clientHeight;
const rain = document.querySelectorAll(".rain #rain");
const main = document.querySelector("main");
let index = 0;
class RainObject {
    constructor(shape, x_position, y_position, check) {
        this.shape = shape;
        this.x = x_position;
        this.y = y_position;
        this.check = check;
    }
    randomX() {
        this.x = this.check ? this.x : getRandom(main.clientWidth - 48);
        this.shape.style.left = this.x + "px";
        this.y = this.check ? this.y : 0;
        this.shape.style.top = this.y + "px";
    }
    rain() {
        setInterval(() => {
            this.shape.onmouseover = () => {
                this.shape.id = "";
            };
            this.shape.onmouseout = () => {
                this.shape.id = "rain";
            };
            const end_height = getHeightEnd(height_one, height_two / 2);
            this.startRain(end_height);
        }, 20);
    }
    startRain(end) {
        if (this.shape.id == "rain") {
            this.y += 0.5;
        }
        if (this.y >= end) {
            this.randomX();
        }
        if (this.y == 80 && index < rain.length - 1) {
            newDrop(rain[index], 0, 0);
        }
        this.shape.style.top = this.y + "px";
    }
}

function newDrop(ele = rain[0], x, y, check = false) {
    let drop = new RainObject(ele, x, y, check);
    drop.randomX();
    drop.rain();
    index++;
}

function getRandom(end) {
    const value = Math.round(Math.random() * end);
    return value - (value % 48);
}

function getHeightEnd(...all_height) {
    return all_height.reduce((curr, acc) => {
        return curr + acc;
    });
}

newDrop(rain[index], 0, 0);