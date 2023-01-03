import { Swiper } from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";
import { created_element as check } from "./index.js";

newSwiper();
check && newSwiper();

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