function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

window.addEventListener("load", () => {

  fetch("index.json").then((r) => r.json()).then((d) => {
    displayText(Array.from(d));
  });

  function displayText(texts) {
    let order = texts.length;
    const offset = 150;
    texts.forEach((node, index) => {
      const browserWindow = document.createElement("browser-window");
      document.body.appendChild(browserWindow);
      ["title", "text", "image"].forEach((attr) => {
        if (node[attr])
          browserWindow.shadowRoot.querySelector(`[name="browser-${attr}"]`).innerText = node[attr];
      });
      browserWindow.style.top = `${+getRandomInt(index * offset, window.innerHeight + index * offset)}px`;
      browserWindow.style.left = `${+getRandomInt(-offset, window.innerWidth - offset)}px`;
      browserWindow.style.zIndex = index;
      browserWindow.addEventListener("click", (e) => {
        browserWindow.style.zIndex = `${order += 1}`;
      })
    });
  }
});

customElements.define('browser-window',
  class extends HTMLElement {
    constructor() {
      super();

      const template = document.getElementById('browser-template');
      const templateContent = template.content;

      const shadowRoot = this.attachShadow({mode: 'open'});

      const style = document.createElement('style');
      style.src = "index.css";

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  });
