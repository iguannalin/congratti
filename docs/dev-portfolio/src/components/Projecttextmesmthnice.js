import React from "react";

const Projecttextmesmthnice = () => {
    return (
        <div>
            <div className="project-link"><a href="https://annaylin.com/blog/text-me-smth-nice">View Project</a></div>
            <h2>About this project</h2>
            <div className="project-details">
                <p>Currently trying to figure out how to use the Twilio sms api to take a list of phone numbers, and
                    send out routine nice messages via a strange combination of Google App Engine, Heroku, and
                    Python.</p>
                <p>The way it currently works is: someone enters their phone number into HTML form -> submitting form
                    makes a request to a Python app hosted by Google App Engine ->
                    <span className="strike-through">Python app writes the new phone
                    number to a file in an online repository and pushes it -> Python app hosted by Heroku automatically
                        redeploys on every push and runs script periodically to send texts to the list of phone numbers.</span>
                </p>
                <p>The hardest part was figuring out of all the technology out there, which ones to use for my use case
                    and which were overkill. <span className="strike-through">I think there's probably a way to do this in Django, to host a database
                    that gets updated, instead of the combination of scripting a push in my app on Google App Engine,
                        and waiting for that push on my app hosted on Heroku, and I'd love to revisit this some more.</span>
                </p>
                <p>Update: Going to try out PostgreSQL, which is a persistent data storage add-on to Heroku, instead.</p>
                    <p>Also
                    please feel free to write to me if you are reading this and have some thoughts.</p>
            </div>
        </div>
    );
};

export default Projecttextmesmthnice;

