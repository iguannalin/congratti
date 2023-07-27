let timer = 100;
let speed = 100;
let first = true;
let left;
let right;
let timeout;
let w;
let h;

let debounce = function(func, delay) {
  clearTimeout(timeout);
  timeout = setTimeout(func, delay);
};

function onType(e) {
  if (!e || !e.data) return;
  if (e.target.value.length < 2) newTranslate();
  right.innerHTML += e.data;
  if (e.data.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g)) left.innerHTML += e.data;
  else debounce(() => translate(e.target.value), 250);
}

async function translate(q) {
  let encodedQuery = encodeURI(q);
  let data;
  right.innerHTML = q;
  await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl=en&tl=zh-CN&q=${encodedQuery}`)
  .then((e) => e.json())
  .then((d) => { data = d[0][0][0]; });
  if (data) left.innerHTML = data;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function newTranslate() {
  if (first) {
    first = false;
    return;
  }
  let elem = document.createElement('div');
  elem.className = "left";
  console.log(Math.floor(Math.random(0,w)));
  elem.style.left = `${getRandomInt(w)}px`;
  elem.style.top = `${getRandomInt(h)}px`;
  document.body.appendChild(elem);
  left = elem;
}

window.addEventListener("load", () => {
  left = document.getElementById("left");
  right = document.getElementById("right");
  let input = document.getElementById("prompt");
  input.oninput = onType;
  w = window.innerWidth - 100;
  h = window.innerHeight - 200;
});
