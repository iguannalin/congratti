window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  const table = document.getElementById("projects-table");
  const greeting = document.getElementById("greeting");
  const isSmallScreen = () => getComputedStyle(top).display != "none";
  let previousSelect = center;
  let previousSelectSub = greeting;

  const codeProjects = ["ai loves horror", "text me smth nice", "baby killer", "spotify recently added"];
  const printProjects = ["generative", "filmotography", "badwatercolor", "creative"];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function switchView(currentElement, isSubView = false) {
    if (isSubView) { // project view
      if (isSmallScreen) {
        left.style.display = "none";
        right.style.display = "none";
        center.style.display = "block";
        select.value = "center";
        previousSelect = left; // since we got here from projects tab
      }
      // turn off previous, turn on current
      previousSelectSub.style.display = "none";
      currentElement.style.display = "block";
      previousSelectSub = currentElement;
    } else { // all other tabs
      if (isSmallScreen) {
        // TODO -- make this a function?
        previousSelect.style.display = "none";
        currentElement.style.display = "block";
        previousSelect = currentElement;
      }
    }
  }

  function loadProjects(projects, label) {
    const ptr = document.createElement('tr');
    const th = document.createElement('td');
    th.innerText = label;
    ptr.appendChild(th);
    table.appendChild(ptr);
    projects.forEach((p) => {
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      const a = document.createElement('a');
      a.href = "javascript:void(0);";
      a.onclick = onSelectProject;
      a.innerText = p;
      td.appendChild(a);
      tr.appendChild(td);
      table.appendChild(tr);
    })
  }

  function onSelectProject(e) {
    const selected = e.target.innerText.split(" ")[0];
    if (document.getElementById(selected)) {
      let subelem = document.getElementById(selected);
      console.log({previousSelect},{previousSelectSub},{subelem})
      switchView(subelem, true);
    }
  }

  function onSelect(e) {
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
        break;
    }
    console.log({elem}, {previousSelect})
    if (elem) {
      previousSelectSub.style.display = "none";
      previousSelect.style.display = "none";
      elem.style.display = "block";
      previousSelect = elem;
      if (elem != center) center.style.display = "none";
    }
  }

  function oops(ev) {
    const wp = document.getElementById("wallpaper");
    wp.src = "public/anna.jpg";
    ev.preventDefault(); 
    switchView(center);
    greeting.style.display = "block";
    setTimeout(wp => wp.src='wallpaper.png', 1000);
  }

  loadProjects(codeProjects, "code");
  // loadProjects(printProjects, "print"); // TODO

  select.onchange = (e) => onSelect(e);
  document.getElementById("oops").onclick = (ev) => oops(ev);
});