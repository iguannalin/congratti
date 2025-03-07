import { createSection } from "../shared.js";
const left = document.querySelector("#left");
const right = document.querySelector("#right");

function loadResume() {
  fetch("resume.json").then(res => res.json()).then((data) => {
    Object.keys(data).forEach((key) => {
      if ( key === "header" ) return;
      const section = createSection(data[key]);
      if ( key === "work" ) right.appendChild(section);
      else left.appendChild(section);
    })
  });
}

loadResume();