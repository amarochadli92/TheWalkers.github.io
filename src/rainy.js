let end_height = document.querySelector("#intro-company").clientHeight;
const rain = document.querySelectorAll(".rain i");
let index = 0;
class RainObject {
    constructor(shape, x_position, y_position, check) {
        this.shape = shape;
        this.x = x_position;
        this.y = y_position;
        this.check = check;
    }
    randomX() {
        this.shape.style.left = getRandom(document.body.clientWidth - 48) + "px";
        this.y = !this.check ? 0 : alert("k");
        this.shape.style.top = this.y + "px";
    }
    rain() {
        let id = setInterval(() => {
            this.startRain();
            this.shape.onmouseover = function() {
                clearInterval(id);
            };

            this.shape.onmouseout = function() {
                newDrop(this.shape, this.x, this.y, true);
            };
        });
    }
    startRain() {
        this.y += 1;
        this.shape.style.top = this.y + "px";
        if (this.y >= end_height) {
            this.randomX();
        }
        if (this.y == 80 && index < rain.length - 1) {
            newDrop(rain[index], 0, 0);
        }
    }
}

function newDrop(ele = rain[0], x, y, check = false) {
    let drop = new RainObject(ele, x, y, check);
    if (!check) {
        drop.randomX();
    }
    drop.rain();
    index++;
}

function getRandom(end) {
    const value = Math.round(Math.random() * end);
    return value;
}

newDrop();