/* ADD EVENT DOM_CONTENT_LOADED FOR START ANIMATION */
document.addEventListener("DOMContentLoaded", () => animationIntro());

/* START ANIMATION INTRO
 * @param {array} target
 * @param {string} str
 */
function animationIntro() {
    /* ADD ID #COMING FOR SHOW HERO IMG IN */
    document.querySelector(".hero-two").id = "coming";
    document.querySelector(".hero-one").id = "coming";
    document.querySelector(".intro-company .intro").id = "coming";
}
/* END ANIMATION INTRO */