window.addEventListener("load", () => {
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  let previousSelect = center;

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function onSelect(e) {
    window.navigator.vibrate(200);
    const selected = e.target.value;
    let elem;
    switch (selected) {
      case "projects":
        elem = left;
        break;
      case "about":
          elem = right;
          break;
      default:
        elem = center;
    }
    if (elem) {
      previousSelect.style.display = "none";
      elem.style.display = "block";
      previousSelect = elem;
    }
    console.log(e.target.value);
  }

  select.onchange = (e) => onSelect(e);
});