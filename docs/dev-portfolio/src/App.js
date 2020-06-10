import React from 'react';
import './App.css';
import ProjectsController from "./components/ProjectsController";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: ['Spotify Recently Added', 'Filmotography', 'eaturveg'],
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
            <ProjectsController projectName={this.state.selectedProject}/>
        ); else return (
            <p className="home">
                Hi, welcome to my projects blog.<br/>
                <small>Select one from the left.</small>
            </p>
        );
    }

    render() {
        return (
            <div className="App">
                <div className="App-container">
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
                        <div className="Project">
                            {this.getProject()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
