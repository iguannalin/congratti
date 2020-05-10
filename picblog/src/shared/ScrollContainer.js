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
                <img src={Dawn} alt="Dawn at Yosemite, the sunlight streaming through the valley."/>
            </div>
            <div className="section second">
                <img src={Daybreak} alt="Daybreak at Half-Dome, the warm sun rising behind the peak."/>
            </div>
            <div className="section third">
                <img src={Daytime} alt="Daytime at the beach, somewhere on the north-western coast of California."/>
            </div>
            <div className="section fourth">
                {/*<div className="two-columns">*/}
                    <img src={EveningRock} alt="Evening shot of a rock in the ocean."/>
                    <img src={EveningBeach} alt="Evening shot of the waves receding on the beach."/>
                {/*</div>*/}
            </div>
            <div className="section fifth">
                <img src={SunsetWaves} alt="The waves crashing onto a beach at sunset."/>
            </div>
            <div className="section sixth">
                <img src={Dusk} alt="El Capitan in all its glory at dusk."/>

            </div>
        </div>
    );
}

export default ScrollContainer;
