import { createSection } from "../shared.js";
const left = document.querySelector("#left");
const right = document.querySelector("#right");

function loadResume() {
  fetch("resume.json")
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => {
    Object.keys(data).forEach((key) => {
      if ( key === "header" ) return;
      const section = createSection(data[key]);
      if ( key === "work" ) right.appendChild(section);
      else left.appendChild(section);
    })
  })
  .catch(error => {
    console.error('Error loading resume:', error);
  });
}

loadResume();