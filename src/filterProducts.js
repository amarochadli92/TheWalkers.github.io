import { createAllProducts, data, createProduct } from "./getData.js";

const shop = main.querySelector("#shop-now"),
    allProducts = shop.querySelector(".all-products");

createAllProducts().then(() => {
    startFilterProduct();

    function startFilterProduct() {
        // Add Event Handler
        shop.querySelector(".search input").oninput = async(event) =>
            search(await dataFilter(event.target.value.toLowerCase()));
        shop.querySelector(".btn-filter").onclick = async() =>
            search(await dataFilter());
    }
    /**
     *
     * @param {*} val
     * @returns Data After Filtering
     */
    async function dataFilter(val = null) {
        return byPrice(byCategories(byPlatform(bySearch(data, val))));
    }
    // Check If Found Product Filtered
    function search(dataFiltered) {
        dataFiltered.length ? createProduct(dataFiltered, allProducts) : notFound();
    }
    // Filtering By Value Input Search
    function bySearch(data, val) {
        return data.filter((product) => {
            const productName =
                val && product.name.slice(0, val.length).toLowerCase();
            return val == null || productName == val;
        });
    }
    // Filter By Platform
    function byPlatform(data) {
        const platform = shop.querySelector("#platform").value;
        return data.filter(
            (product) => product.platform == platform || platform == "all"
        );
    }
    // Filter By Category
    function byCategories(data) {
        const category = shop.querySelector("#category").value;
        return data.filter(
            (product) => product.categories == category || category == "all"
        );
    }
    // Filter By Price
    function byPrice(data) {
        const [min, max] = [
            shop.querySelector("#min").value,
            shop.querySelector("#max").value,
        ];
        return data.filter((product) => {
            const price = product.price - product.discount;
            return (price <= max && price >= min) || (min == "" && max == "");
        });
    }
    // Reason If Didn't Found Product
    function notFound() {
        allProducts.innerHTML = `<div class="not-found">Not Found This Product</div>`;
    }
});