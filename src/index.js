const nav_bar = document.querySelectorAll(".link");

// Set Options
slidClasses(nav_bar, "active");

function slidClasses(target, str) {
    target.forEach((e) => {
        e.onclick = () => {
            removeAllClasses(target, str);
            e.classList.add("active");
        };
    });
}

function removeAllClasses(target, str) {
    target.forEach((e) => {
        e.classList.remove(str);
    });
}