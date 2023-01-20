const nav_bar = document.querySelectorAll(".link");
/* FOR SLIDE CLASSES IN NAV LINK */
slidClasses(nav_bar, "active");

/* START FUNCTION SLID CLASS
 * @param {array} nav_bar
 * @param {string} class_name
 */
function slidClasses(target, str) {
    target.forEach((e) => {
        e.onclick = () => {
            removeAllClasses(target, str);
            e.classList.add("active");
        };
    });
}
/* END FUNCTION SLID CLASS  */

/* START FUNCTION REMOVE ALL CLASSES
 * @param {array} target
 * @param {string} str
 */
function removeAllClasses(target, str) {
    target.forEach((e) => {
        e.classList.remove(str);
    });
}
/* END FUNCTION REMOVE ALL CLASSES */