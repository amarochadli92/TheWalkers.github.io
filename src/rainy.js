const main = document.querySelector("main");
const rain = document.querySelectorAll(".rain #rain");
let index = 0;

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
    all_height = all_height
        .map((selector) => {
            return document.querySelector(selector).clientHeight;
        })
        .reduce((curr, acc) => {
            return curr + acc;
        });

    return all_height - all_height / 4;
}

let intervalStartRain = setInterval(() => {
    let main = document.querySelector("main");
    if (getComputedStyle(main).display == "inline") {
        newDrop(rain[index], 0, 0);
        clearInterval(intervalStartRain);
    }
}, 100);

class RainObject {
    constructor(shape, x_position, y_position, check) {
        this.shape = shape;
        this.x = x_position;
        this.y = y_position;
        this.check = check;
        this.clientWidth = document.querySelector(".rain").clientWidth;
    }
    randomX() {
        this.x = this.check ? this.x : getRandom(this.clientWidth);
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
            const end_height = getHeightEnd("#intro-company", "#discount");
            this.startRain(end_height);
        });
    }
    startRain(end) {
        if (this.shape.id == "rain") {
            this.y += 1;
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