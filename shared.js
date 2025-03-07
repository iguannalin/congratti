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
        const h4 = document.createElement("h4");
        h4.innerHTML = section.title;
        container.appendChild(h4);
        const p = document.createElement("p");
        p.className = "indent";
        p.innerHTML = section.activities;
        container.appendChild(p);
      });
      break;
    case "skills":
      data.types.forEach((type) => {
        const h4 = document.createElement("h4");
        h4.innerHTML = type.title;
        container.appendChild(h4);
        const p = document.createElement("p");
        p.innerText = type.skills.join(", ");
        p.className = "tags";
        container.appendChild(p);
      });
      break;
    case "work":
      data.projects.forEach((project) => {
        const h4 = document.createElement("h4");
        h4.innerHTML = project.title;
        container.appendChild(h4);
        const p = document.createElement("p");
        p.innerText = project.skills.join(", ");
        p.className = "tags";
        container.appendChild(p);
      });
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