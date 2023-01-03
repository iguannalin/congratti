// Create a class for the element
class PopUpBox extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper resize draggable');


        const header = document.createElement('div');
        header.setAttribute('class', 'header');
        const logo = document.createElement('div');
        logo.setAttribute('id', 'brand-name');
        logo.setAttribute('class', 'brand-logo');
        logo.setAttribute('tabindex', '0');
        logo.textContent = "anna";

        const close = document.createElement('div');
        close.setAttribute('class', 'close');
        close.setAttribute('tabindex', '0');
        close.textContent = "X";

        header.appendChild(logo);
        header.appendChild(close);

        // CONTENT
        const type = this.getAttribute('popup-type');
        console.log(type)

        const content = document.createElement('div');
        content.setAttribute('class', 'content');

        const info = document.createElement('div');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        console.log(this.getAttribute('data-text'));
        info.textContent = text;
        shadow.appendChild(wrapper);
        wrapper.appendChild(header);

        // Insert icon
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

        wrapper.appendChild(content);
        content.appendChild(info);

        // Apply external styles to the shadow DOM
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "style.css");

        // Attach the created element to the shadow DOM
        shadow.appendChild(linkElem);
    }
}

// Define the new element
customElements.define('popup-box', PopUpBox);
