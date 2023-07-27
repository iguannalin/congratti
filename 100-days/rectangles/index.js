window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  let interval = 1000;

  const w = window.innerWidth - 50;
  const h = window.innerHeight - 50;
  const colors = [
    "#f0f921",
    "#fdc527",
    "#f89540",
    "#e66c5c",
    "#cc4778",
    "#aa2395",
    "#7e03a8",
    "#4c02a1",
    "#0d0887"
  ];
  const container = document.getElementById("container");
  let index = 0;
  function createRect() {
    if (interval === 0) interval = 1000;
    let rect = document.createElement('span');
    rect.style.width = `${getRandomInt(10, w/5)}px`;
    rect.style.height = `${getRandomInt(10, h/5)}px`;
    rect.style.top = `${getRandomInt(0, h)}px`;
    rect.style.left = `${getRandomInt(0, w)}px`;
    rect.style.backgroundColor = `${colors[index]}e0`;
    rect.addEventListener('click', () => {
      container.removeChild(rect);
      clearInterval(createRect);
      interval -= 10;
      setInterval(createRect, interval);
      return;
    });
    container.appendChild(rect);
    index = index > colors.length ? 0 : index + 1;
  }
  createRect();
});