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
//
let all_validation = [];

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
    cart_buy.querySelector(".payment").onclick = () => toggleCardPayment();
}

function toggleCardPayment() {
    // GET ELEMENT DOM
    const btn_cancel = card_payment.querySelector(".cancel-payment");
    // IF CLICKED BTN CANCEL CANCEL PAYMENT
    btn_cancel.onclick = (e) => cancelPayment(e);
    // Emptying All Inputs Value
    emptyingAllInputs();
    // FOR SHOW OR NONE CARD-PAYMENT
    card_payment.toggleAttribute("selected");
    // FOR HIDE CART-BUY
    cart_buy.toggleAttribute("selected");
    // Start All Validation Inputs Value
    startAllValidation();
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

function startAllValidation() {
    // CHECK Card Number
    checkCardNumber();
    // CHECK Name
    checkName();
    // CHECK Expiration Date
    checkExpirationDate();
    // CHECK CVV
    checkCvv();
    // Check Payment
    checkPayment();

    function checkPayment() {
        let form = card_payment.querySelector("form");
        const payment_btn = card_payment.querySelector("[type='submit']");

        payment_btn.onclick = (e) => {
            e.preventDefault();
            validationAllInput() ? successfulPayment(form) : rejectedPayment(form);
        };
    }
}

function successfulPayment(form) {
    let ele_successful = successful(form); // Return Element Html for Success
    let exit_btn = ele_successful.querySelector("button"); // Button Exit After Success Payment
    exit_btn.addEventListener("click", () => exitPayment(form));

    function successful(form) {
        card_payment.removeChild(form);
        let div = document.createElement("div");
        div.className = "successful-pay";
        let h1 = document.createElement("h1");
        h1.innerHTML = "successful pay <i class='fa-solid fa-check-double'></i>";
        let exit_btn = document.createElement("button");
        exit_btn.innerHTML = "Exit";
        div.appendChild(h1);
        div.appendChild(exit_btn);
        card_payment.appendChild(div);
        return div;
    }
}

function rejectedPayment() {}

function exitPayment() {
    card_payment.removeChild(ele_successful);
    card_payment.appendChild(form);
    toggleCardPayment();
    emptyingCart();
}

function emptyingCart() {
    document.querySelector(".cart-products").innerHTML = "";
}

function validationAllInput() {
    // Start Validation
    all_validation[0] = validation(main.querySelectorAll("#card-number > input")); // Validation Card Number
    all_validation[1] = validation(main.querySelector("#card-holder")); // Validation Card Holder
    all_validation[2] = validation(main.querySelector("#expiration-month")); // Validation Expiration Month
    all_validation[3] = validation(main.querySelector("#expiration-year")); // Validation Expiration Year
    all_validation[4] = validation(main.querySelector("#cvv")); // Validation Cvv

    // Validation All
    const check_all_validation = all_validation.every((valid) => {
        return valid == true;
    });

    return check_all_validation;

    function validation(target) {
        if (target.length == 4)
        // Check If Is Card Number Because Card Number We Have 4 Input
            return Array.from(target).every((input) => input.className == "done");
        return target.className == "done";
    }
}

function emptyingAllInputs() {
    card_payment
        .querySelectorAll("input:not([type='submit']), select")
        .forEach((input) => {
            input.value = "";
            input.className = "";
        });
}

function cancelPayment(event) {
    event.preventDefault();
    cart_buy.toggleAttribute("selected");
    card_payment.toggleAttribute("selected");
}

function checkCardNumber() {
    const allInput = card_payment.querySelectorAll("#card-number > input");
    allInput.forEach((input, index) => {
        input.oninput = () => {
            // CHECK IF NOT OVERFLOW
            if (input.value != "") {
                overflowLength(input) && blockInput(input);
                checkIfFinished(input) ? $class(input, "done") : $class(input, "error");
            }
        };
    });
}

function checkName() {
    let i_name = card_payment.querySelector("#card-holder");
    i_name.oninput = () => {
        checkName(i_name) ? $class(i_name, "done") : $class(i_name, "error");
    };

    function checkName(name) {
        return name.value.length >= name.minLength && name.value.match(/^[a-z]/gi);
    }
}

function checkExpirationDate() {
    const i_month = card_payment.querySelector("#expiration-month");
    const i_year = card_payment.querySelector("#expiration-year");

    i_year.oninput = () => {
        overflowLength(i_year) && blockInput(i_year);
        checkYearInput(i_year) ? $class(i_year, "done") : $class(i_year, "error");
    };

    i_month.oninput = () => {
        checkMonth(i_month) ? $class(i_month, "done") : $class(i_month, "error");
    };

    function checkMonth(month) {
        return month.value >= new Date().getMonth() + 1;
    }

    function checkYearInput(year) {
        return year.value.match(/20[2-9]{1}\d{1}/gi);
    }
}

function checkCvv() {
    const i_cvv = document.querySelector("#cvv");
    i_cvv.oninput = () => {
        overflowLength(i_cvv) && blockInput(i_cvv);
        checkCvv(i_cvv) ? $class(i_cvv, "done") : $class(i_cvv, "error");
    };

    function checkCvv(cvv) {
        return cvv.value.match(/^[0-9]{3,4}$/);
    }
}

function $class(target, str) {
    target.className = str;
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