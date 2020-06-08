import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        if (this.state.selectedProject) return (
            <div className="Project">
                <h1>{this.state.selectedProject}</h1>
                {React.createElement('Project'+this.state.selectedProject.replaceAll(' ', ''), {})}
            </div>
        );
        else return (
            <div className="Project">
                <p className="home">
                    Hi, welcome to my projects blog.<br/>
                    <small>Select one from the left.</small>
                </p>
            </div>
        )
            ;
    }

    render() {
        return (
            <div className="App">
                <div className="navigation">
                    <ul>
                        <h1>Projects:</h1>
                        {this.state.projectList.map((project) => {
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
        );
    }
}

export default App;
