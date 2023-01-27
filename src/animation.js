/* Start Global Functions */


function checkEndLoading() {
    return getComputedStyle(main).display == "inline";
}
/* End Global Functions */

/* Start Animation Intro */
let introInterval = setInterval(() => {
    checkEndLoading() && animationIntro(introInterval);
});

function animationIntro(idInterval = false) {
    document.querySelector(".intro-company .intro").id = "coming";
    idInterval && clearInterval(idInterval);
}

/* End Animation Intro */
/* Start Animation About Section */

let idInterval = setInterval(() => {
    if (checkEndLoading()) {
        check("#about", 3) && startAnimationAbout(idInterval);
        document.querySelector("#about").onmouseover = () =>
            startAnimationAbout(idInterval);
    }
});

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