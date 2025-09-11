function init() {
let mouseX = 0;
let mouseY = 0;

let flashlight = document.getElementById("flashlight");



console.log(flashlight)

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    return true;
  } catch (e) {
    return false;
  }
};

function getMousePosition(e) {
  mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX;
  mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY;

  flashlight.style.setProperty("--Xpos", mouseX + "px");
  flashlight.style.setProperty("--Ypos", mouseY + "px");
}

flashlight.addEventListener("mousemove", getMousePosition);
flashlight.addEventListener("touchmove", getMousePosition);}


document.addEventListener("DOMContentLoaded", init)