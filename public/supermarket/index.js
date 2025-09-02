window.addEventListener("load", () => {
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }

  const container = document.getElementById("container");
  const dialog = document.getElementById("dialog");
  const dialogMessage = document.getElementById("dialogMessage");
  const closeButton = document.getElementById("closeButton");
  const texts = [
    "Welcome!",
    "Checking out ",
    "Your grandma recently passed away.",
    "In her inheritance she left you some money.",
    "After conversion, it came down to $2,150.78."
  ];
  let clicks = 0;
  let textsIndex = 0;
  let unicode = {};
  let items = [];
  let audio;
  let total = 2150.78;
  let clicked;

  function displayItems(list) {
    for ( let i = 0; i < Math.min(window.innerWidth / 35, window.innerHeight / 31); i++ ) {
      const item = list[getRandomInt(0, list.length)];
      const div = document.createElement("div");
      div.className = "product";
      const img = document.createElement("img");
      img.src = item.imgSrc;
      img.title = "$" + item.price + " - " + item.name.toLowerCase();
      const a = document.createElement("a");
      a.appendChild(img);
      a.onclick = (e) => restock(e, img, item);
      div.appendChild(a);
      container.appendChild(div);
    }
  }

  function restock(e, elem, product) {
    e.preventDefault();
    promptDialog(product.name);
    // audio from https://freesound.org/
    if ( Math.random() > 0.3 ) {
      audio = new Audio(`freesounds/sound${ getRandomInt(1, 7) }.wav`);
      audio.play();
    }
    clicked = product;
    setTimeout(() => {
      const item = items[getRandomInt(0, items.length)];
      elem.src = item.imgSrc;
      elem.title = "$" + item.price + " - " + item.name.toLowerCase();
    }, 250);
  }

  function getText(id = "") {
    clicks++;
    let text = "";
    if ( textsIndex == 0 ) {
      textsIndex++;
      return texts[0];
    } else if ( textsIndex > 0 ) {
      text = texts[1] + id;
      if ( textsIndex == 1 ) textsIndex++;
    }
    if ( textsIndex < 5 ) text += `<br><br>${ texts[textsIndex] }`;
    if ( clicked ) total = Math.round(((+total - (+(clicked.price))) / 100) * 100)
    if ( clicked && textsIndex > texts.length ) text += `<br><br>You have $${ total } left to spend.`;
    for ( let i = 0; i < Math.min(clicks * 1.5, text.length); i++ ) {
      if ( Math.random() <= clicks / 5 ) { // randomize--the more clicks the more alien the language
        const r = getRandomInt(0, text.length);
        if ( unicode[text[r]] ) {
          const dict = unicode[text[r]];
          const randomUnicode = dict[getRandomInt(0, dict.length)];
          text = text.substring(0, r) + randomUnicode + text.substring(r + 1, text.length);
        }
      }
    }
    textsIndex++;
    return text;
  }

  function promptDialog(id = "") {
    dialogMessage.innerHTML = getText(id);
    dialog.showModal();
  }

  closeButton.addEventListener("click", () => {
    dialog.close();
  });

  // addEventListener("beforeunload", (e) => {e.preventDefault(); promptDialog()});

  fetch("products.json").then((d) => d.json()).then((r) => {
    items = r.pageProps.data.results.map((item) => ({
      name: item.name,
      price: item.regularPrice,
      imgSrc: item.imageThumbnail
    }));
    displayItems(items);
  });

  fetch("unicode.json").then((d) => d.json()).then((r) => {
    unicode = r;
    promptDialog();
  });

});