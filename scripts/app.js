function init() {
  let mouseX = 0;
  let mouseY = 0;
  let radiusCounter = 10;
  let navPosition = -10;

  let intersectedFlags = [];

  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")
  // let movingText = document.querySelector(".movingText")
  // console.log(movingText)



  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      radiusCounter += 1;
      flashlight.style.setProperty("--radius", radiusCounter + "em");
    }, i * 10);
  }


  // crediting https://codingartistweb.com/2025/07/flashlight-effect-with-html-css-and-javascript/
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
  // end of flashlight effect
  }


      let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !intersectedFlags.find((element) => element === entry.target)) {
          
          let opacity = 0
          for (let i = 0; i <=100; i++) {
            setTimeout(() => {
              opacity += 0.01;
              entry.target.style.color = `rgba(224, 224, 224, ${opacity}`;
              
            }, i * 10);
          }


          // console.log(entry.target)
          intersectedFlags.push(entry.target)
        }
      });
    });

    mainText.forEach(element =>
    observer.observe(element))




      




    // let observer2 = new IntersectionObserver(function (entries) {
    //   entries.forEach(function (entry) {
    //     let leftPosition = -100
    //     let sec =1;
    //     while (entry.isIntersecting ) {
    
          
          
    //         setTimeout(() => {
    //           leftPosition += 1;
    //           entry.target.style.left=`${leftPosition}px`;
              
    //         }, 1000);
   
    //       // console.log(entry.target)
    //       intersectedFlags.push(entry.target)
    //     }
    //   });
    // });


    
      // observer2.observe(movingText)
    

  

  flashlight.addEventListener("mousemove", getMousePosition);
  flashlight.addEventListener("touchmove", getMousePosition);
}


document.addEventListener("DOMContentLoaded", init)