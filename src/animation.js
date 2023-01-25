/* START ANIMATION INTRO */
document.addEventListener("DOMContentLoaded", () => animationIntro());

function animationIntro() {
    document.querySelector(".intro-company .intro").id = "coming";
}
/* END ANIMATION INTRO */
/* Start Animation About Section */
let idInterval = setInterval(() => {
    check("#about", 3) && startAnimationAbout(idInterval);
    document.querySelector("#about").onmouseover = () =>
        startAnimationAbout(idInterval);
}, 100);

console.log(document.getElementById("marcus"));

function checkScrollPosition(index) {
    let heightSection = document.querySelector("section").clientHeight;
    return window.scrollY >= heightSection * index;
}

function startAnimationAbout(idInterval = false) {
    document.querySelector("#about .about-logo").style.animationName =
        "about-logo";
    document.querySelector("#about .about-text").style.animationName =
        "about-text";
    document.querySelector("#about .img-logo").style.animationName = "scale-logo";
    idInterval && clearInterval(idInterval);
}

function check(id, indexSection) {
    return hashCheck(id) || checkScrollPosition(indexSection);

    function hashCheck(id) {
        return window.location.hash == id;
    }

    function checkScrollPosition(indexSection) {
        let heightSection = document.querySelector("section").clientHeight;
        return window.scrollY >= heightSection * indexSection;
    }
}
/* End Animation About Section */