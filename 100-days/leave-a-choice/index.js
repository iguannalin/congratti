let serverURL = "https://acoustic-famous-cardinal.glitch.me/";
let selected = [];
const sheet = document.getElementById("sheet");
const fromName = document.getElementById("from-name");
const preventDef = (e) => e.preventDefault();

fetch(serverURL).then((d) => d.json()).then((r) => ghostFill(r[0])).then(() => sheet.removeEventListener('click', preventDef));

window.addEventListener("load", () => {
  sheet.addEventListener('click', preventDef);
  let width = 20;
  let height = 25;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      let input = document.createElement("input");
      input.type = "checkbox";
      input.onclick = (e) => {
        if (e.target.checked) selected.push(`(${i},${j})`);
        else selected.splice(selected.findIndex((v) => v == `(${i},${j})`)-1, 1);
        return true;
      }
      input.id = `(${i},${j})`;
      sheet.appendChild(input);
    }
  }
});

async function ghostFill(items) {
  selected = items;
  await items.forEach((e, i) => {
    if (i == 0) fromName.value = e;
    else {
      let box = document.getElementById(e);
      if (box) box.checked = true;
    }
  });
}

function onSubmit() {
  if (!fromName.value) return;
  selected.splice(0, 0, fromName.value);
  postData(serverURL, selected);
}

function onReset() {
  selected = [];
}

// code from MDN (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "no-cors", // no-cors, *cors, same-origin
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response;
}