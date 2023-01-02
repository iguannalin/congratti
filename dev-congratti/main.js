// Create a class for the element
class PopUpBox extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'});

        // Create spans
        const wrapper = document.createElement('span');
        wrapper.setAttribute('class', 'wrapper');

        // Drag, drop, and resize interactions
        // https://stackoverflow.com/questions/63610870/drag-an-element-using-javascript-translating-the-position-css3
        let isCorner = false;

        function checkCorners(e) {
            const ww = wrapper.getBoundingClientRect();
            console.log(ww, e.x, e.y);

            // TOP LEFT
            if ((Math.abs(ww.top - e.y) <= 10) && Math.abs(ww.left - e.x) <= 10) {
                document.body.style.cursor = 'nwse-resize';
                isCorner = true;
            }
            // TOP RIGHT
            else if ((Math.abs(ww.top - e.y) <= 10) && Math.abs(ww.right - e.x) <= 10) {
                document.body.style.cursor = 'nesw-resize';
                isCorner = true;
            }
            // BOTTOM LEFT
            else if ((Math.abs(ww.bottom - e.y) <= 10) && Math.abs(ww.left - e.x) <= 10) {
                document.body.style.cursor = 'nesw-resize';
                isCorner = true;
            }
            // BOTTOM RIGHT
            else if ((Math.abs(ww.bottom - e.y) <= 10) && Math.abs(ww.right - e.x) <= 10) {
                document.body.style.cursor = 'nwse-resize';
                isCorner = true;
            }
        }

        function onGrab() {
            document.body.style.cursor = 'grabbing';
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onLetGo);
        }

        function onDrag(e) {
            const width = wrapper.getBoundingClientRect().width;
            console.log(isCorner);
            if (isCorner) {
                e.preventDefault();
                console.log('RESIZING', Math.abs(width - e.x));
                wrapper.setAttribute('style', `width:${Math.abs(width - e.x)}px`);
            } else {
                let ww = window.innerWidth * 0.4;
                let cc = (e.clientX - ww) - +width / 2;
                let dd = Math.max(0, cc);
                let yy = Math.max(0, (e.clientY));
                console.log(yy);
                wrapper.style.transform = `translate(${dd}px, ${yy}px)`;
            }
        }

        function onLetGo() {
            document.body.style.cursor = 'default';
            isCorner = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onLetGo);
        }

        document.addEventListener('mousemove', checkCorners);
        wrapper.addEventListener('mousedown', onGrab);








        // TODO

        const icon = document.createElement('span');
        icon.setAttribute('class', 'icon');
        icon.setAttribute('tabindex', 0);

        const info = document.createElement('span');
        info.setAttribute('class', 'info');

        // Take attribute content and put it inside the info span
        const text = this.getAttribute('data-text');
        info.textContent = text;

        // Insert icon
        let imgUrl;
        if(this.hasAttribute('img')) {
            imgUrl = this.getAttribute('img');
        } else {
            imgUrl = 'img/default.png';
        }

        const img = document.createElement('img');
        img.src = imgUrl;
        icon.appendChild(img);

        // Create some CSS to apply to the shadow dom
        const style = document.createElement('style');
        console.log(style.isConnected);

        style.textContent = `
          .wrapper {
            position: absolute;
            display: block;
            width: 250px;
            height: 250px;
            border: 5px solid purple;
          }
          
          .header {
            position: relative;
            display: block;
            width: 250px;
            height: 50px;
            border: 5px solid green;
          }
    
          .info {
            font-size: 0.8rem;
            width: 200px;
            display: inline-block;
            border: 1px solid black;
            padding: 10px;
            background: white;
            border-radius: 10px;
            opacity: 0;
            transition: 0.6s all;
            position: absolute;
            bottom: 20px;
            left: 10px;
            z-index: 3;
          }
    
          img {
            width: 1.2rem;
          }
    
          .icon:hover + .info, .icon:focus + .info {
            opacity: 1;
          }
        `;

        // Attach the created elements to the shadow dom
        shadow.appendChild(style);
        console.log(style.isConnected);
        shadow.appendChild(wrapper);
        wrapper.appendChild(icon);
        wrapper.appendChild(info);
    }
}

// Define the new element
customElements.define('popup-box', PopUpBox);
