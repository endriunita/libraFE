import React from 'react'
import { NavLink} from 'react-router-dom'

import './../../App.css'

function Footer() {
    return (
        <div style={footerStyle}>

            <div style={detailStyle}>
                <ul style={detailLiStyle}>
                    
                    <li className="footerList">
                        <NavLink
                        to="/">
                            <img alt="logo" style={{height: '50px', width: 'auto'}} src="https://i.imgur.com/ElN5R7y.png"></img>
                        </NavLink>
                        
                        <p style={{fontWeight: 'normal'}}>© 2020</p>
                    </li>
                    
                    <li className="footerList">
                        

                        <div style={{fontWeight: 'normal'}}>
                            <h4 style={titleStyle}>Navigate</h4>

                            <NavLink
                            style={linkStyle}
                            to="/home"
                            >Home</NavLink>
                            <br></br>
                            <NavLink
                            style={linkStyle}
                            to="/register"
                            >Sign up</NavLink>
                            <br></br>
                            <NavLink
                            style={linkStyle}
                            to="/login"
                            >Log in</NavLink>
                            <br></br>
                            <NavLink
                            style={linkStyle}
                            to="/about"
                            >About</NavLink>
                        </div>
                    </li>

                    <li className="footerList">
                        
                        <div style={{fontWeight: 'normal'}}>
                            <h4 style={titleStyle}>Legal</h4>

                            <NavLink
                            style={linkStyle}
                            to="/privacy">
                                Privacy
                            </NavLink>
                        </div>
                    </li>

                    <li className="footerList">
                        <div style={{fontWeight: 'normal'}}>
                            <h4 style={titleStyle}>Contact</h4>

                            <a 
                            href="https://instagram.com" 
                            style={linkStyle}>
                                Instagram
                            </a>
                            <br></br>
                            <a 
                            href="https://www.facebook.com" 
                            style={linkStyle}>
                                Facebook 
                            </a>
                            <br></br>
                            <a
                            href="https://www.twitter.com"
                            style={linkStyle}>
                                Twitter
                            </a>
                        </div>
                    </li>
                </ul>
            </div>

            <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
                <hr style={barStyle}></hr>
            </div>
            

            <div style={containerStyle}>
                <span style={{marginLeft: '50vw'}}>
                    Made with
                    <span aria-label="love" role="img">❤️</span>
                    in Cluj-Napoca
                </span>

                <a style={{marginLeft: '5vw'}} href="https://discord.gg/ftSanJS">
                    <img alt="Discord hook" style={imgStyle} src="https://i.imgur.com/n79M4Fd.png"></img>
                </a>
            </div>
        </div>
    );
}

const footerStyle = {
    paddingTop: '5vh',
    color: '#f3f3f3',
    fontFamily: 'Roboto, sans-serif',
    width: '100%',
    background: '#111',
}

const detailStyle = {
    // padding: '50px 50px'
    padding: '0 0',
}

const detailLiStyle = {
    display: 'flex',
    justifyContent: 's',
    listStyle: 'none'
}

const barStyle = {
    width: '80%',
    border: '0',
    height: '0',
    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
}

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}



const imgStyle = {
    height: '50px',
    width: 'auto',
}

const linkStyle = {
    textDecoration: 'none',
    color: '#f3f3f3',
    background: 'none',
    marginBottom: '5px',
    border: 'none',
}



const titleStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '5px'
}

export default Footer;