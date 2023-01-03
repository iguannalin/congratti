const POSITIONS = {
    0: [10, 10],
    1: [130, 10],
    2: [65, 100],
    3: [10, 190],
    4: [130, 190],
    5: [10, 95],
    6: [130, 120],
    7: [85, 215],
    8: [10, 220]
};

// Create a class for the element
class PopUpBox extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});
        this.style.display = 'none';

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', `wrapper resize draggable project-${this.getAttribute('color')}`);
        const pos = this.getAttribute('position');
        wrapper.style.transform = `translate(${POSITIONS[pos][0]}%, ${POSITIONS[pos][1]}%)`;

        const header = document.createElement('div');
        header.setAttribute('class', 'header');

        const title = this.getAttribute('id');

        const name = document.createElement('div');
        name.setAttribute('class', 'title');
        name.setAttribute('tabindex', '0');
        name.textContent = title.replace("popup-", "");

        const close = document.createElement('div');
        close.setAttribute('class', 'close');
        close.setAttribute('title', 'close');
        close.setAttribute('tabindex', '0');
        close.textContent = "X";
        close.addEventListener("click", () => this.style.display = 'none');

        header.appendChild(name);
        header.appendChild(close);

        // CONTENT
        // const type = this.getAttribute('popup-type');
        // console.log(type)

        const content = document.createElement('div');
        content.setAttribute('class', 'content');

        // Insert image
        if (this.hasAttribute('data-image')) {
            let imgUrl;
            imgUrl = this.getAttribute('data-image');
            let caption = this.getAttribute('data-caption');

            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = caption;
            const gallery = document.createElement('div');
            gallery.setAttribute("class", "gallery");
            gallery.appendChild(img);
            content.appendChild(gallery);
        }

        // Insert text
        if (this.hasAttribute('data-text')) {
            const info = document.createElement('div');
            info.setAttribute('class', 'info');
            info.innerHTML = this.getAttribute('data-text');
            content.appendChild(info);
        }

        // Apply external styles to the shadow DOM
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "style.css");
        shadow.appendChild(linkElem);

        wrapper.appendChild(header);
        wrapper.appendChild(content);
        shadow.appendChild(wrapper);
    }
}

// Define the new element
customElements.define('popup-box', PopUpBox);
