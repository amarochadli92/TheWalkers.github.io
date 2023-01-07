/** CLASS PRODUCT FOR BUILD DIV PRODUCT + APPEND IN PLACE WE SHOULD SHOW IN PAGE*/
export class Product {
    constructor(prod, target) {
        this.name = prod.name;
        this.product = prod;
        this.price = checkIfDiscounted(this.product);
        this.target = target;
    }
    create() {
        const product = createProduct();
        const product_img = createProductImg(this.product.img);
        const product_info = createProductInfo();
        const product_details = createProductDetails();
        const product_name = createProductName(this.product.name);
        const product_platform = createProductPlatform(this.product.platform);
        const product_price = createProductPrice(this.product, this.price);
        const product_buy = createProductBuy(this.product);
        const stars = createStarsRated(6);
        showProduct(this.target);

        function createProduct(index) {
            const div = document.createElement("div");
            div.classList.add("swiper-slide");
            div.classList.add("product");
            return div;
        }

        function createProductImg(dir) {
            const img = document.createElement("img");
            img.classList.add("product-img");
            img.src = dir;
            product.appendChild(img);
            return img;
        }

        function createProductInfo() {
            const div = document.createElement("div");
            div.classList.add("product-info");
            return div;
        }

        function createProductDetails() {
            const div = document.createElement("div");
            div.classList.add("details");
            return div;
        }

        function createProductName(name) {
            const span = document.createElement("span");
            span.classList.add("product-name");
            span.innerHTML = name;
            product_details.appendChild(span);
            return span;
        }

        function createProductPlatform(platform) {
            const span = document.createElement("span");
            span.classList.add("product-platform");
            span.innerHTML = platform;
            product_details.appendChild(span);
            return span;
        }

        function createProductPrice(product, price) {
            const product_price = productPrice();
            const product_price_old = product.discount && productPriceOld();
            const product_price_now = productPriceNow();

            function productPrice() {
                const span = document.createElement("span");
                span.classList.add("prix");
                return span;
            }

            function productPriceOld() {
                const product_price_old = document.createElement("span");
                product_price_old.classList.add("old");
                product_price_old.innerHTML = product.price + product.currency;
                product_price.appendChild(product_price_old);
                return product_price_old;
            }

            function productPriceNow() {
                const span = document.createElement("span");
                span.classList.add("now");
                span.innerHTML = price + product.currency;
                product_price.appendChild(span);
                return span;
            }
            product_details.appendChild(product_price);
            return product_price;
        }

        function createProductBuy(product) {
            const div = document.createElement("div");
            div.classList.add("buy");
            const button = document.createElement("button");
            button.className = "add-to-cart neon-button";
            button.innerHTML = '<i class="fa-brands fa-shopify"></i> Add To Panier';
            /*ADD DATA FOR PRODUCT IN DATASET BUTTON*/
            addDataSet();
            /********************************/
            div.appendChild(button);
            product_info.appendChild(product_details);
            product_info.appendChild(div);
            return div;

            function addDataSet() {
                button.dataset.productName = product.name;
                button.dataset.productPlatform = product.platform;
                button.dataset.oldPrice = product.price;
                button.dataset.discount = product.discount;
                button.dataset.price = product.price;
                button.dataset.quantity = product.quantity;
                button.dataset.quantity = product.quantity;
                button.dataset.dirImg = product.img;
            }
        }

        function createStarsRated(quantity) {
            const stars = document.createElement("div");
            stars.classList.add("stars");
            for (let i = 0; i < quantity; i++) {
                const star = document.createElement("i");
                star.className = "fa-regular fa-star";
                stars.appendChild(star);
            }
            product_info.appendChild(stars);
            return stars;
        }

        function showProduct(target) {
            product.appendChild(product_info);
            if (target.children[0].classList[2] == "is-loading") {
                target.innerHTML = "";
            }
            target.appendChild(product);
        }
    }
}
/** END CLASS PRODUCT */

/**
 *
 * @param {*} product
 * @returns price
 */
function checkIfDiscounted(product) {
    return !product.discount ? product.price : product.price - product.discount;
}