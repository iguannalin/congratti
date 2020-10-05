import React, {Component} from "react";
import Projecteaturveg from './Projecteaturveg';
import Projectfilmotography from './Projectfilmotography';
import Projectspotifyrecentlyadded from './Projectspotifyrecentlyadded';
import Projectsuperdiversity from "./Projectsuperdiversity";
import Projecttextmesmthnice from "./Projecttextmesmthnice";
import Projectalphabetsoup from "./Projectalphabetsoup";
import Projectbookshelf from "./Projectbookshelf";

class ProjectsController extends Component {
    components = {
        eaturveg: Projecteaturveg,
        spotifyrecentlyadded: Projectspotifyrecentlyadded,
        filmotography: Projectfilmotography,
        superdiversity: Projectsuperdiversity,
        textmesmthnice: Projecttextmesmthnice,
        alphabetsoup: Projectalphabetsoup,
        bookshelf: Projectbookshelf
    };

    render() {
        const ProjectName = this.components[this.props.projectName.replace(/[ |-]/gi, '')];
        return (
            <div><h1>{this.props.projectName}</h1><ProjectName/></div>
        );
    }
}

export default ProjectsController;
