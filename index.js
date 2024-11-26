window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const tabButtons = Array.from(document.querySelectorAll("#select > button"));
  const table = document.getElementById("projects-table");
  const greeting = document.getElementById("greeting");
  const oopsies = document.getElementById("oops");
  const radioButtons = Array.from(document.getElementsByClassName("film-button"));
  const isSmallScreen = getComputedStyle(top).display !== "none";
  let previousElement = center;
  let previousElementSub = greeting;

  const physicalProjects = ["soft networks", "handhold mouse", "eeg cloud", "ai loves horror", "text me smth nice"];
  const analogProjects = ["tableware", "filmotography", "reveries"]; // "generative riso poster"

  const titles = ["yosemite", "alaska", "eastcoast", "tableware", "reveries"];

  function switchFilmView(e = {target: {title: ""}}) {
    let switches = [1, 0, 0, 0, 0];
    switch (e.target.title) {
      case "tableware":
        switches = [0, 0, 0, 1, 0];
        break;
      case "yosemite":
        switches = [1, 0, 0, 0, 0];
        break;
      case "alaska":
        switches = [0, 1, 0, 0, 0];
        break;
      case "east coast":
        switches = [0, 0, 1, 0, 0];
        break;
      case "reveries":
        switches = [0, 0, 0, 0, 1];
        break;
      default:
        switches = [0, 0, 0, 0, 0];
        break;
    }
    switches.forEach((on, index) => {
      if (on) document.getElementById(titles[index]).style.display = "flex";
      else document.getElementById(titles[index]).style.display = "none";
      if (index < 3) radioButtons[index].selected = on === 1;
    })
  }

  function switchView(currentElement, isSubView = false) {
    if (isSubView) { // project view
      if (isSmallScreen) {
        left.style.display = "none";
        right.style.display = "none";
        center.style.display = "block";
        previousElement = center; // since we got here from projects tab
      }
      // turn off previous, turn on current
      if (previousElementSub.id.includes("filmotography")) switchFilmView();
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
    greeting.style.display = currentElement === center ? "flex" : "none";
    if (currentElement.id === "filmotography") switchFilmView({target: {title: "yosemite"}});
    if (currentElement.id === "tableware") switchFilmView({target: {title: "tableware"}});
    if (currentElement.id === "reveries") switchFilmView({target: {title: "reveries"}});
  }

  function loadProjects(projects, label) {
    const ptr = document.createElement('tr');
    const th = document.createElement('th');
    const th3 = document.createElement('h3');
    th3.innerText = label;
    th.appendChild(th3);
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
      let subelement = document.getElementById(selected);
      location.hash = selected;
      switchView(subelement, true);
    }
  }

  function onSelect(e) {
    const selected = e.target.innerText;
    let elem;
    switch (selected) {
      case "☼":
        elem = left;
        break;
      case "about":
        elem = right;
        break;
      case "work":
        location.href = "https://annaylin.com/portfolio/";
        break;
      default:
        elem = center;
        break;
    }
    switchView(elem, false);
  }

  function oops() {
    oopsies.onclick = null;
    const wp = document.getElementById("wallpaper");
    const temp = wp.style.content;
    wp.style.content = "url('public/anna.png')";
    switchView(center, false);
    setTimeout(() => {
      wp.style.content = temp;
      oopsies.onclick = () => oops();
    }, 350);
  }

  loadProjects(physicalProjects, "physical");
  loadProjects(analogProjects, "analog");
  loadProjects([], "digital");

  tabButtons.forEach((elem) => {
    elem.onclick = (e) => onSelect(e);
  });
  oopsies.onclick = oops;

  radioButtons.forEach((button) => {
    button.addEventListener("click", switchFilmView);
  });

  let dotIndex = 0;
  const dotMax = 150;
  document.body.addEventListener("mousemove", (e) => {
    const dots = Array.from(document.getElementsByTagName("dot"));
    let dot;
    if (dots.length < dotMax) {
      dot = document.createElement("dot");
      dot.innerText = '.';
      document.body.appendChild(dot);
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }
    if (dotIndex >= dotMax) dotIndex = 0;
    dot.style.left = `${e.x}px`;
    dot.style.top = `${e.y}px`;
  });

  document.body.addEventListener("touchmove", (e) => {
    if (getComputedStyle(center).display === "none") {
      document.body.style.overflow = "visible";
      return;
    }
    e.preventDefault();
    document.body.style.overflow = "hidden";

    const dots = Array.from(document.getElementsByTagName("dot"));
    let dot;
    if (dots.length < dotMax) {
      dot = document.createElement("dot");
      dot.innerText = '.';
      document.body.appendChild(dot);
    } else {
      dot = dots[dotIndex];
      dotIndex++;
    }
    if (dotIndex >= dotMax) dotIndex = 0;
    dot.style.left = `${e.targetTouches[0].pageX}px`;
    dot.style.top = `${e.targetTouches[0].pageY}px`;
    document.body.appendChild(dot);
  });

  if (location.hash) onSelectProject({target: {innerText: location.hash.split("#")[1]}});
});