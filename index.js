window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the//
                                                          // minimum is inclusive
  }

  const left = document.querySelector(".flex-pane.panel");
  const right = document.querySelector(".flex-pane.body");

  function cleanWindow() {
    left.innerHTML = "";
    right.innerHTML = "";
  }

  //
  // PHOTOS
  //

  const descriptionContainer = document.querySelector(".description-container");

  function loadPhotos() {
cleanWindow();
    let photoFolders;
    fetch("public/photos.json").then((r => r.json())).then((d => {
        photoFolders = d.photos
        const directory = photoFolders[getRandomInt(0, photoFolders.length)];
        for ( let i = 0; i < directory.count; i++ ) {
          const image = directory.images[i];
          const div = document.createElement("div");
          const imageElement = document.createElement("img");
          imageElement.addEventListener("mouseenter", () => {
            descriptionContainer.innerHTML = image.title ? image.title : image.alt ? image.alt : "";
          });
          imageElement.src = image.src;
          imageElement.alt = image.alt;
          imageElement.title = image.title;
          div.appendChild(imageElement);
          getRandomInt(0, 2) === 0 ? right.appendChild(div) : left.appendChild(div);
        }
      }
    ));
  }

  //
  // RESUME
  //

  function createSection(data) {
    const container = document.createElement("div");
    container.className = "resume " + data.title;
    const h2 = document.createElement("h2");
    h2.className = "title"
    h2.innerHTML = data.title;
    container.appendChild(h2);

    switch ( data.title ) {
      case "education":
        data.programs.forEach(section => {
          const h4 = document.createElement("h4");
          h4.innerHTML = section.title;
          container.appendChild(h4);
          const p = document.createElement("p");
          p.className = "indent";
          p.innerHTML = section.activities;
          container.appendChild(p);
        });
        break;
      case "skills":
        data.types.forEach((type) => {
          const h4 = document.createElement("h4");
          h4.innerHTML = type.title;
          container.appendChild(h4);
          const p = document.createElement("p");
          p.innerText = type.skills.join(", ");
          p.className = "skills tags";
          container.appendChild(p);
        });
        break;
      case "work":
        data.projects.forEach((project) => {
          const h4 = document.createElement("h4");
          h4.innerHTML = project.title;
          container.appendChild(h4);
          const p = document.createElement("p");
          p.innerText = project.skills.join(", ");
          p.className = "tags";
          container.appendChild(p);
        });
        data.roles.forEach((project) => {
          const h4 = document.createElement("h4");
          h4.innerHTML = project.title;
          container.appendChild(h4);
          if ( project["skills"] ) {
            const p = document.createElement("p");
            p.className = "tags";
            p.innerText = project["skills"].join(", ");
            container.appendChild(p);
          }
          if ( project ["tasks"] ) {
            project["tasks"].forEach(task => {
              const p = document.createElement("p");
              p.className = "indent";
              p.innerHTML = task;
              container.appendChild(p);
            })
          }
        });
        break;
      default:
        break;
    }
    return container;
  }

  function loadResume() {
    cleanWindow();
    fetch("resume/resume.json").then(res => res.json()).then((data) => {
      Object.keys(data).forEach((key) => {
        if ( key === "header" ) return;
        const section = createSection(data[key]);
        if ( key === "work" ) right.appendChild(section);
        else left.appendChild(section);
      })
    });
  }

  //
  // DOTS
  //

  const dotsContainer = document.getElementById("dots-container");

  let dotIndex = 0;
  const dotMax = 500;

  function drawDots(e, isTouch = false) {
    const dots = Array.from(document.getElementsByTagName("dot"));
    let dot;
    if ( dots.length < dotMax ) {
      dot = document.createElement("dot");
      dot.innerText = '.';
      dotsContainer.appendChild(dot);
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }

    if ( dotIndex >= dotMax ) dotIndex = 0;

    if ( isTouch ) {
      e.preventDefault();
      document.body.style.overflow = "hidden";
      dot.style.left = `${ e.targetTouches[0].pageX }px`;
      dot.style.top = `${ e.targetTouches[0].pageY }px`;
    } else {
      dot.style.left = `${ e.x - 10 }px`;
      dot.style.top = `${ e.y - 12 }px`;
    }
    dotsContainer.appendChild(dot);
  }

  document.body.addEventListener("mousemove", (e) => drawDots(e));
  document.body.addEventListener("touchmove", (e) => drawDots(e, true));

  const resumeView = document.querySelector("#resume-view");
  resumeView.addEventListener("click", loadResume);
  const photosView = document.querySelector("#photos-view");
  photosView.addEventListener("click", loadPhotos);

  loadPhotos();
});