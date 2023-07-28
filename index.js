window.addEventListener("load", () => {
  const top = document.getElementById("top");
  const left = document.getElementById("left");
  const center = document.getElementById("center");
  const right = document.getElementById("right");
  const select = document.getElementById("select");
  const table = document.getElementById("projects-table");
  let previousSelect = center;

  const codeProjects = ["ai loves horror", "text me smth nice", "baby killer", "spotify recently added"]
  // ["ai", "text", "baby", "spotify"];
  const printProjects = ["generative", "filmotography", "badwatercolor", "creative"];

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
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
    console.log({selected})
    if (document.getElementById(selected)) {
      let subelem = document.getElementById(selected);
      if (getComputedStyle(top).display != "none") {
        left.style.display = "none";
        center.style.display = "block";
      }
      subelem.style.display = "block";
      select.value = "center";
    }
  }

  function onSelect(e, name="") {
    const selected = e ? e.target.value : name;
    if (!e) select.value = name
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
    console.log({elem}, {previousSelect})
    if (elem) {
      previousSelect.style.display = "none";
      elem.style.display = "block";
      previousSelect = elem;
    }
  }

  select.onchange = (e) => onSelect(e);
  // onSelect(null, "projects"); // remove later

  loadProjects(codeProjects, "code");
  loadProjects(printProjects, "print");
});