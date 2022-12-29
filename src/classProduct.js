/** CLASS PRODUCT FOR BUILD DIV PRODUCT + APPEND IN PLACE WE SHOULD SHOW IN PAGE*/
export class Product {
    constructor(prod, index) {
        this.name = prod.name;
        this.priceOld = prod.price;
        this.price =
            prod.discount != false ? prod.price - prod.discount : prod.price;
        this.discount = prod.discount;
        this.platform = prod.platform;
        this.currency = prod.currency;
        this.quantity = prod.quantity;
        this.dirImg = prod.img;
        this.index = index;
    }
    create() {
        const product = createProduct(this.index);
        const product_img = createProductImg(this.dirImg);
        const product_info = createProductInfo();
        const product_details = createProductDetails();
        const product_name = createProductName(this.name);
        const product_platform = createProductPlatform(this.platform);
        const product_price = createProductPrice(this);
        const product_buy = createProductBuy();
        const div_quantity = createProductQuantity(this.quantity);
        const stars = createStarsRated(6);
        showProduct();

        function createProduct(index) {
            const div = document.createElement("div");
            div.classList.add("product");
            div.id = `rewind-item${index}`;
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

        function createProductPrice(product) {
            const product_price = productPrice();
            const product_price_old = productPriceOld();
            const product_price_now = productPriceNow();

            function productPrice() {
                const span = document.createElement("span");
                span.classList.add("prix");
                return span;
            }

            function productPriceOld() {
                if (product.discount != false) {
                    const product_price_old = document.createElement("span");
                    product_price_old.classList.add("old");
                    product_price_old.innerHTML = product.priceOld + product.currency;
                    product_price.appendChild(product_price_old);
                    return product_price_old;
                }
            }

            function productPriceNow() {
                const span = document.createElement("span");
                span.classList.add("now");
                span.innerHTML = product.price + product.currency;
                product_price.appendChild(span);
                return span;
            }
            product_details.appendChild(product_price);
            product_info.appendChild(product_details);
            return product_price;
        }

        function createProductBuy() {
            const div = document.createElement("div");
            div.classList.add("buy");
            const button = document.createElement("button");
            button.innerHTML = '<i class="fa-brands fa-shopify"></i> Add To Panier';
            div.appendChild(button);
            return div;
        }

        function createProductQuantity(quantity) {
            const div = createDivQuantity();
            const title = createTitleQuantity();
            const select = createSelectQuantity();
            product_buy.appendChild(div);
            product_info.appendChild(product_buy);

            function createDivQuantity() {
                const div = document.createElement("div");
                div.classList.add("quantity");
                return div;
            }

            function createTitleQuantity() {
                const title = document.createElement("span");
                title.innerHTML = "Choose Quantity";
                div.appendChild(title);
            }

            function createSelectQuantity() {
                const select = document.createElement("select");
                createOptionQuantity(quantity);
                select.name = "quantity";
                div.appendChild(select);

                function createOptionQuantity(quantity) {
                    for (let i = 1; i <= quantity; i++) {
                        const option = document.createElement("option");
                        option.value = i;
                        option.innerHTML = i;
                        select.appendChild(option);
                    }
                }
                return select;
            }
            return div;
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

        function showProduct() {
            product.appendChild(product_info);
            document.getElementById("rewind").appendChild(product);
        }
    }
}