let indexes = {
  "languages": [
      "Afrikaans","Albanian","Arabic","Armenian","Assamese","Aymara","Azerbaijani","Basque","Bengali","Belarussian","Bikol","Bosnian","Bulgarian","Burmese","Chichewa","Chinese","Cree","Croatian","Czech","Danish","Dutch","Estonian","Faroese","Finnish","French","Georgian","German","Greek","Gujarati","Haitian Creole","Hausa","Hawaiian","Hebrew","Hindi","Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Javanese","Kannada","Keapara","Khmer","Korean","Kurdish","Kyrgz","Lao","Lithuanian","Luxembourgish","Macedonian","Malay","Maltese","Manx","Maori","Marathi","Nahuatl","Nepali","Norweigan","Occitan","Ojibwe","Pashto","Persian","Polish","Portuguese","Punjabi","Romanian","Romanian Tatar","Russian","Samoan","Saterland Frisian","Scots","Scottish Gaelic","Serbian","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Southern Sotho","Spanish","Sundanese","Swahili","Swedish","Tagalog","Tajik","Tamil","Telugu","Thai","Tok Pisin","Turkish","Tuvaluan","Ukrainian","Urdu","Uyghur","Vietnamese","Welsh","Xhosa","Yiddish","Yoruba","Zulu","English"
    ],
  "latitudes": [
      -22, 41, 25, 40, 27.5,-10, 40.5, 40, 24, 53, 13, 44, 43, 22,-15, 35, 60, 45.1667, 49.75, 56, 52.5, 59, 62, 64, 46, 42, 51, 39, 20, 19, 8, 19.2833, 31.5, 20, 47, 65,-5, 53, 42.8333, 36,-5, 20,-6, 13, 37, 39, 41, 18, 56, 49.75, 41.8333, 2.5, 35.8333, 54,-41, 20, 17.25, 28, 62, 43.7333, 60, 33, 32, 52, 39.5, 20, 46, 46, 60,-13.5833, 51, 54, 54, 44,-20, 30, 7, 48.6667, 46, 10,-29.5, 23,-5, 1, 62, 13, 39, 20, 20, 15,-6, 35,-8, 49, 30, 46, 16, 54,-22, 31.5, 9.5,-29, 38
    ],
  "longitudes": [
      17, 20, 45, 45, 90.5,-76, 47.5,-4, 90, 28, 122, 18, 25, 98, 30, 105,-95, 15.5, 15.5, 10, 5.75, 26,-7, 26, 2, 43.5, 9, 22, 77,-72.4167,-2, 166.6, 34.75, 77, 20,-18, 120,-8, 12.8333, 138, 120, 77, 147, 105, 127.5, 35, 75, 105, 24, 6.1667, 22, 112.5, 14.5833,-2, 174, 77,-88.75, 84, 10, 7.4,-95, 65, 53, 20,-8, 77, 25, 25, 100,-172.3333, 9,-2,-2, 21, 30, 70, 81, 19.5, 15, 49, 28.5,-102, 120, 38, 15, 122, 71, 77, 77, 100, 147, 33, 178, 32, 70, 105, 106,-2, 24, 34.75, 2.25, 24,-97
    ]
};
let data;
const directions = ["north","east","south","west"];
let currentLang = "English";
let current;
window.addEventListener("load", () => {
  function findClosest(arr = [], pos, positive = true) { // array to search in, position value, move in positive direction if true
    let closestDiff = 99999;
    let closestIndex = indexes.languages[indexes.languages.length-1];
    arr.forEach((n, i) => {
      if (positive && n > pos && (n-pos < closestDiff)) {
        closestDiff = n-pos;
        closestIndex = i;
      } else if (!positive && n < pos && (Math.abs(pos-n) < closestDiff)) {
        closestDiff = Math.abs(pos-n);
        closestIndex = i;
      }
    });
    return closestIndex;
  }

  function moveCurrent(e) {
    let moveTo = e.target.id;
    let index;
    switch (moveTo) {
      case "north":
        index = findClosest(indexes.latitudes, current.latitude);
        break;
      case "east":
        index = findClosest(indexes.longitudes, current.longitude);
        break;
      case "south":
        index = findClosest(indexes.latitudes, current.latitude, false);
        break;
      case "west":
        index = findClosest(indexes.longitudes, current.longitude, false);
        break;
      default:
        return;
    }
    currentLang = indexes.languages[index];
    current = data[currentLang];
    console.log(currentLang);
    setDirections();
  }

  function setDirections() {
    if (!currentLang || !data) return;
    current = data[currentLang];
    directions.forEach((dir, index) => {
      const elem = document.getElementById(dir);
      elem.innerHTML = data[currentLang].directions[index];
      elem.onclick = moveCurrent;
    });
  }

  fetch('data.json').then((d) => d.json()).then((r) => {
    data = r;
    setDirections();
  });
  
});

// country geolocation data from:
// https://github.com/samayo/country-json/blob/master/src/country-by-geo-coordinates.json
// https://omniglot.com/language/directions/compassdirections.htm
// crazy code to scrape countries and languages from source above:
// let data = {}; 
// arr.forEach((lang) => {
//   let lg = lang[0];
//   data[lg] = {directions: lang, countries: []};
//   countries.forEach((ct) => {
//         if (ct.toLowerCase().startsWith(lg.substring(0, 4).toLowerCase())) {
//             data[lg].countries.push(ct);
//         }
//   })
// });