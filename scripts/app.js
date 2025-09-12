function init() {
  let mouseX = 0;
  let mouseY = 0;
  let radiusCounter = 10;
  

  let intersectedFlags = [];
  let divMoved = false;

  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")
  let movingDiv = document.querySelector(".movingDiv")
  let contactText = document.querySelector("footer h2")
  let projectCard = document.querySelector("#projectPanel")

  // let movingText = document.querySelector(".movingText")
  console.log(movingDiv)



  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      radiusCounter += 1;
      flashlight.style.setProperty("--radius", radiusCounter + "em");
    }, i * 10);
  }


  // for isTouchDevice method, crediting: https://codingartistweb.com/2025/07/flashlight-effect-with-html-css-and-javascript/
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  };

  function getMousePosition(e) {
    mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX
    mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY

    flashlight.style.setProperty("--Xpos", mouseX + "px")
    flashlight.style.setProperty("--Ypos", mouseY + "px")
    // end of flashlight effect
  }


//syntax from https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !intersectedFlags.find((element) => element === entry.target)) {

        let opacity = 0
        for (let i = 0; i <= 100; i++) {
          setTimeout(() => {
            opacity += 0.01;
            entry.target.style.color = `rgba(224, 224, 224, ${opacity}`;

          }, i * 10);
        }

        if (entry.target.innerText === "skills" ) {

          //crediting the idea from:
          //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation

          movingDiv.style.animation = "riseFade 2s both";
        }
        if (entry.target.innerText === "projects") {

          //crediting the idea from:
          //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation
          console.log("here")
          projectCard.style.animation = "riseFade 2s both";
        }
        console.dir(entry)
        console.dir(entry.target)
        intersectedFlags.push(entry.target)
      }
    });
  });

  mainText.forEach(element =>
  observer.observe(element))




//for the text
let observer3 = new IntersectionObserver(function (entries){
  entries.forEach((entry)=>
  {
    let scale=entry.intersectionRatio +0.1; // 0.1 to prevent the glitching from the start
    if (entry.isIntersecting) {
      entry.target.style.setProperty("--scaleVar",scale )
    }
  })
}, {
        threshold: Array.from({ length: 100 }, (_, i) => i / 100) //syntax from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
      })

observer3.observe(contactText)





  flashlight.addEventListener("mousemove", getMousePosition);
  flashlight.addEventListener("touchmove", getMousePosition);
}


document.addEventListener("DOMContentLoaded", init)