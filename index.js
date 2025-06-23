window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const description = document.querySelector("#description");
  const name = document.querySelector("#name");
  const meow = document.querySelector("#meow");
  const photoButton = document.querySelector("#photo-button");
  const waterButton = document.querySelector("#water-button");
  const about = document.querySelector("#about");
  const work = document.querySelector("#work");
  const projectList = document.querySelector("#project-list");
  const linkAbout = document.querySelector("#link-about");
  const linkWork = document.querySelector("#link-work");

  //
  // HELPERS
  //
  function provideContext(context = "") {
    description.innerHTML = context;
  }

  function createWindow(image, work = false) {
    const imageContext = image.title || image.alt;
    const text = `<!DOCTYPE html><html><head><title>${ imageContext }</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://annaylin.com/photo.css"/></head><body><div id="container"><img id=${ work ? "work" : null } alt=${ image.alt } src=${ "https://annaylin.com/" + image.src } /><sub id="context" data-info=${ btoa(imageContext) }></sub><svg width="0" height="0"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"></feTurbulence></filter></svg></div></body><script>const sub = document.getElementById('context'); if (sub.dataset && sub.dataset.info) sub.innerHTML = atob(sub.dataset.info);</script></html>`;
    const blob = new Blob([text], { type: "text/html" });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank', `location=0,menubar=0,status=0,scrollbars=0,toolbar=0,resizable=0,popup,width=440,height=500,left=${ getRandomInt(0, screen.width) },top=${ getRandomInt(0, screen.height) }`);
    window.URL.revokeObjectURL(blobUrl);
  }

  //
  // CONTENT
  //
  function loadContent(type) {
    if ( type === "about" ) {
      about.style.display = "block";
      work.style.display = "none";
    } else if ( type === "work" ) {
      about.style.display = "none";
      work.style.display = "block";
    }
    linkAbout.classList.toggle("selected");
    linkWork.classList.toggle("selected");
  }

  function loadWork() {
    fetch("public/projects.json").then((r => r.json())).then((d => {
      if ( !d["projects"] ) return;
      d["projects"].forEach(project => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");
        a.href = "javascript:void(0);";
        a.addEventListener("click", () => createWindow(project, true));
        img.src = project.src;
        img.alt = project.alt;
        const h2 = document.createElement("h2");
        h2.innerHTML = project.name;
        a.appendChild(img);
        a.appendChild(h2);
        li.appendChild(a);
        projectList.appendChild(li);
      });
    }));
  }

  //
  // PHOTOS
  //
  function loadPhotos() {
    provideContext();
    fetch("public/photos.json").then((r => r.json())).then((d => {
        const photoFolders = d.photos;
        if ( !photoFolders ) return;
        const directory = photoFolders[getRandomInt(0, photoFolders.length)]; // pick a random folder
        for ( let i = 0; i < directory.count; i++ ) {
          const image = directory.images[i];
          if ( !image.src ) return;
          setTimeout(() => createWindow({ ...image }), (i + 1) * 500);
        }
      }
    ));
  }

  //
  // WATER
  //
  function waterSpace() {
    waterButton.classList.toggle("selected");
    waterButton.title = waterButton.title === "water" ? "heaven" : "water";
    about.classList.toggle("spaced");
    loadContent("about");
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
      dot.style.left = `${ e.targetTouches[0].pageX }px`;
      dot.style.top = `${ e.targetTouches[0].pageY }px`;
    } else {
      dot.style.left = `${ e.x - 10 }px`;
      dot.style.top = `${ e.y - 12 }px`;
    }
    e.target.alt ? provideContext(e.target.alt) : e.target.title ? provideContext(e.target.title) : null;
    dotsContainer.appendChild(dot);
  }

  //
  // EVENTS
  //
  name.addEventListener("mouseenter", () => {
    meow.style.display = "block";
    name.addEventListener("mouseleave", () => {
      meow.style.display = "none";
    });
  });
  name.addEventListener('touchstart', () => {
    meow.style.display = "none" ? "block" : "none";
  }, { passive: false });
  linkAbout.addEventListener("click", () => loadContent('about'));
  linkWork.addEventListener("click", () => loadContent('work'));
  document.body.addEventListener("mousemove", (e) => drawDots(e));
  document.body.addEventListener("touchmove", (e) => drawDots(e, true));
  photoButton.addEventListener("mouseover", () => provideContext("view photos"))
  photoButton.addEventListener("click", loadPhotos);
  waterButton.addEventListener("click", waterSpace);
  about.addEventListener('click', (e) => {
    if ( e && e.target.tagName === 'A' ) {
      window.open(e.target.href, 'newwindow', `width=500,height=450,left=${ getRandomInt(0, screen.width) },top=${ getRandomInt(0, screen.height) }`);
      e.preventDefault();
      return false;
    }
  }, false);
  loadWork();
});
