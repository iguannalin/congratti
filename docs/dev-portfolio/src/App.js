import React from 'react';
import './App.css';
import Projecteaturveg from './components/Projecteaturveg';
import Projectfilmotography from './components/Projectfilmotography';
import Projectspotifyrecentlyadded from './components/Projectspotifyrecentlyadded';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            components: {
                eaturveg: Projecteaturveg,
                spotifyrecentlyadded: Projectspotifyrecentlyadded,
                filmotography: Projectfilmotography
            },
            projectList: ['eaturveg', 'Spotify Recently Added', 'Filmotography'],
            selectedProject: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.getProject = this.getProject.bind(this);
    }

    handleClick(e) {
        const projectName = (e) ? e.target.innerText.toLowerCase() : null;
        this.setState({selectedProject: projectName});
    }

    getProject() {
        if (this.state.selectedProject) {
            const Project = this.state.components[this.state.selectedProject.replaceAll(' ', '')];
            return (
                <div className="Project">
                    <h1>{this.state.selectedProject}</h1>
                    <Project/>
                </div>
            );
        } else return (
            <div className="Project">
                <p className="home">
                    Hi, welcome to my projects blog.<br/>
                    <small>Select one from the left.</small>
                </p>
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <div className="App-container">
                    <div className="navigation">
                        <ul>
                            <h1>Projects:</h1>
                            {this.state.projectList.reverse().map((project) => {
                                return (
                                    <li key={project}>
                                        <button className="project-button"
                                                onClick={this.handleClick}>{project}</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="content">
                        {this.getProject()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
