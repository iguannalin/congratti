import React from "react";

const Projecteaturveg = () => {
    return (
        <div>
            <div className="project-link"><a href="https://iguannalin.github.io/eaturveg/">View Project</a></div>
            <h2>About this project</h2>
            <div className="project-details">
                <p>I started this project at a time when I was kindling a love for both vegetables and JSON data.<br/>
                    Unable to find a good source of information on vegetables that are in-season, I decided to scrape
                    this <a
                        href="https://github.com/iguannalin/eaturveg/blob/master/src/beautifulveggiesdata.json">data</a> from
                    the local CUESA website.</p>
            </div>
        </div>
    );
};

export default Projecteaturveg;
