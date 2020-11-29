import isMobile from "../../utils/is-mobile.js";

let n = 0,
    textIndex = 0,
    interval = Math.floor((Math.random() * 200) + 5),
    textToType = {
        description: 'Hi,',
        titles: ['I\'m Anna Lin.']
    },
    target = document.getElementById('title'),
    isMobileDevice = isMobile.any();

function typewrite(blurb, target) {
    if (typeof (blurb[n] !== 'undefined')) {
        target.textContent += blurb[n];
    }
    // if (blurb[n] === '.') {
    //     setTimeout(backspace, 1000);
    // }
    interval = Math.floor((Math.random() * 300) + 5);
    n++;
    if (n < blurb.length) {
        setTimeout(function () {
            typewrite(blurb, target);
        }, interval);
    }
}

function backspace() {
    interval = Math.floor((Math.random() * 200) + 5);
    let t = document.getElementById('title');

    // if (t.textContent !== textToType.description) {
    //     t.textContent = t.textContent.toString().slice(0, -1);
    //     setTimeout(backspace, interval);
    //
    // } else {
        n = 0;
        textIndex = (textIndex + 1) % textToType.titles.length;
        typewrite(textToType.titles[textIndex], target);
    // }
}

function handleClick() {
    target.textContent = textToType.description + textToType.titles[textIndex];
    n = textToType.titles[textIndex].length - 1;
}

function init() {
    // if (!isMobileDevice) document.addEventListener('click', handleClick);
    if (target) backspace();
}

document.addEventListener("DOMContentLoaded", init);

