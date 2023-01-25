window.addEventListener("load", () => {
    let img = document.getElementById("marcus");
    let isLoaded = img.complete && img.naturalHeight !== 0;
    alert(img.naturalHeight);
});