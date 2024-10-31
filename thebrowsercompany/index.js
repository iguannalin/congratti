function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let emojis = [];
fetch("emojis.json").then((r) => r.json()).then((d) => {
  emojis = d;
});

function getEmojiFromWord(input) {
  const keywords = input.split(" ");
  let found = [];
  keywords.forEach((word) => {
    if (!word) return;
    word = word.toLowerCase();
    const tempFound = Object.keys(emojis).filter((key) => {
      return key.startsWith(word) || key.includes(word);
    });
    if (tempFound.length > 0) {
      found = found.concat(tempFound);
    }
  });

  if (found.length > 0) {
    return emojis[found[getRandomInt(0, found.length)]];
  }
  const emojiKeys = Object.keys(emojis);
  return emojis[emojiKeys[getRandomInt(0, emojiKeys.length)]];
}

window.addEventListener("load", () => {

  fetch("index.json").then((r) => r.json()).then((d) => {
    displayText(Array.from(d));
  });

  function displayText(texts) {
    const offset = 200;

    function toggleHideWindow(e) {
      e.target.style.visibility = "hidden";
    }

    texts.forEach((node, index) => {
      const top = (index + 1) * offset;
      const left = +getRandomInt(0, (window.innerWidth - (offset * 2)));
      const browserWindow = document.createElement("browser-window");
      document.body.appendChild(browserWindow);
      ["title", "text", "image"].forEach((attr) => {
        if (node[attr])
          browserWindow.shadowRoot.querySelector(`[name="browser-${attr}"]`).innerHTML = node[attr];
      });
      browserWindow.shadowRoot.querySelector(".window").classList.add((index % 2 === 0) ? "even" : "odd");
      browserWindow.style.top = `${top + 100}px`;
      browserWindow.style.left = `${left + 100}px`;
      browserWindow.style.zIndex = index;

      const emojiWindow = document.createElement("browser-window");
      document.body.appendChild(emojiWindow);
      if (node["text"]) emojiWindow.shadowRoot.querySelector(`[name="browser-text"]`).innerHTML = getEmojiFromWord(node["text"]);
      emojiWindow.shadowRoot.querySelector(".window").classList.add("emoji");
      emojiWindow.style.top = `${top}px`;
      emojiWindow.style.left = `${left}px`;
      emojiWindow.style.visibility = "visible";
      emojiWindow.style.zIndex = -1;
      emojiWindow.addEventListener("click", (e) => {
        browserWindow.style.visibility = "visible";
        emojiWindow.style.display = "none";
        browserWindow.removeEventListener("mouseleave", toggleHideWindow);
      });
      emojiWindow.addEventListener("mouseenter", (e) => {
        browserWindow.style.visibility = "visible";
        browserWindow.addEventListener("mouseleave", toggleHideWindow);
      });

      emojiWindow.shadowRoot.querySelector(`[name="browser-close"]`).addEventListener("click", () => emojiWindow.style.display = "none");
      browserWindow.shadowRoot.querySelector(`[name="browser-close"]`).addEventListener("click", () => browserWindow.style.display = "none");
    });
  }
});

customElements.define('browser-window',
  class extends HTMLElement {
    constructor() {
      super();
      const template = document.getElementById('browser-template');
      const templateContent = template.content;
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = 'index.css';

      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.appendChild(link);
      shadowRoot.appendChild(templateContent.cloneNode(true));
    }
  });
