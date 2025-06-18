window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const photos = document.querySelector("#photos");
  const description = document.querySelector("#description");
  const name = document.querySelector("#name");
  const meow = document.querySelector("#meow");
  const photoButton = document.querySelector("#photo-button");
  const riverButton = document.querySelector("#river-button");
  const about = document.querySelector("#about");
  let freed = false;

  name.addEventListener("mouseenter", () => {
    meow.style.display = "block";
    name.addEventListener("mouseleave", () => {
      meow.style.display = "none";
    });
  });

  name.addEventListener('touchstart', () => {
    meow.style.display = "none" ? "block" : "none";
  }, { passive: false });

  function resetWindow() {
    photos.innerHTML = "";
    provideContext();
  }

  function provideContext(context = "") {
    description.innerHTML = context;
  }

  //
  // PHOTOS
  //

  function loadPhotos() {
    resetWindow();
    let photoFolders;
    fetch("public/photos.json").then((r => r.json())).then((d => {
        photoFolders = d.photos;
        const directory = photoFolders[getRandomInt(0, photoFolders.length)];
        for ( let i = 0; i < directory.count; i++ ) {
          const image = directory.images[i];
          if ( !image.src ) return;
          const div = document.createElement("div");
          const imageElement = document.createElement("img");
          imageElement.addEventListener("mouseenter", () => {
            description.innerHTML = image.title ? image.title : image.alt ? image.alt : "";
          });
          imageElement.src = image.src;
          if ( image.alt ) imageElement.alt = image.alt;
          if ( image.title ) imageElement.title = image.title;
          div.appendChild(imageElement);
          photos.appendChild(div);
        }
      }
    ));
  }

  function riverSpace() {
    riverButton.classList.toggle("selected");
    about.classList.toggle("spaced");
    freed = !freed;
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

  document.body.addEventListener("mousemove", (e) => drawDots(e));
  document.body.addEventListener("touchmove", (e) => drawDots(e, true));

  photoButton.addEventListener("mouseover", () => provideContext("view photos"))
  photoButton.addEventListener("click", loadPhotos);

  riverButton.addEventListener("click", riverSpace);

  loadPhotos();
});
