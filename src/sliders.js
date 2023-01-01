import { tns } from "../node_modules/tiny-slider/src/tiny-slider.js";

var slider = tns({
    container: "#rewind",
    items: 3,
    rewind: true,
    swipeAngle: false,
    speed: 400,
    autoplay: true,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 1,
        },
        768: {
            items: 2,
        },
        992: {
            items: 2,
        },
        992: {
            items: 3,
        },
    },
});
let btn = document.querySelectorAll(
    "#discount .tns-outer .tns-controls button"
);
btn[0].innerHTML = '<i class="fa-solid fa-circle-left"></i>';
btn[1].innerHTML = '<i class="fa-solid fa-circle-right"></i>';