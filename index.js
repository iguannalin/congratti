window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  const table = document.getElementById("projects-table");
  const greeting = document.getElementById("greeting");
  const oopsies = document.getElementById("oops");
  const radioButtons = Array.from(document.getElementsByClassName("film-button"));
  const isSmallScreen = getComputedStyle(top).display != "none";
  let previousElement = center;
  let previousElementSub = greeting;

  const codeProjects = ["eeg cloud", "ai loves horror", "text me smth nice", "baby killer", "spotify recently added"];
  const printProjects = ["tableware", "filmotography", "reveries"]; // "generative riso poster"

  const titles = ["yosemite", "alaska", "eastcoast", "tableware", "reveries"];
  function switchFilmView(e = {target:{title:""}}) {
    let switches = [1,0,0,0,0];
    switch (e.target.title) {
      case "tableware":
        switches = [0,0,0,1,0];
        break;
      case "yosemite":
        switches = [1,0,0,0,0];
        break;
      case "alaska":
        switches = [0,1,0,0,0];
        break;
      case "east coast":
        switches = [0,0,1,0,0];
        break;
      case "reveries":
        switches = [0,0,0,0,1];
        break;
      default:
        switches = [0,0,0,0,0];
        break;
    }
    switches.forEach((on, index) => {
      if (on) document.getElementById(titles[index]).style.display = "flex";
      else document.getElementById(titles[index]).style.display = "none";
      if (index < 3) radioButtons[index].selected = on == 1;
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
    greeting.style.display = currentElement == center ? "flex" : "none";
    if (currentElement.id == "filmotography") switchFilmView({target:{title:"yosemite"}});
    if (currentElement.id == "tableware") switchFilmView({target:{title:"tableware"}});
    if (currentElement.id == "reveries") switchFilmView({target:{title:"reveries"}});
    if (currentElement == center) select.value = "center";
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
    switchView(elem, false, elem == center);
  }

  function oops(ev) {
    oopsies.onclick = null;
    const wp = document.getElementById("wallpaper");
    const temp = wp.style.content;
    wp.style.content = "url('public/anna.jpg')";
    switchView(center, false);
    setTimeout(() => {
      wp.style.content = temp;
      oopsies.onclick = (ev) => oops(ev);
    }, 350);
  }

  loadProjects(codeProjects, "code");
  loadProjects(printProjects, "print");

  select.onchange = (e) => onSelect(e);
  oopsies.onclick = (ev) => oops(ev);
  
  document.getElementById("home").onclick = () => {
    switchView(center, false);
  };
  
  radioButtons.forEach((button) => {
      button.addEventListener("click", switchFilmView);
  });

  document.body.addEventListener("mousemove", (e) => {
    const dot = document.createElement("dot");
    dot.style.left = `${e.x}px`;
    dot.style.top = `${e.y}px`;
    dot.innerText = '.';
    document.body.appendChild(dot);
  })
});