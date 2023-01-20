("use strict");
import { card_payment } from "./cardPayment.js";
const cart_btn = document.querySelector(".cart");
const cart_buy = document.querySelector(".cart-buy");

cart_btn.onclick = () => check() && showCart();

function showCart() {
    // TOGGLE ATTR SELECTED FOR SHOW CART
    cart_btn.toggleAttribute("selected");
    cart_buy.toggleAttribute("selected");
    controlQuantity(); // START CHECK IF CHANGE QUANTITY OF PRODUCT
    controlRemoveProduct(); // START CHECK IF CHANGE REMOVE OF PRODUCT
    calcTotal(); // CALC TOTAL PRODUCTS IN CART
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

function check() {
    return !card_payment.hasAttribute("selected");
}

export { cart_buy };