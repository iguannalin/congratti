let previousSelect;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function onSelectProject(e) {
  const selected = e.target.innerText;
  console.log('selected', selected);
  if (document.getElementById(selected)) {
    let subelem = document.getElementById(selected);
    subelem.style.display = "block";
    onSelect(null, "center");
  }
}

function onSelect(e, name="") {
  const select = document.getElementById("select");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const selected = e ? e.target.value : name;
  console.log(e ? e.target.value : name);
  console.log(select);
  select.value = selected;
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
    if (previousSelect) previousSelect.style.display = "none";
    elem.style.display = "block";
    previousSelect = elem;
  }
}

setTimeout(onSelect(null, "projects"),500); // remove later