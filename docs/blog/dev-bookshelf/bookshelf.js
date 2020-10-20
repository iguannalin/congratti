import * as d3 from "d3";

const width = 700;
let data = [];

const fetchData = () => {
    fetch('https://bookshelf-goodreads-api.herokuapp.com/api/list').then(response => {
        response.text().then(text => {
            return JSON.parse(text)
        }).then(d => {
            if (d.results.reviews.review) {
                const raw = d.results.reviews.review;
                raw.forEach((i) => {
                    const item = i.book;
                    // console.log('RAW ITEM', item);
                    // TODO: allow for multiple authors
                    const book = {
                        "title": item.title._text || '',
                        "author": item.authors.author.name._text || '',
                        "pages": item.num_pages._text || '',
                        "published": item.published._text || '',
                        "description": item.description._text || '',
                        "link": item.link.text || ''
                    };
                    data.push(book);
                })
            }
            console.log('RESPONSE FETCH', data);
            if (data) createGraph();
        });
    })
};

fetchData();

const createGraph = () => {
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
};
