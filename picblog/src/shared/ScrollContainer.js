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
                <img src={Daytime}/>
            </div>
            <div className="section fourth">
                <img src={EveningRock}/>
                <img src={EveningBeach}/>
            </div>
            <div className="section fifth">

                <img src={SunsetWaves}/>
            </div>
            <div className="section sixth">
                <img src={Dusk}/>

            </div>
        </div>
    );
}

export default ScrollContainer;
