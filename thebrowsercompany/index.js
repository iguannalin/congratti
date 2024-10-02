window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const container = document.querySelector(".container");
  const imageContainer = document.querySelector(".container-image");
  let delta = -1;
  setInterval(() => {
    if (+(imageContainer.style.opacity) == 1 || +(imageContainer.style.opacity) == 0) delta *= -1;
    imageContainer.style.opacity = +(imageContainer.style.opacity) + (delta * 0.05);
  }, 200);

  const tBody = document.querySelector("tbody");
  function displayContent(elements) {
    elements.forEach((elem) => {
      const h2 = document.createElement("h2");
      h2.innerText = elem.summary;
      const p = document.createElement("p");
      p.innerText = elem.details;
      tBody.appendChild(h2);
      tBody.appendChild(p);
    });
  }
  fetch("index.json").then((r) => r.json()).then((content) => {
    displayContent(content);
  });
});
