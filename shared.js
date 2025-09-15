// Constants
export const CONSTANTS = {
  DOT_MAX: 500,
  PHOTO_TIMEOUT_DELAY: 500,
  POPUP_WIDTH: 440,
  POPUP_HEIGHT: 500,
  WINDOW_WIDTH: 500,
  WINDOW_HEIGHT: 450,
  PHOTO_DELAY_MULTIPLIER: 1.5,
  RANDOM_CHANCE_THRESHOLD: 5
};

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

export function createSection(data) {
  const container = document.createElement("div");
  container.className = "resume " + data.title;
  const h2 = document.createElement("h2");
  h2.className = "title"
  h2.innerHTML = data.title;
  container.appendChild(h2);

  switch ( data.title ) {
    case "education":
      data.programs.forEach(section => {
        const h3 = document.createElement("h3");
        h3.innerHTML = section.title;
        container.appendChild(h3);
        const p = document.createElement("p");
        p.className = "indent";
        p.innerHTML = section.activities;
        container.appendChild(p);
      });
      break;
    case "skills":
      data.types.forEach((type) => {
        const h3 = document.createElement("h3");
        h3.innerHTML = type.title;
        container.appendChild(h3);
        const p = document.createElement("p");
        p.innerText = type.skills.join(", ");
        p.className = "tags";
        container.appendChild(p);
      });
      break;
    case "work":
      const projectsH3 = document.createElement("h3");
      projectsH3.innerHTML = "Projects";
      container.appendChild(projectsH3);
      data.projects.forEach((project) => {
        const h4 = document.createElement("h4");
        h4.innerHTML = project.title;
        container.appendChild(h4);
        const p = document.createElement("p");
        p.innerText = project.skills.join(", ");
        p.className = "tags";
        container.appendChild(p);
      });
      const rolesH3 = document.createElement("h3");
      rolesH3.innerHTML = "Roles";
      container.appendChild(rolesH3);
      data.roles.forEach((project) => {
        const h4 = document.createElement("h4");
        h4.innerHTML = project.title;
        container.appendChild(h4);
        if ( project["skills"] ) {
          const p = document.createElement("p");
          p.className = "tags";
          p.innerText = project["skills"].join(", ");
          container.appendChild(p);
        }
        if ( project ["tasks"] ) {
          project["tasks"].forEach(task => {
            const p = document.createElement("p");
            p.className = "indent";
            p.innerHTML = task;
            container.appendChild(p);
          })
        }
      });
      break;
    default:
      break;
  }
  return container;
}