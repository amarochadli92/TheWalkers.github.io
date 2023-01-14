("use strict");
import { Product } from "./classProduct.js";
const intro = document.querySelector(".intro-company .intro");
const nav_bar = document.querySelectorAll(".link");
const kartos = document.querySelector(".hero-two");
const wernech = document.querySelector(".hero-one");
const cart_btn = document.querySelector(".cart");
const cart_buy = document.querySelector(".cart-buy");
const card_payment = document.querySelector(".card-payment");

/* ADD EVENT DOM_CONTENT_LOADED FOR START ANIMATION */
document.addEventListener("DOMContentLoaded", () => animationIntro());

/* FOR SLIDE CLASSES IN NAV LINK */
slidClasses(nav_bar, "active");

/* FOR PLAY GET DATA PRODUCT */
let data = getData("../src/data.json");

/* FUNCTION CREATE ELEMENT FOR PRODUCT HAVE */
export let created_element = await createElement(getDiscount(await data));

createElement && addToCart();
cart_btn.onclick = () => showCart();

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
    // TOGGLE ATTR SELECTED FOR SHOW CART
    cart_btn.toggleAttribute("selected");
    cart_buy.toggleAttribute("selected");

    // START CHECK IF CHANGE QUANTITY OF PRODUCT
    controlQuantity();

    // START CHECK IF CHANGE REMOVE OF PRODUCT
    controlRemoveProduct();

    // CALC TOTAL PRODUCTS IN CART
    calcTotal();

    // ON CLICK SHOW CARD PAYMENT FOR PAYMENT
    cart_buy.querySelector(".payment").onclick = () => showPaymentCard();
}

function showPaymentCard() {
    // GET ELEMENT DOM
    const btn_cancel = card_payment.querySelector(".cancel-payment");
    // FOR SHOW OR NONE CARD-PAYMENT
    card_payment.toggleAttribute("selected");
    // FOR HIDE CART-BUY
    cart_buy.toggleAttribute("selected");
    // IF CLICKED BTN CANCEL CANCEL PAYMENT
    btn_cancel.onclick = (e) => cancelPayment(e);
    // Validation Card Number
    validationCardNumber();
    // Validation Name
    validationName();
    // Validation Expiration Date
    validationExpirationDate();
    // VALIDATION CVV
    validationCvv();
}

function addToCart() {
    // GET ELEMENT DOM
    const btn_add = document.querySelectorAll(".add-to-cart");
    // LOOPING INTO ALL BUTTONS ADD AND CHECK IF CLICKED ANY BUTTON FOR ADD TO CART
    btn_add.forEach((btn) => (btn.onclick = () => add(btn.dataset)));
    /**
     *
     * @param {*} DATA PRODUCT WE ADD IN THE CART
     */
    function add(data) {
        // GET HTML MARKUP FOR PRODUCT WE ADD IN THE CART
        let product = codeHtmlProduct();
        document.querySelector(".cart-products").innerHTML += product; // ADD PRODUCT TO THE CART
        function codeHtmlProduct() {
            // THIS IS HTML CODE FOR PRODUCT
            return `<div class="product">
                        <img src="${data.dirImg}">
                        <div class="info-product">
                            <div class="info">
                                <h2>${data.productName}</h2>
                                <span>${data.productPlatform}</span>
                                <i class="fa-solid fa-circle-check"></i>
                            </div>
                            <div class="control-quantity">
                                <i class="fa-solid fa-circle-plus fa-fw" id="quantity-increment"></i>
                                <span id="quantity" data-max-quantity = ${data.quantity}>1</span>
                                <i class=" fa-solid fa-circle-minus fa-fw" id="quantity-decrement"></i>
                            </div>
                            <div class="mony">
                                <span class="price">$<span class="clean-price" data-price-unit=${data.price}>${data.price}</span></span>
                                <span class="remove-product">Remove</span>
                            </div>
                        </div>
                    </div> `;
        }
    }
}

