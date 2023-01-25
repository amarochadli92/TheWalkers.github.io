import { Swiper } from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
import { createAllProducts } from "./getData.js";
createAllProducts().then(() => {
    newSwiper();
    stars();
});

function newSwiper() {
    var swiper = new Swiper(".mySwiper", {
        spaceBetween: 10,
        slidesPerGroup: 1,
        slidesPerView: 3,
        loopFillGroupWithBlank: false,
        loop: true,
        autoplay: true,
        pagination: { el: ".swiper-pagination" },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            650: {
                slidesPerView: 2,
            },
            992: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 4,
            },
        },
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