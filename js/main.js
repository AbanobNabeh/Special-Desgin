let mainColor = localStorage.getItem("color_option");
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background-option");
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
const randomBackgroundEl = document.querySelectorAll(".random-backround span");

if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
    setimageList();
  }
  document.querySelectorAll(".random-backround span").forEach((element) => {
    element.classList.remove("active");
  });
  if (backgroundLocalItem === "true") {
    document.querySelector(".yes").classList.add("active");
  } else {
    document.querySelector(".no").classList.add("active");
  }
}

document.querySelector(".toggel-setting i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

randomBackgroundEl.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    if (e.target.dataset.background === "yes") {
      localStorage.setItem("background-option", true);
      backgroundOption = true;
      document.querySelector(".img-list").remove();
      randomizeImgs();
    } else {
      backgroundOption = false;
      localStorage.setItem("background-option", false);
      setimageList();
      clearInterval(backgroundInterval);
    }
  });
});

function randomizeImgs() {
  if (backgroundOption) {
    backgroundInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgsArray.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

function setimageList() {
  if (document.getElementsByClassName("img-list").length === 0) {
    landingPage.style.backgroundImage = `url('../imgs/${imgsArray[0]}')`;
    let imgDiv = document.createElement("div");
    imgDiv.classList.add("img-list");
    let imgUl = document.createElement("ul");
    for (let i = 0; i < imgsArray.length; i++) {
      let liElement = document.createElement("li");
      i === 0 ? liElement.classList.add("active") : null;
      liElement.dataset.index = i;
      liElement.textContent = `${i + 1}`;
      imgUl.appendChild(liElement);
    }
    imgDiv.appendChild(imgUl);
    document.querySelector(".random-backround").appendChild(imgDiv);
    const imageList = document.querySelectorAll(".img-list ul li");
    imageList.forEach((li) => {
      li.addEventListener("click", (e) => {
        landingPage.style.backgroundImage =
          'url("imgs/' + imgsArray[e.target.dataset.index] + '")';
        imageList.forEach((element) => {
          element.classList.remove("active");
          element.classList.remove("item");
        });
        e.target.classList.add("active");
      });
    });
  }
}

let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
  let skillsOffesetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop > skillsOffesetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skill-box .progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.append(popupBox);

    let closeBtn = document.createElement("span");
    let textClose = document.createTextNode("X");
    closeBtn.appendChild(textClose);
    closeBtn.className = "close-btn";
    popupBox.appendChild(closeBtn);
  });
});

document.addEventListener("click", function (e) {
  if (e.target.className == "close-btn") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allBuleets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

function scrollTo(element) {
  element.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}

scrollTo(allBuleets);
scrollTo(allLinks);
randomizeImgs();

let bulletSpan = document.querySelectorAll(".bullet-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocal = localStorage.getItem("bullet_option");

if (bulletLocal !== null) {
  bulletSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocal === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}

bulletSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullet_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullet_option", "none");
    }
    handleActive(e);
  });
});

document.querySelector(".reset-option").onclick = function () {
  localStorage.clear();
  window.location.reload();
};

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

tLinks.onclick = function (e) {
  e.stopPropagation();
};

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  } else {
  }
});