function controlQuantity() {
    document.querySelectorAll(".control-quantity").forEach((element, index) => {
        // CHECK IF QUANTITY INCREMENT OR DECREMENT FOR ANY PRODUCT IN THE CART
        element.querySelector("#quantity-increment").onclick = () =>
            increment(element, index); // INCREMENT QUANTITY PRODUCT
        element.querySelector("#quantity-decrement").onclick = () =>
            decrement(element, index); // DECREMENT QUANTITY PRODUCT
    });

    function increment(element, index) {
        const quantity = element.querySelector("#quantity");
        const max = +quantity.dataset.maxQuantity;
        parseInt(quantity.innerHTML) < max && quantity.innerHTML++; //  CHECK IF NOT OVERFLOW MAX QUANTITY
        calcQuantityProduct(index, +quantity.innerHTML); // CALC QUANTITY OF PRODUCT WHICH INCREMENT
        calcTotal(); // CALC TOTAL OF ALL PRODUCTS AFTER WE INCREMENT QUANTITY OF PRODUCT
    }

    function decrement(element, index) {
        const quantity = element.querySelector("#quantity");
        parseInt(quantity.innerHTML) != 1 && quantity.innerHTML--; // CHECK IF NOT OVERFLOW MIN QUANTITY
        calcQuantityProduct(index, +quantity.innerHTML); // CALC QUANTITY OF PRODUCT WHICH DECREMENT
        calcTotal(); // CALC TOTAL OF ALL PRODUCTS AFTER WE DECREMENT QUANTITY OF PRODUCT
    }

    function calcQuantityProduct(i, quantity) {
        const e_prix = document.querySelectorAll(".cart-products  .clean-price")[i];
        e_prix.innerHTML = e_prix.dataset.priceUnit * quantity;
    }
}

function controlRemoveProduct() {
    // ADD EVENT IF CLICKED IN ELEMENT REMOVE ALL PRODUCT
    document.querySelector(".remove-all").onclick = () => removeAllProduct();

    document.querySelectorAll(".remove-product").forEach((element) => {
        element.onclick = () => removeItem(getParentElement(element, 3));
    });

    function removeAllProduct() {
        document.querySelectorAll(".cart-products .product").forEach((product) => {
            document.querySelector(".cart-products").removeChild(product); // REMOVE ANY PRODUCT IN THE CART
        });
        calcTotal(); // CALC THE TOTAL PRICE AFTER REMOVE ALL PRODUCT
    }

    function removeItem(index) {
        document.querySelector(".cart-products").removeChild(index);
        calcTotal();
    }
}

function calcTotal() {
    /** CHECK IF THE CART IS NOT EMPTY
     *? TRUE => SHOW TOTAL PRICE
     *! FALSE => SHOW EMPTY TOTAL PRICE
     * */
    NotEmptyCart() ? getTotalPrice() : emptyTotal();

    function emptyTotal() {
        document.querySelector(".total-price .price").innerHTML = "$0"; // ADD 0 WHERE WE SHOW TOTAL PRICE
    }

    function NotEmptyCart() {
        return document.querySelector(".cart-products").children.length > 0; // CHECK IF THE CART IS NOT EMPTY
    }

    function getTotalPrice() {
        let total = 0; // SET OPTION
        let cart = document.querySelectorAll(".cart-products .clean-price"); // GET ELEMENT DOM
        cart.forEach((e) => {
            total += +e.innerHTML;
        });
        document.querySelector(".total-price .price").innerHTML = "$" + total;
    }
}

function cancelPayment(event) {
    event.preventDefault();
    cart_buy.toggleAttribute("selected");
    card_payment.toggleAttribute("selected");
}

function validationCardNumber() {
    const allInput = card_payment.querySelectorAll("#card-number > input");
    allInput.forEach((input, index) => {
        input.oninput = () => {
            // CHECK IF NOT OVERFLOW
            overflowLength(input) && blockInput(input);
            checkIfFinished(input) ? idDone(input) : idError(input);
        };
    });
}

function validationName() {
    let nameInput = card_payment.querySelector("#card-holder");
    nameInput.oninput = () => {
        checkName(nameInput) ? idDone(nameInput) : idError(nameInput);
    };

    function checkName(name) {
        return name.value.length >= name.minLength && name.value.match(/^[a-z]/gi);
    }
}

function validationExpirationDate() {
    const input_month = card_payment.querySelector("#expiration-month");
    const input_year = card_payment.querySelector("#expiration-year");

    input_year.oninput = () => {
        overflowLength(input_year) && blockInput(input_year);
        checkYearInput(input_year) ? idDone(input_year) : idError(input_year);
    };

    input_month.oninput = () => {
        checkMonth(input_month) ? idDone(input_month) : idError(input_month);
    };

    function checkMonth(month) {
        return month.value >= new Date().getMonth() + 1;
    }

    function checkYearInput(year) {
        return year.value.match(/20[2-9]{1}\d{1}/gi);
    }
}

function validationCvv() {
    const input_cvv = document.querySelector("#cvv");
    input_cvv.oninput = () => {
        overflowLength(input_cvv) && blockInput();
        checkCvv(input_cvv) ? idDone(input_cvv) : idError(input_cvv);
    };

    function checkCvv(cvv) {
        return cvv.value.match(/^[0-9]{3,4}$/) && !cvv.value.includes("0");
    }
}

function idDone(input) {
    input.id = "done";
}

function idError(input) {
    input.id = "error";
}

function overflowLength(input) {
    return input.value.length > input.maxLength;
}

function blockInput(input) {
    input.value = input.value.slice(0, input.maxLength);
}

function checkIfFinished(input) {
    return input.value.length == input.maxLength;
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