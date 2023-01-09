import { Product } from "./classProduct.js";
("use strict");
const intro = document.querySelector(".intro-company .intro");
const nav_bar = document.querySelectorAll(".link");
const kartos = document.querySelector(".hero-two");
const wernech = document.querySelector(".hero-one");
const cart = document.querySelector(".cart");

/* ADD EVENT DOM_CONTENT_LOADED FOR START ANIMATION */
document.addEventListener("DOMContentLoaded", () => animationIntro());

/* FOR SLIDE CLASSES IN NAV LINK */
slidClasses(nav_bar, "active");

/* FOR PLAY GET DATA PRODUCT */
let data = getData("../src/data.json");

/* FUNCTION CREATE ELEMENT FOR PRODUCT HAVE */
export let created_element = await createElement(getDiscount(await data));

createElement && addToCart();
cart.onclick = () => showCart();

/* FOR STARS RATE */
// stars();

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
    let check = false;
    const parent_discount = document.querySelector("#discount .swiper-wrapper");
    let create = data.forEach((product, index) => {
        let new_product = new Product(product, parent_discount);
        new_product.create();
        index == data.length - 1 && (check = true);
    });

    stars();

    return check;
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

function showCart() {
    cart.toggleAttribute("selected");
    document.querySelector(".container.cart-buy").toggleAttribute("selected");
    controlQuantity();
    controlRemoveProduct();
    NotEmptyCart() ? getTotalPrice() : emptyTotal();
}

function addToCart() {
    const btn_add = document.querySelectorAll(".add-to-cart");
    btn_add.forEach((btn) => (btn.onclick = () => add(btn.dataset)));

    function add(data) {
        let product = `
        <div class="product">
        <img src="${data.dirImg}">
        <div class="info-product">
            <div class="info">
                <h2>${data.productName}</h2>
                <span>${data.productPlatform}</span>
                <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="control-quantity">
                <i class="fa-solid fa-circle-plus fa-fw"  id="quantity-increment"></i>
                <span id="quantity" data-max-quantity = ${data.quantity}>1</span>
                <i class=" fa-solid fa-circle-minus fa-fw" id="quantity-decrement"></i>
            </div>
            <div class="mony">
                <span class="price">$${data.price}</span>
                <span class="remove-product" >Remove</span>
            </div>
        </div>
    </div>
    `;
        document.querySelector(".cart-products").innerHTML += product;
    }
}

function controlQuantity() {
    document.querySelectorAll(".control-quantity").forEach((element, index) => {
        element.querySelector("#quantity-increment").onclick = () =>
            increment(element, index);
        element.querySelector("#quantity-decrement").onclick = () =>
            decrement(element, index);
    });

    function increment(element, index) {
        const quantity = element.querySelector("#quantity");
        const max = +quantity.dataset.maxQuantity;
        parseInt(quantity.innerHTML) < max && quantity.innerHTML++;
        let prix = calcQuantityProduct(index);
    }

    function decrement(element, index) {
        const quantity = element.querySelector("#quantity");
        parseInt(quantity.innerHTML) != 1 && quantity.innerHTML--;
    }

    function calcQuantityProduct(index) {
        let prix_own = getPriceOwn();

        function getPriceOwn() {
            return +document
                .querySelectorAll(".cart-products  .price")[index].innerHTML.slice(1);
        }
    }
}

function controlRemoveProduct() {
    document.querySelector(".remove-all").onclick = () => removeAllProduct();

    document.querySelectorAll(".remove-product").forEach((element) => {
        element.onclick = () => removeItem(getParentElement(element, 3));
    });

    function removeAllProduct() {
        document.querySelectorAll(".cart-products .product").forEach((product) => {
            document.querySelector(".cart-products").removeChild(product);
        });
    }

    function removeItem(index) {
        document.querySelector(".cart-products").removeChild(index);
        NotEmptyCart() ? getTotalPrice() : emptyTotal();
    }
}

function getTotalPrice() {
    let total = 0;
    let cart = document.querySelectorAll(".cart-products .product .price");
    cart.forEach((e) => {
        total += +e.innerHTML.slice(1);
    });
    document.querySelector(".total-price .price").innerHTML = "$" + total;
}

function NotEmptyCart() {
    return document.querySelector(".cart-products").children.length > 0;
}

function emptyTotal() {
    document.querySelector(".total-price .price").innerHTML = "$0";
}

/**
 *
 * @param {*} ele
 * @param {*} steps for get a Parent Element
 * @returns
 */
function getParentElement(ele, steps) {
    let curr = ele;
    for (let index = 0; index < steps; index++) {
        curr = curr.parentNode;
    }
    return curr;
}