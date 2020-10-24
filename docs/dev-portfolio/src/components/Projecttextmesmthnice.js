import React from "react";

const Projecttextmesmthnice = () => {
    return (
        <div>
            <div className="project-link"><a href="https://annaylin.com/text-me-smth-nice">View Project</a></div>
            <h2>About this project</h2>
            <div className="project-details">
                <p>For this project, I wanted to challenge myself a little and create a simple messaging service that
                    will send out a nice text to someone, every once in a while.</p>
                <p>I started with basically no knowledge, and received a lot of help from asking questions on
                    StackOverflow. The problem I struggled with most was figuring out the tech stack, and what suited
                    my use case best.</p>
                <p>This is how it currently runs: Google App Engine hosts the Python &
                    Flask API route &rarr; Heroku hosts a Python script that runs on a schedule to periodically call the
                    Twilio messaging API &rarr; and the user makes a call to the API when they submit a form on my
                    website
                    with their phone number.</p>
                <p>There are some security concerns for sure, and also it's currently running on the trial Twilio
                    service, so I will work on polishing the app a bit more. Overall, I had a lot of fun building it,
                    and like a sad Christmas, got to play around with some new toys!</p>
            </div>
        </div>
    );
};

export default Projecttextmesmthnice;

