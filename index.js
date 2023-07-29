window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  const table = document.getElementById("projects-table");
  const greeting = document.getElementById("greeting");
  const oopsies = document.getElementById("oops");
  const isSmallScreen = getComputedStyle(top).display != "none";
  let previousElement = center;
  let previousElementSub = greeting;

  const codeProjects = ["ai loves horror", "text me smth nice", "baby killer", "spotify recently added"];
  const printProjects = ["generative riso poster", "badwatercolor", "creative coding"];  // "filmotography",
  const workshopProjects = ["hacking with the browser workshop"];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  function switchView(currentElement, isSubView = false, isHome = false) {
    if (isSubView) { // project view
      if (isSmallScreen) {
        left.style.display = "none";
        right.style.display = "none";
        center.style.display = "block";
        select.value = "center";
        previousElement = center; // since we got here from projects tab
      }
      // turn off previous, turn on current
      previousElementSub.style.display = "none";
      currentElement.style.display = "block";
      previousElementSub = currentElement;
    } else { // all other tabs
      if (isSmallScreen) {
        previousElement.style.display = "none";
        currentElement.style.display = "block";
        previousElement = currentElement;
      }
      previousElementSub.style.display = "none";
      previousElement.style.display = "none";
      currentElement.style.display = "block";
      previousElement = currentElement;
    }
    greeting.style.display = isHome ? "flex" : "none";
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
    switchView(elem);
  }

  function oops(ev) {
    oopsies.onclick = null;
    const wp = document.getElementById("wallpaper");
    wp.src = "public/anna.jpg";
    switchView(center, false, true);
    setTimeout(() => {
      wp.src="public/wallpaper.png";
      oopsies.onclick = (ev) => oops(ev);
    }, 250);
  }

  loadProjects(codeProjects, "code");
  loadProjects(printProjects, "print");
  loadProjects(workshopProjects, "workshop");

  select.onchange = (e) => onSelect(e);
  oopsies.onclick = (ev) => oops(ev);
  document.getElementById("home").onclick = () => {
    switchView(center, false, true);
  };
});