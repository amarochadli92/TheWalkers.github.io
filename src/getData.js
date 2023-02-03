import { Product } from "./classProduct.js";
const parent_discount = main.querySelector("#discount .swiper-wrapper");
const shop_now = main.querySelector("#shop-now .all-products");
export let data = await getData("./src/data.json");
createAllProducts(await data);

async function getData(dir) {
    const response = await fetch(dir);
    const response_1 = await response.json();
    return response_1;
}

export async function createAllProducts() {
    let discountProduct = createProduct(getDiscount(data), parent_discount);
    let allProducts = createProduct(data, shop_now);
}

export async function createProduct(data, parent) {
    parent.innerHTML = "";
    data.forEach((product) => new Product(product, parent).create());
}

function getDiscount(data) {
    return data.filter((product) => {
        return product.discount != false;
    });
}