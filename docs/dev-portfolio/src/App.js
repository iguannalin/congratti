import React from 'react';
import './App.scss';
import ProjectsController from "./components/ProjectsController";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: ['Spotify Recently Added', 'Filmotography', 'eaturveg'],
            selectedProject: sessionStorage.getItem('pdiddy') || null
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.getProject = this.getProject.bind(this);
    }

    handleClick(e) {
        const projectName = (e) ? e.target.innerText.toLowerCase() : null;
        this.setState({selectedProject: projectName});
        sessionStorage.setItem('pdiddy', projectName);
    }

    handleBackButtonClick() {
        sessionStorage.removeItem('pdiddy');
        this.setState({selectedProject: null});
    }

    getProject() {
        if (this.state.selectedProject) return (
            <div>
                <button aria-label="Back to instructions" className="project-button"
                        onClick={this.handleBackButtonClick}>&#8592;</button>
                <ProjectsController projectName={this.state.selectedProject}/></div>
        ); else return (
            <p className="home">
                Hi, welcome to my projects blog.<br/>
                <small>Select one from the menu.</small>
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
                            <br/>
                            <span className="in-progress-label">current</span>
                            <li>
                                <a className="project-button"
                                   href="https://annaylin.com/blog/text-me-smth-nice">text-me-smth-nice</a>
                                <span className="in-progress-label">(work in progress)</span>
                            </li>
                            <li>
                                <a className="project-button" href="https://iguannalin.github.io/alphabet-soup/">alphabet
                                    soup</a>
                            </li>
                            <br/>
                            <li>
                                <a className="project-button" href="https://annaylin.com/blog/">older stuff</a>
                            </li>
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
