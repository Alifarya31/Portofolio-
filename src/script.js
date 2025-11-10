document.addEventListener("DOMContentLoaded", () => {
  // typing text hero
  const typed = new Typed(".typing-text", {
    strings: ["Da'i", "Pengajar Islam", "Mahasiswa STDI Imam Syafii Jember"],
    loop: true,
    typeSpeed: 55,
    backSpeed: 25,
    backDelay: 500,
  });

  // auto hide navbar click
  $(".click-trigger").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // automatic transparent navbar
  const navBar = document.getElementsByTagName("nav")[0];
  window.addEventListener("scroll", function () {
    if (window.scrollY > 1) {
      navBar.classList.replace("bg-transparent", "navbar-color");
    } else if (window.scrollY <= 0) {
      navBar.classList.replace("navbar-color", "bg-transparent");
    }
  });

  // fetchData API
  async function fetchData(type = "certification") {
    let response;
    if (type === "certification") {
      response = await fetch("certification/certification.json");
    } else {
      response = await fetch("project/project.json");
    }
    const data = await response.json();
    return data;
  }

  function showCertification(certification) {
    const certificationContainer = document.querySelector(
      ".certification .content"
    );
    if (!certificationContainer) return;

    let certificationHTML = "";
    certification.forEach((cert) => {
      certificationHTML += `
        <div class="box" data-aos="fade-down">
            <img draggable="false" src="${cert.image}" alt="certification"/>
            <div class="desc">
                <h3>${cert.name}</h3>
                <p>By <span>${cert.by}</span></p>
                <div class="credentials">
                    <a class="btn" target="_blank" href="${cert.links.credentials}">
                        view credentials <i class="fas fa-angle-right"></i>
                    </a>
                </div>
            </div>
        </div>`;
    });
    certificationContainer.innerHTML = certificationHTML;
  }

  function showProject(project) {
    const projectContainer = document.querySelector(".project .content");
    if (!projectContainer) return;

    let projectHTML = "";
    project.slice(0, 90).forEach((proj) => {
      projectHTML += `
        <div class="cards">
          <img draggable="false" src="${proj.image}" alt=""/>
          <div class="desc-content d-flex flex-column text-justify">
            <div class="tag">
              <h3>${proj.title}</h3>
              <h5>${proj.tech}</h5>
            </div>
            <div class="desc">
              <p>${proj.desc}</p>
              <div class="btns">
                <a href="${proj.links.demo}" class="btn" target="_blank">
                  <i class="fas fa-eye"></i> Demo
                </a>
                <a href="${proj.links.code}" class="btn" target="_blank">
                  <i class="fas fa-code"></i> Code
                </a>
              </div>
            </div>
          </div>
        </div>`;
    });
    projectContainer.innerHTML = projectHTML;
  }

  // Fetch certification & project data
  fetchData("certification").then((data) => showCertification(data));
  fetchData("project").then((data) => showProject(data));

  // loadmore button
  const loadmore = document.querySelector(".loadmore-btn");
  if (loadmore) {
    let currentItems = 3;
    loadmore.addEventListener("click", () => {
      const elementList = [
        ...document.querySelectorAll(".certification .content .box"),
      ];

      for (let i = currentItems; i < currentItems + 3; i++) {
        if (elementList[i]) {
          elementList[i].classList.add("d-block");
        }
      }
      currentItems += 3;

      if (currentItems >= elementList.length) {
        loadmore.classList.add("d-none");
      }
    });
  }

  // animate on scroll (AOS)
  AOS.init();

  // disable inspect element or dev mode
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });

  document.onkeydown = function (e) {
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) return false;
    if (e.ctrlKey && e.keyCode == "I".charCodeAt(0)) return false;
  };

  // Scrollspy bootstrap
  const scrollSpy = new bootstrap.ScrollSpy(document.body, {
    target: ".navbar",
  });

  // scroll reveal animation content
  const srtop = ScrollReveal({
    origin: "top",
    distance: "90px",
    duration: 1000,
    reset: true,
  });

  srtop.reveal(".home .content .intro h3", { delay: 300 });
  srtop.reveal(".home .content .intro p", { delay: 300 });
  srtop.reveal(".home .content .intro a", { delay: 400 });

  srtop.reveal(".home .image", { delay: 600 });
  srtop.reveal(".home .linkedin", { interval: 600 });
  srtop.reveal(".home .github", { interval: 600 });
  srtop.reveal(".home .instagram", { interval: 600 });

  srtop.reveal(".about .cv-btn", { delay: 200 });
});
