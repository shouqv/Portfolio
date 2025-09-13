function init() {
  let mouseX = 0;
  let mouseY = 0;
  let radiusCounter = 10;
  const levelVid = []


  let intersectedFlags = [];
  let appended = false;

  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")
  let movingDiv = document.querySelector(".movingDiv")
  let contactText = document.querySelector("footer h2")
  let projectCard = document.querySelector("#projectPanel")
  let projectWindow = document.getElementById("projectWindow")
  let closingBtn = document.getElementById("closingButton")
  let allProjectCard = document.querySelectorAll(".projectCard")
  const projectPicsRight = document.querySelector("#projectPicsRight");
  const projectWindowH2Tag = projectWindow.querySelector("h2");
  const projectWindowPTag = projectWindow.querySelector("p");
  const projectPicsLeftDiv = projectWindow.querySelector("#projectPicsLeft");



  closingBtn.addEventListener("click", closingProjectW)

  allProjectCard.forEach(card => {
    card.addEventListener("click", showCardInfo)
  }
  )


  //creating the view elements for the project pop up window
  //this could be improved later by setting the innerhtml of the left horz div 
  for (let i = 1; i <= 3; i++) {
    levelVid[i - 1] = document.createElement("video");
    levelVid[i - 1].src = `./assets/level${i}.mp4`;
    levelVid[i - 1].autoplay = true;
    levelVid[i - 1].muted = true;
    levelVid[i - 1].style.width = "30vw";
    levelVid[i - 1].style.height = "25vh";
  }


  //this is the content of the project to populate the project window dynamically
  let projectCardContents = {
    h1: { card1: "Intruder Within", card2: "ChemUlate", card3: "Under Construction", card4: "Under Construction" },
    p: {
      card1: "Intruder Intruder Within, is an interactive educational game designed to teach cybersecurity concepts through engaging gameplay and real-world scenarios. Players take on the role of employee entrusted with safeguarding confidential company data from intruders. After receiving an alert, they must secure the data and identify the intruder.\n\nThe game introduces key cybersecurity principles based on the CIA triad (Confidentiality, Integrity and Availability) through various levels and puzzlesthat keep players actively learning\n\nTechnolgies:"
      , card2: "\nChemUlate is a web-based chemical lab simulator that lets users safely perform virtual experiments. The project followed the software engineering life cycle, including planning and proposals, managing risks, defining user and system requirements, and creating system models like use case diagrams, sequence diagrams, and class diagrams.\n\n", card3: "Under Construction", card4: "Under Construction"
    },
    img: { card1: '<img style="width:20vw; height:6vw" src="./assets/intruderWithinTech.png">', card2: '<img style="width:15vw; height:10vw" src="./assets/LogInPage.png"> <img style="width:15vw; height:10vw" src="./assets/homePage.png"> <img style="width:15vw; height:10vw" src="./assets/labFolder.png"> <img style="width:15vw; height:10vw" src="./assets/periodicTable.png">', card3: "" }
  }


  //this when the page loads, the radius of the flash circle gets bigger, achived by manipulating the radius css var
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      radiusCounter += 1;
      flashlight.style.setProperty("--radius", radiusCounter + "em");
    }, i * 10);
  }


  // for isTouchDevice method, is copied from: https://codingartistweb.com/2025/07/flashlight-effect-with-html-css-and-javascript/
  const isTouchDevice = () => {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  function getMousePosition(e) {
    mouseX = !isTouchDevice() ? e.pageX : e.touches[0].pageX
    mouseY = !isTouchDevice() ? e.pageY : e.touches[0].pageY

    flashlight.style.setProperty("--Xpos", mouseX + "px")
    flashlight.style.setProperty("--Ypos", mouseY + "px")
  }

  flashlight.addEventListener("mousemove", getMousePosition);
  flashlight.addEventListener("touchmove", getMousePosition);
  // end of flashlight effect


  //syntax from https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#threshold
  let mainContentAnimationObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !intersectedFlags.find((element) => element === entry.target)) {

        //below manipulate the opacity of the text in main
        let opacity = 0
        for (let i = 0; i <= 100; i++) {
          setTimeout(() => {
            opacity += 0.01;
            entry.target.style.color = `rgba(224, 224, 224, ${opacity}`;

          }, i * 10);
        }

        if (entry.target.innerText.toLowerCase() === "skills") {
          //crediting the idea from:
          //https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_style_animation
          movingDiv.style.animation = "riseFade 2s both";
        }
        if (entry.target.innerText.toLowerCase() === "projects") {
          projectCard.style.animation = "riseFade 2s both";
        }

        intersectedFlags.push(entry.target)
      }
    });
  });

  mainText.forEach(element =>
    mainContentAnimationObserver.observe(element))




  //for the contact text, as the intersectionRatio increases, the scale css property increases
  // the idea was inspired from this website:https://spencergabor.work/ but i implemented it in my way
  let contactObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      let scale = entry.intersectionRatio + 0.1; // 0.1 to prevent the glitching from the start
      if (entry.isIntersecting) {
        entry.target.style.setProperty("--scaleVar", scale)
      }
    })
  }, {
    threshold: Array.from({ length: 100 }, (_, i) => i / 100) //syntax from https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n
  })

  contactObserver.observe(contactText)




  function closingProjectW() {
    projectWindow.style.display = "none";
    appended = false;
    while (projectPicsRight.hasChildNodes()) {
      projectPicsRight.removeChild(projectPicsRight.firstChild);
    }
  }

  function openingProjectW() {
    projectWindow.style.display = "block";
  }


  //populating the project window dynamically
  function showCardInfo(event) {
    openingProjectW();
    projectWindowH2Tag.innerText = projectCardContents.h1[`${event.target.id}`]
    projectWindowPTag.innerText = projectCardContents.p[`${event.target.id}`]
    projectPicsLeftDiv.innerHTML = projectCardContents.img[`${event.target.id}`]
    console.log(projectWindow.querySelector("#projectPicsLeft"))

    if (event.target.id === "card1" && !appended) {
      levelVid.forEach(level =>
        projectPicsRight.append(level)
      )
      appended = true;
    }
  }


}


document.addEventListener("DOMContentLoaded", init)