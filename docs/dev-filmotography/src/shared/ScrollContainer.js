import React from 'react';
import '../App.css';
import './ScrollContainer.scss';
import ViewTwoColumn from './ViewTwoColumn';
import Dawn from '../photos/Dawn-Yosemite.jpg';
import Daybreak from '../photos/Daybreak-HalfDome.jpg';
import Daytime from '../photos/Daytime-Beach.jpg';
import EveningRock from '../photos/Evening-Rock.jpg';
import EveningBeach from '../photos/Evening-Beach.jpg';
import SunsetWaves from '../photos/Sunset-Waves.jpg';
import Dusk from '../photos/Dusk-ElCapitan.jpg';

function ScrollContainer() {
    return (
        <div className="Scroll-Container">
            <div className="section first">
                <figure>
                    <img src={Dawn} alt="Dawn at Yosemite, the sunlight streaming through the valley."/>
                    <figcaption>Dawn at Yosemite</figcaption>
                </figure>
            </div>
            <div className="section second">

                <figure>
                    <img src={Daybreak} alt="Daybreak at Half-Dome, the warm sun rising behind the peak."/>
                    <figcaption>
                        Daybreak at Half-Dome
                    </figcaption>
                </figure>
            </div>
            <div className="section third">
                <figure>
                    <img src={Daytime}
                         alt="Daytime at the beach, somewhere on the north-western coast of California."/>
                    <figcaption>
                        Daytime at a beach, on the north-western coast of California
                    </figcaption>
                </figure>
            </div>
            <div className="section fourth">
                <div className="two-columns">
                    <figure>
                        <img src={EveningRock} alt="Evening shot of a rock in the ocean."/>

                        <img src={EveningBeach} alt="Evening shot of the waves receding on the beach."/>
                        <figcaption>
                            Evening at the beach
                        </figcaption>
                    </figure>
                </div>
            </div>
            <div className="section fifth">
                <figure>
                    <img src={SunsetWaves} alt="The waves crashing onto a beach at sunset."/>
                    <figcaption>
                        Sunset
                    </figcaption>
                </figure>
            </div>
            <div className="section sixth">
                <figure>
                    <img src={Dusk} alt="El Capitan in all its glory at dusk."/>
                    <figcaption>
                        Dusk at El Capitan
                    </figcaption>
                </figure>

            </div>
        </div>
    );
}

export default ScrollContainer;
