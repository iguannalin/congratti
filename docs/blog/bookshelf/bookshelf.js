import * as d3 from "d3";

const width = 700;

const data = [
    {
        "title": "Intimations",
        "author": "Smith, Zadie",
        "pages": "97"
    },
    {
        "title": "White Teeth",
        "author": "Smith, Zadie",
        "pages": "448"
    },
    {
        "title": "On Beauty",
        "author": "Smith, Zadie",
        "pages": "445"
    },
    {
        "title": "The Handmaid's Tale",
        "author": "Atwood, Margaret",
        "pages": "314"
    },
    {
        "title": "The Remains of the Day",
        "author": "Ishiguro, Kazuo",
        "pages": "258"
    },
    {
        "title": "Turtles, Termites, and Traffic Jams: Explorations in Massively Parallel Microworlds",
        "author": "Resnick, Mitchel",
        "pages": "184"
    }
];

const x = d3.scaleLinear()
    .domain([0, d3.max(data.map(d => d.title.length))])
    .range([0, width]);

const svg = d3.select("#app")
    .append("div")
    .style("font", "inherit")
    .style("font-size", "10px")
    .style("text-align", "right")
    .style("color", "white")
    .style("margin-top", "10%")
    .style("overflow", "scroll");

svg.selectAll("div")
    .data(data)
    .join("div")
    .style("background", "black")
    .style("padding", "5px")
    .style("border", "1px solid white")
    .style("display", "flex")
    .style("justify-content", "center")
    .style("align-items", "center")
    .style("border-radius", "2px")
    .style("width", d => `${x(d.title.length)}px`)
    .style("height", d => `${x(d.pages / 30)}px`)
    .text(d => d.title);


// document.addEventListener('DOMContentLoaded', createGraph);
