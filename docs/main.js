import isMobile from "./src/utils/is-mobile.js";

// [x, y] positions of popup windows
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

// file paths for film blog popup
const IMAGES = {
    YOSEMITE: [
        "yosemite/Dawn-Yosemite-2x.jpg",
        "yosemite/Daybreak-HalfDome-2x.jpg",
        "yosemite/Daytime-Beach-2x.jpg",
        "yosemite/Evening-Rock-2x.jpg",
        "yosemite/Evening-Beach-2x.jpg",
        "yosemite/Sunset-Waves-2x.jpg",
        "yosemite/Dusk-ElCapitan-2x.jpg"
    ],
    ALASKA: [
        "alaska/mountain-sunrise-vertical.jpg",
        "alaska/ice-field.jpg",
        "alaska/mountain-sunrise.jpg",
        "alaska/little-friend.jpg",
        "alaska/shed-blue.jpg",
        "alaska/mountain-evening.jpg",
        "alaska/shed-white.jpg",
        "alaska/skater-buds.jpg",
    ],
    EASTCOAST: [
        "eastcoast/BostonCommons1.jpg",
        "eastcoast/Cathedral.jpg",
        "eastcoast/Skyline.jpg",
        "eastcoast/BostonCommons2.jpg",
        "eastcoast/Dome.jpg",
        "eastcoast/Skyscrapers.jpg",
        "eastcoast/BostonCommons3.jpg",
        "eastcoast/Downtown.jpg",
        "eastcoast/SpringSt.jpg",
        "eastcoast/Brekkie.jpg",
        "eastcoast/DowntownArt.jpg",
        "eastcoast/Storiedbuildings.jpg",
        "eastcoast/Buildings.jpg",
        "eastcoast/MBTA.jpg",
        "eastcoast/Treeshadow.jpg",
        "eastcoast/Cathedral-inside.jpg",
        "eastcoast/Northend.jpg",
    ]
};
// places for film blog popup
const PLACES = ['Yosemite', 'Alaska', 'Eastcoast'];
// details for film blog popup
const DETAILS = {
    'Yosemite': ["November 2019", "Nikon N8008 35mm"],
    'Alaska': ["October 2020", "Nikon N8008 35mm"],
    'Eastcoast': ["Fall 2021", "Olympus mju, 35mm"]
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
        let classes = `wrapper project-${this.getAttribute('color')}`;
        if (!isMobile.any()) classes += " resize draggable";
        wrapper.setAttribute('class', classes);
        const pos = this.getAttribute('position');
        if (!isMobile.any()) wrapper.style.transform = `translate(${POSITIONS[pos][0]}%, ${POSITIONS[pos][1]}%)`;

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
        const type = this.getAttribute('popup-type');
        const content = document.createElement('div');
        content.setAttribute('class', 'content');

        // Insert image
        if (this.hasAttribute('data-image')) {
            let imgUrl = this.getAttribute('data-image');
            let caption = this.getAttribute('data-caption');

            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = caption;
            const gallery = document.createElement('div');
            gallery.setAttribute("class", "gallery");
            gallery.appendChild(img);
            content.appendChild(gallery);
        }

        if (this.hasAttribute('data-images-dir')) {
            let imgPath = this.getAttribute('data-images-dir');
            let count = +this.getAttribute('data-images-count');
            let filename = this.getAttribute('data-images-name');
            let extension = this.getAttribute('data-images-ext');

            const gallery = document.createElement('div');
            gallery.setAttribute("class", "gallery-container");

            for (let i = 1; i <=count; i++) {
                const imgContainer = document.createElement('div');
                imgContainer.setAttribute("class", "gallery-block " + filename);
                const img = document.createElement('img');
                img.src = imgPath+filename+i+"."+extension;
                imgContainer.appendChild(img);
                gallery.appendChild(imgContainer);
            }
            content.appendChild(gallery);
        }

        if (type === 'film') {
            const setImages = () => {
                function resetFilm() {
                    gallery.remove();
                    footer.remove();
                    setImages();
                    close.removeEventListener('click', resetFilm);
                }

                const gallery = document.createElement('div');
                gallery.setAttribute("class", "gallery-container");

                const option = [Math.floor(Math.random() * 3)];
                const place = PLACES[option];
                const path = "public/projects/";

                const headingDiv = document.createElement('div');
                headingDiv.setAttribute('class', 'gallery-block block-0 ' + place);
                const div = document.createElement('div');
                const heading = document.createElement('h1');
                heading.setAttribute('class', 'gallery-heading');
                heading.textContent = place;
                headingDiv.appendChild(div);
                div.appendChild(heading);
                gallery.appendChild(headingDiv);

                IMAGES[`${place.toUpperCase()}`].forEach((src, i) => {
                    const imgContainer = document.createElement('div');
                    imgContainer.setAttribute("class", place + " gallery-block film block-" + (Math.ceil(i / 2) + 1));
                    const divContainer = document.createElement('div');
                    divContainer.setAttribute('class', 'gallery-div-container');
                    const figure = document.createElement('figure');
                    const img = document.createElement('img');
                    img.src = path + src;
                    imgContainer.appendChild(divContainer);
                    divContainer.appendChild(figure);
                    figure.appendChild(img);
                    gallery.appendChild(imgContainer);
                });

                const footer = document.createElement('footer');
                footer.innerHTML = `<div><p>${DETAILS[place][0]}</p></div>
                    <div><p>${DETAILS[place][1]}</p></div>`;

                content.appendChild(gallery);
                content.appendChild(footer);

                close.addEventListener('click', resetFilm);
            };

            setImages();
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
