import { Product } from "./classProduct.js";
const parent_discount = main.querySelector("#discount .swiper-wrapper");
const shop_now = main.querySelector("#shop-now .all-products");

/* FOR start GET DATA PRODUCT */
export let data = await getData("../src/data.json");

/* FUNCTION CREATE ELEMENT FOR PRODUCT HAVE */
export let checkDiscountProducts = await createElement(
    getDiscount(await data),
    parent_discount
);
export let checkAllProducts = await createElement(await data, shop_now);

addToCart();

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

export async function createElement(data, parent) {
    parent.innerHTML = "";
    data.forEach((product) => new Product(product, parent).create());
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

function stars() {
    const stars = document.querySelectorAll(".stars i");
    stars.forEach((star) => {
        star.onclick = () =>
            star.id != "done" ? rate(star, true) : rate(star, false);
    });

    function rate(star, check) {
        let curr = star;
        while (curr != null) {
            curr.id = check ? "done" : "";
            curr.style.transform = check ? "rotate(1turn)" : "rotate(-1turn)";
            curr = check ? curr.previousElementSibling : curr.nextElementSibling;
        }
    }
}

function addToCart() {
    // GET ELEMENT DOM
    const btn_add = document.querySelectorAll(".add-to-cart");
    // LOOPING INTO ALL BUTTONS ADD AND CHECK IF CLICKED ANY BUTTON FOR ADD TO CART
    btn_add.forEach(
        (btn) => (btn.onclick = () => check(btn.dataset) && add(btn.dataset))
    );

    function add(data) {
        let product = ProductNode(data); // GET HTML MARKUP FOR PRODUCT WE ADD IN THE CART
        document.querySelector(".cart-products").innerHTML += product; // ADD PRODUCT TO THE CART
    }
}

function check(data) {
    let product_cart = document.querySelector(".cart-products").childNodes;
    return Array.from(product_cart).every((item) => {
        return item.id !== data.id; // Check for duplicates Products
    });
}

function ProductNode(data) {
    // THIS IS HTML CODE FOR PRODUCT
    return `<div class="product" id=${data.id}>
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