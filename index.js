window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
  const dotsContainer = document.getElementById("dots-container");
  const container = document.getElementById("container");

  let dotIndex = 0;
  const dotMax = 150;
  document.body.addEventListener("mousemove", (e) => {
    const dots = Array.from(document.getElementsByTagName("dot"));
    let dot;
    if (dots.length < dotMax) {
      dot = document.createElement("dot");
      dot.innerText = '.';
      dotsContainer.appendChild(dot);
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }
    if (dotIndex >= dotMax) dotIndex = 0;
    dot.style.left = `${e.x - 10}px`;
    dot.style.top = `${e.y - 12}px`;
  });

  document.body.addEventListener("touchmove", (e) => {
    const dots = Array.from(document.getElementsByTagName("dot"));
    let dot;
    if (dots.length < dotMax) {
      dot = document.createElement("dot");
      dot.innerText = '.';
      dotsContainer.appendChild(dot);
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }
    if (dotIndex >= dotMax) dotIndex = 0;
    dot.style.left = `${e.targetTouches[0].pageX}px`;
    dot.style.top = `${e.targetTouches[0].pageY}px`;
    dotsContainer.appendChild(dot);
  });
});