export default function define(runtime, observer) {
    const main = runtime.module();
    main.variable(observer()).define(["md"], function (md) {
        return (
            md`
# Books
Sample data scraped off my All books list on Goodreads.com
`
        )
    });
    main.variable(observer("data")).define("data", function () {
        return (
            [
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
            ]
        )
    });
    main.variable(observer()).define(["d3", "width", "height", "textures", "data", "x"], function (d3, width, height, textures, data, x) {
            const svg = d3.create("div")
                .style("font", "inherit")
                .style("font-size", "10px")
                .style("text-align", "right")
                .style("color", "white");

            const t = textures.paths()
                .d("crosses")
                .lighter()
                .thicker();
            svg.call(t);

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

            return svg.node();
        }
    );
    main.variable(observer()).define(["d3", "textures"], function (d3, textures) {
            const svg = d3
                .create('svg')
                .attr('width', 80)
                .attr('height', 80);

            const texture = textures
                .lines()
                .orientation("diagonal")
                .size(8)
                .strokeWidth(3)
                .stroke("darkorange")
                .background("firebrick");

            svg.call(texture);
            svg
                .append('circle')
                .attr('r', 30)
                .attr('transform', 'translate(35,35)')
                .attr('stroke-location', 'inner')
                .attr('stroke', 'darkorange')
                .attr('stroke-width', '3px')
                .style('fill', texture.url());

            return svg.node();
        }
    );
    main.variable(observer("width")).define("width", function () {
        return (
            666
        )
    });
    main.variable(observer("height")).define("height", function () {
        return (
            500
        )
    });
    main.variable(observer("margin")).define("margin", function () {
        return (
            {top: 20, right: 0, bottom: 30, left: 40}
        )
    });
    main.variable(observer("x")).define("x", ["d3", "data", "width"], function (d3, data, width) {
        return (
            d3.scaleLinear()
                .domain([0, d3.max(data.map(d => d.title.length))])
                .range([0, width])
        )
    });
    main.variable(observer("chart")).define("chart", ["svg"], function (svg) {
        return (
            svg`<svg width="450" height="350" id="scope"></svg>`
        )
    });
    main.variable(observer()).define(["d3", "textures", "data"], function (d3, textures, data) {
            let offSetX, offSetY;
            offSetX = 150;
            offSetY = 100;

            const vis = d3.selectAll("#scope")
                .append("svg:svg");

            const bookCircle = vis.append("svg:g")
                .attr("transform", "translate(" + offSetX + "," + offSetY + ")");

            const texture = textures
                .paths()
                .d("nylon")
                .lighter()
                .shapeRendering("crispEdges");

            vis.call(texture);

            data.forEach(book => {
                bookCircle.append("svg:circle")
                    .attr("r", 80)
                    .attr("fill", "black")
                    .attr("class", "book-circle")
                    .attr("stroke", "white")
                    .attr("stroke-width", 2)
                    .attr("transform", "translate(" + Math.random() * offSetX + "," + Math.random() * offSetY + ")")
                    .style("fill", texture.url());
            })
        }
    );
    main.variable(observer()).define(["html"], function (html) {
        return (
            html`<h2>Appendix<h2>`
        )
    });
    main.variable(observer("d3")).define("d3", ["require"], function (require) {
        return (
            require("d3@6")
        )
    });
    main.variable(observer("textures")).define("textures", ["require"], function (require) {
        return (
            require('textures')
        )
    });
    return main;
}
