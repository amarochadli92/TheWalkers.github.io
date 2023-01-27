export let checkEndLoading = startLoading();

export function startLoading() {
    let check = false;
    window.addEventListener("load", () => {
        let img = document.getElementById("marcus");
        let isLoaded = img.complete && img.naturalHeight !== 0;
        isLoaded && setTimeout(() => endLoading(), 1000);
    });
    return check;
}

function endLoading() {
    document.querySelector(".loading").style.display = "none";
    main.style.display = "initial";
    return true;
}