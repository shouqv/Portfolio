function init() {

  const levelVid = []
  let mouseX = 0
  let mouseY = 0
  let radiusCounter = 10
  let intersectedFlags = []
  let appended = false
  let flashlight = document.getElementById("flashlight");
  let mainText = document.querySelectorAll(".inMain")
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
    h1: { card1: "Intruder Within", card2: "ChemUlate", card3: "Under Construction" },
    p: {
      card1: "Intruder Within is an educational cybersecurity game developed in C# that teaches players key concepts of the CIA Triad: Confidentiality, Integrity, and Availability. It combines engaging gameplay with real-world cybersecurity scenarios to make learning both practical and interactive.\n\nPlayers take the role of an employee responsible for protecting company data. Each level focuses on one CIA principle and presents related challenges. By successfully completing levels, players earn clues that help them identify the intruder behind the attack and ultimately secure the company’s information.\n\nTechnolgies:"
      , card2: "\nChemUlate is a web-based chemical lab simulator that lets users safely perform virtual experiments. The project followed the software engineering life cycle, including planning and proposals, managing risks, defining user and system requirements, and creating system models like use case diagrams, sequence diagrams, and class diagrams.\n\n", card3: "Under Construction", card4: "Under Construction"
    },
    img: { card1: '<img class="card1content" style="width:20vw; height:6vw" src="./assets/intruderWithinTech.png">', card2: '<img class="card2content" style="width:15vw; height:10vw" src="./assets/LogInPage.png"> <img class="card2content" style="width:15vw; height:10vw" src="./assets/homePage.png"> <img class="card2content" style="width:15vw; height:10vw" src="./assets/labFolder.png"> <img class="card2content" style="width:15vw; height:10vw" src="./assets/periodicTable.png">', card3: "" }
  }


  //this when the page loads, the radius of the flash circle gets bigger, achived by manipulating the radius css var
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      radiusCounter += 1;
      flashlight.style.setProperty("--radius", radiusCounter + "em");
    }, i * 20);
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
        entry.target.classList.add("fade-in");

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


    if (event.target.id === "card1" && !appended) {
      levelVid.forEach(level =>
        projectPicsRight.append(level)
      )
      appended = true;
    }
  }




const section = document.querySelector(".skills-section");
const skillsContainers = document.querySelectorAll(".skills");

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      section.classList.add("visible");
      // sectionObserver.unobserve(section); 
    }
  });
});


const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // crediting https://developer.mozilla.org/en-US/docs/Web/CSS/:scope
      const skillItems = entry.target.querySelectorAll(":scope > .skill");

      skillItems.forEach((skill, index) => {
        setTimeout(() => {
          skill.classList.add("show");
        }, index * 50); 
      });
      // skillsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

skillsContainers.forEach((container) => skillsObserver.observe(container));
sectionObserver.observe(section);



  
}


document.addEventListener("DOMContentLoaded", init)