import React from 'react';
import './App.css';
import ScrollContainer from './shared/ScrollContainer';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>A window into the outside world,</h1>
                <h2>from Anna's eyes</h2>
            </header>
            <ScrollContainer></ScrollContainer>
        </div>
    );
}

export default App;
