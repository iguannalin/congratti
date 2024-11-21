window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  const table = document.getElementById("work-table");
  const greeting = document.getElementById("greeting");
  const isSmallScreen = getComputedStyle(top).display !== "none";
  let previousElement = center;
  let previousElementSub = greeting;

  const work = ["HJL Archive", "ATT&CK Navigator", "CALDERA", "RMD", "Notifier", "Inheritance Center", "Superdiversity", "Pacific Workers' University"];
  const titles = ["Healing Justice Lineages", "MITRE", "Charles Schwab", "Stamen Design", "Farber & Co"];

  function switchView(currentElement, isSubView = false) {
    if (isSubView) { // project view
      if (isSmallScreen) {
        left.style.display = "none";
        right.style.display = "none";
        center.style.display = "block";
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
    greeting.style.display = currentElement === center ? "flex" : "none";
    if (currentElement === center) select.value = "center";
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
    const selected = e.target.innerText.split(" ")[0].toLowerCase();

    if (document.getElementById(selected)) {
      let subelement = document.getElementById(selected);
      location.hash = selected;
      select.value = selected;
      switchView(subelement, true);
    }
  }

  function onSelect(e) {
    const selected = e.target.value;
    let elem;
    switch (selected) {
      case "work":
        elem = left;
        break;
      case "about":
        elem = right;
        break;
      default:
        elem = center;
        break;
    }
    switchView(elem, false);
  }

  loadProjects(work.slice(0, 1), titles[0]);
  loadProjects(work.slice(1, 3), titles[1]);
  loadProjects(work.slice(3, 6), titles[2]);
  loadProjects(work.slice(6, 7), titles[3]);
  loadProjects(work.slice(7, 8), titles[4]);

  select.onchange = (e) => onSelect(e);

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