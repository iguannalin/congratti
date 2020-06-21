import React from "react";

const Projectspotifyrecentlyadded = () => {
    return (
        <div>
            <a href="https://iguannalin.github.io/spotify-recently-added/">View Project</a>
            <h2>About this project</h2>
            <div className="project-details">
                <p>Before I was introduced to Spotify, I listened to all my music on the iTunes app. One feature I
                    enjoyed was the 'Recently Added' playlist, that iTunes auto-generates based on the top 20
                    tracks you most recently added to your music library.</p>
                <p>Spotify doesn't offer this feature, but I was excited to find that they have a <a
                    href="https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/"
                    rel="noopener noreferrer"
                    target="_blank">really well-documented API for developers</a> to use.</p>
                <p>I took a stab at it, and ended up with a functional app that currently serves one happy
                    user: me :) !</p>
                <p>The biggest challenge I had during this app was figuring out how the Spotify authentication worked.
                    It took me a while to figure out, but finally I realized that the way the auth process worked was
                    this: Log in to Spotify with the developer key &#8594; Redirect back to the app with a fresh
                    code &#8594; Fetch that code from the url use it to make requests to the API.</p>
            </div>
        </div>
    );
};

export default Projectspotifyrecentlyadded;
