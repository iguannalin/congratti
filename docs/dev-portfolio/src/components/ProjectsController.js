import React, {Component} from "react";
import Projecteaturveg from './Projecteaturveg';
import Projectfilmotography from './Projectfilmotography';
import Projectspotifyrecentlyadded from './Projectspotifyrecentlyadded';
import Projectsuperdiversity from "./Projectsuperdiversity";

class ProjectsController extends Component {
    components = {
        eaturveg: Projecteaturveg,
        spotifyrecentlyadded: Projectspotifyrecentlyadded,
        filmotography: Projectfilmotography,
        superdiversity: Projectsuperdiversity
    };

    render() {
        const ProjectName = this.components[this.props.projectName.replace(/[ |\-]/gi, '')];
        return (
            <div><h1>{this.props.projectName}</h1><ProjectName/></div>
        );
    }
}

export default ProjectsController;
