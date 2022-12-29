import { Product } from "./classProduct.js";
("use strict");
const intro = document.querySelector(".intro-company .intro");
const nav_bar = document.querySelectorAll(".link");
const kartos = document.querySelector(".hero-two");
const wernech = document.querySelector(".hero-one");

/* ADD EVENT DOM_CONTENT_LOADED FOR START ANIMATION */
document.addEventListener("DOMContentLoaded", () => animationIntro());

/* FOR SLIDE CLASSES IN NAV LINK */
slidClasses(nav_bar, "active");

/* FOR PLAY GET DATA PRODUCT */
let data = getData("../src/data.json");

/* FUNCTION CREATE ELEMENT FOR PRODUCT HAVE */
createElement(data);

/* FOR STARS RATE */
stars();

/* START FUNCTION GET DATA FROM {.JSON} FILE
 * @param {string} file_dir The directory
 * @return {object} => {promise object}
 */
async function getData(dir) {
    const response = await fetch(dir);
    const response_1 = await response.json();
    return response_1;
}
/* END FUNCTION GET DATA FROM {.JSON} FILE */

async function createElement(data) {
    // GET JUST PRODUCTS HAVE DISCOUNT
    const products_discount = getDiscount(await data);

    createDiscountProducts(products_discount);

    function createDiscountProducts(products) {
        products.forEach((prod, index) => {
            const product = new Product(prod, index);
            product.create();
        });
    }
}
/* START FUNCTIONS GET DISCOUNT PRODUCTS FROM ALL DATA PRODUCTS
 * @param {array} all products data
 * @return {array} just discount products
 */
function getDiscount(data) {
    return data.filter((product) => {
        return product.discount != false;
    });
}
/* START ANIMATION INTRO
 * @param {array} target
 * @param {string} str
 */
function animationIntro() {
    /* ADD ID #COMING FOR SHOW HERO IMG IN */
    kartos.id = "coming";
    wernech.id = "coming";
    intro.id = "coming";
}
/* END ANIMATION INTRO */

/* START FUNCTION SLID CLASS
 * @param {array} nav_bar
 * @param {string} class_name
 */
function slidClasses(target, str) {
    target.forEach((e) => {
        e.onclick = () => {
            removeAllClasses(target, str);
            e.classList.add("active");
        };
    });
}
/* END FUNCTION SLID CLASS  */

/* START FUNCTION REMOVE ALL CLASSES
 * @param {array} target
 * @param {string} str
 */
function removeAllClasses(target, str) {
    target.forEach((e) => {
        e.classList.remove(str);
    });
}
/* END FUNCTION REMOVE ALL CLASSES */

/* START FUNCTION STARTS RATE
 * @param {array} target
 * @param {string} str
 */
function stars() {
    const stars = document.querySelectorAll(".stars");
    let curr;
    stars.forEach((e) => {
        Array.from(e.children).forEach((icon, index) => {
            icon.onclick = () => {
                icon.id == "done" ? rate(icon, index, false) : rate(icon, index, true);
            };
        });
    });

    /* FUNCTION RATE
     * @param {array} target
     * @param {number} index
     */
    function rate(icon, index, check) {
        let ele = check ? icon.previousElementSibling : icon.nextElementSibling;
        let curr = icon;
        if (ele == null) {
            icon.id = check ? "done" : "";
        } else {
            for (let i = index; curr.id == check ? "" : "done"; check ? i++ : i--) {
                curr.id = check ? "done" : "";
                curr.style.transform = check ? "rotate(10turn)" : "rotate(-10turn)";
                curr = check ? curr.previousElementSibling : curr.nextElementSibling;
            }
        }
    }
}
/* END FUNCTION STARTS RATE */