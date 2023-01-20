import { cart_buy } from "./index.js";
const card_payment = document.querySelector(".card-payment");
let all_validation = [];

// ON CLICK SHOW CARD PAYMENT FOR PAYMENT
cart_buy.querySelector(".payment").onclick = () => toggleCardPayment();

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
}

function checkPayment() {
    let form = card_payment.querySelector("form");
    const payment_btn = card_payment.querySelector("[type='submit']");
    payment_btn.onclick = (e) => {
        e.preventDefault();
        validationAllInput() && successfulPayment(form);
    };
}

function successfulPayment(form) {
    let ele_successful = successful(form); // Return Element Html for Success
    let exit_btn = ele_successful.querySelector("button"); // Button Exit After Success Payment
    exit_btn.addEventListener("click", () => exitPayment(form, ele_successful)); // Check Click Exit Button For Exit
}

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

function exitPayment(form, ele_successful) {
    card_payment.removeChild(ele_successful); // remove Element Html for Success
    card_payment.appendChild(form); // Add Form In Card Payment
    toggleCardPayment(); // Toggle Card Payment For Don't Show
    emptyingCart(); // Emptying Cart After Pay All Products
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
}

function validation(target) {
    if (target.length == 4)
    // Check If Is Card Number Because Card Number We Have 4 Input
        return Array.from(target).every((input) => input.className == "done");
    return target.className == "done";
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
            overflowLength(input) && blockInput(input);
            checkIfFinished(input) ? $class(input, "done") : $class(input, "error");
        };
    });
}

function checkName() {
    let i_name = card_payment.querySelector("#card-holder");
    i_name.oninput = () => {
        checkName(i_name) ? $class(i_name, "done") : $class(i_name, "error");
    };

    function checkName(name) {
        return name.value.length >= name.minLength && !name.value.match(/[0-9]/gi);
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
        return year.value >= year.min;
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

export { card_payment };