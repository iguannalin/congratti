import React from 'react';
import '../App.css';
import './ScrollContainer.scss';
import ViewTwoColumn from './ViewTwoColumn';
import Dawn from '../photos/Dawn-Yosemite-2x.jpg';
import Dawn1x from '../photos/Dawn-Yosemite-1x.jpg';
import Daybreak from '../photos/Daybreak-HalfDome-2x.jpg';
import Daybreak1x from '../photos/Daybreak-HalfDome-1x.jpg';
import Daytime from '../photos/Daytime-Beach-2x.jpg';
import Daytime1x from '../photos/Daytime-Beach-1x.jpg';
import EveningRock from '../photos/Evening-Rock-2x.jpg';
import EveningRock1x from '../photos/Evening-Rock-1x.jpg';
import EveningBeach from '../photos/Evening-Beach-2x.jpg';
import EveningBeach1x from '../photos/Evening-Beach-1x.jpg';
import SunsetWaves from '../photos/Sunset-Waves-2x.jpg';
import SunsetWaves1x from '../photos/Sunset-Waves-1x.jpg';
import Dusk from '../photos/Dusk-ElCapitan-2x.jpg';
import Dusk1x from '../photos/Dusk-ElCapitan-1x.jpg';
import Home from '../photos/Home-2x.jpg';
import Home1x from '../photos/Home-1x.jpg';
import Placeholder from '../photos/placeholder.png';

document.addEventListener("DOMContentLoaded", function () {
    const lazyImages = [].slice.call(document.querySelectorAll("img.potato"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Possibly fall back to event handlers here
    }
});

function ScrollContainer() {
    return (
        <div className="Scroll-Container">
            <div className="section first">
                <figure>
                    <img className="potato" src={Placeholder} data-src={Dawn}
                         data-srcset={Dawn1x}
                         alt="Dawn at Yosemite, the sunlight streaming through the valley."/>
                    <figcaption>Dawn at Yosemite</figcaption>
                </figure>
            </div>
            <div className="section second">

                <figure>
                    <img className="potato" src={Placeholder} data-src={Daybreak}
                         data-srcset={Daybreak1x}
                         alt="Daybreak at Half-Dome, the warm sun rising behind the peak."/>
                    <figcaption>
                        Daybreak at Half-Dome
                    </figcaption>
                </figure>
            </div>
            <div className="section third">
                <figure>
                    <img className="potato" loading="lazy" src={Placeholder} data-src={Daytime}
                         data-srcset={Daytime1x}
                         alt="Daytime at the beach, somewhere on the north-western coast of California."/>
                    <figcaption>
                        Daytime at a beach, somewhere on the north-western coast of California
                    </figcaption>
                </figure>
            </div>
            <div className="section fourth">
                <div className="two-columns">
                    <figure>
                        <img className="potato" loading="lazy" src={Placeholder} data-src={EveningRock}
                             data-srcset={EveningRock1x}
                             alt="Evening shot of a rock in the ocean."/>

                        <img className="potato" loading="lazy" src={Placeholder} data-src={EveningBeach}
                             data-srcset={EveningBeach1x}
                             alt="Evening shot of the waves receding on the beach."/>
                        <figcaption>
                            Evening at the beach
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="section fifth">
                <figure>
                    <img className="potato" loading="lazy" src={Placeholder} data-src={SunsetWaves}
                         data-srcset={SunsetWaves1x}
                         alt="The waves crashing onto a beach at sunset."/>
                    <figcaption>
                        Sunset
                    </figcaption>
                </figure>
            </div>
            <div className="section sixth">
                <figure>
                    <img className="potato" loading="lazy" src={Placeholder} data-src={Dusk} data-srcset={Dusk1x}
                         alt="El Capitan in all its glory at dusk."/>
                    <figcaption>
                        Dusk at El Capitan
                    </figcaption>
                </figure>
            </div>
            <div className="section home">
                <figure>
                    <img className="potato" loading="lazy" src={Placeholder} data-src={Home} data-srcset={Home1x}
                         alt="A dusky-pink sky outside the window, framed by a disco ball and windchimes."/>
                    <figcaption>
                        Home sweet home
                    </figcaption>
                </figure>
            </div>
            <div className="footer">
                <p>All photos captured with Nikon N8008 on film, 35mm lens.</p>
            </div>
        </div>
    );
}

export default ScrollContainer;
