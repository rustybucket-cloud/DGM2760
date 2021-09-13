document.querySelector('header h1').innerText = "Inspector Clouseau";
document.querySelector('header h2').innerText = "Watch Out For Mr. Owl";

function reDisplay() {
    let windowSize = `Window size is ${window.innerWidth} pixels wide by ${window.innerHeight} pixels tall.`;
    let offset = `Window offset is ${window.screenX} from the left edge and ${window.screenY} from the top of the display`;
    document.querySelector('.window-size').innerText = `${windowSize} \n ${offset}`;
}
reDisplay();
window.addEventListener("resize", reDisplay);

document.querySelector('.url').innerText = `The page URL is ${document.URL}`;