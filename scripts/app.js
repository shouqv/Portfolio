function init() {
  let mouseX = 0;
  let mouseY = 0;
  let radiusCounter = 10;


  let intersectedFlags = [];
  let created=false;

  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")
  let movingDiv = document.querySelector(".movingDiv")
  let contactText = document.querySelector("footer h2")
  let projectCard = document.querySelector("#projectPanel")
  let projectWindow = document.getElementById("projectWindow")
  let closingBtn = document.getElementById("closingButton")
  let allProjectCard = document.querySelectorAll(".projectCard")


  // console.log(closingBtn)

  let projectCardContents = {
    h1: { card1: "Intruder Within", card2: "chemUlate", card3: "Under Construction", card4: "Under Construction" },
    p: {
      card1: "Intruder Intruder Within, is an interactive educational game designed to teach cybersecurity concepts through engaging gameplay and real-world scenarios. Players take on the role of employee entrusted with safeguarding confidential company data from intruders. After receiving an alert, they must secure the data and identify the intruder.\n\nThe game introduces key cybersecurity principles based on the CIA triad (Confidentiality, Integrity and Availability) through various levels and puzzlesthat keep players actively learning"
      , card2: "chemUlate", card3: "Under Construction", card4: "Under Construction"
    },
    img: { card1: "", card3: "", card4: "" }
  }



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

        if (entry.target.innerText === "skills") {

          //crediting the idea from:
          //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation

          movingDiv.style.animation = "riseFade 2s both";
        }
        if (entry.target.innerText === "projects") {

          //crediting the idea from:
          //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation
          // console.log("here")
          projectCard.style.animation = "riseFade 2s both";
        }
        // console.dir(entry)
        // console.dir(entry.target)
        intersectedFlags.push(entry.target)
      }
    });
  });

  mainText.forEach(element =>
    observer.observe(element))




  //for the text
  let observer3 = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      let scale = entry.intersectionRatio + 0.1; // 0.1 to prevent the glitching from the start
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--scaleVar", scale)
      }
    })
  }, {
    threshold: Array.from({ length: 100 }, (_, i) => i / 100) //syntax from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  })

  observer3.observe(contactText)


  function closingProjectW() {
    projectWindow.style.display = "none";
    created=false
     while (projectPics.hasChildNodes()) {
  projectPics.removeChild(projectPics.firstChild);
  
}

  }

  function openingProjectW() {
    projectWindow.style.display = "block";
  }

  closingBtn.addEventListener("click", closingProjectW)



  allProjectCard.forEach(card => {
    // console.log("hey in the loop")
    console.log(card)
    card.addEventListener("click", showCardInfo)
  }

  )

  function showCardInfo(event) {
    openingProjectW();
    console.log(event.target)
    console.log(event.target.id)
    console.log(projectCardContents.h1[`${event.target.id}`])
    projectWindow.querySelector("h2").innerText = projectCardContents.h1[`${event.target.id}`]
    projectWindow.querySelector("p").innerText = projectCardContents.p[`${event.target.id}`]
    // projectWindow.querySelector("img").src = projectCardContents.img[`${event.target.id}`]
    const projectPics = document.querySelector("#projectPics");
    let levelVid=[]
    if (event.target.id === "card1" && !created) {
  for (let i = 1; i <= 3; i++) {
    levelVid[i-1] = document.createElement("video");
    levelVid[i-1].src = `./assets/level${i}.mp4`;
    levelVid[i-1].autoplay = true;
    levelVid[i-1].controls = true;
    levelVid[i-1].muted = true;
    levelVid[i-1].style.width = "30vw";
levelVid[i-1].style.height = "25vh";

    projectPics.append(levelVid[i-1]);
  }
  created = true;

} 
  }



  flashlight.addEventListener("mousemove", getMousePosition);
  flashlight.addEventListener("touchmove", getMousePosition);
}


document.addEventListener("DOMContentLoaded", init)