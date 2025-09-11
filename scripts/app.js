function init() {
  let mouseX = 0;
  let mouseY = 0;
  let radiusCounter = 10;

  let intersectedFlags = [];

  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")


  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      radiusCounter += 1;
      flashlight.style.setProperty("--radius", radiusCounter + "em");
    }, i * 10);
  }

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


    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !intersectedFlags.find((element) => element === entry.target)) {
          
          let opacity = 0
          for (let i = 0; i <=10; i++) {
            setTimeout(() => {
              opacity += 0.1;
              entry.target.style.color = `rgba(224, 224, 224, ${opacity}`;
              console.log(opacity)
            }, i * 50);
          }


          // console.log(entry.target)
          intersectedFlags.push(entry.target)
        }
      });
    });

    mainText.forEach(element =>
      observer.observe(element))


  }

  flashlight.addEventListener("mousemove", getMousePosition);
  flashlight.addEventListener("touchmove", getMousePosition);
}


document.addEventListener("DOMContentLoaded", init)