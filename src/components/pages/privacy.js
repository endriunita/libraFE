import React from 'react';
import './../../App.css';

function Privacy() {
    return(
        <div style={contentStyle}>
            <h1>
                Information that is gathered from visitors
            </h1>
            <p>
                In common with other websites, log files are stored on the web server saving details such as the visitor's IP address, browser type, referring page and time of visit.

                Cookies may be used to remember visitor preferences when interacting with the website.

                Where registration is required, the visitor's email and a username will be stored on the server.
            </p>

            <h1>
                How the Information is used
            </h1>
            <p>
                The information is used to enhance the vistor's experience when using the website to display personalised content and possibly advertising.

                E-mail addresses will not be sold, rented or leased to 3rd parties.

                E-mail may be sent to inform you of news of our services or offers by us or our affiliates.
            </p>

            <h1>
                Visitor Options 
            </h1>
            <p>
                If you have subscribed to one of our services, you may unsubscribe by following the instructions which are included in e-mail that you receive.

                You may be able to block cookies via your browser settings but this may prevent you from access to certain features of the website.
            </p>

            <h1>
                Cookies
            </h1>

            <p>
                Cookies are small digital signature files that are stored by your web browser that allow your preferences to be recorded when visiting the website. 
                Also they may be used to track your return visits to the website.

                3rd party advertising companies may also use cookies for tracking purposes.
            </p>
        </div>
    );
}


export default Privacy;

const contentStyle = {
    padding: '40px',
    marginTop: '20vh',
    background: '#222',
    color: '#f3f3f3',
    marginLeft: '20vw',
    marginRight: '20vw'
}