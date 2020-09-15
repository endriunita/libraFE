import React from 'react';
import { NavLink } from 'react-router-dom';
import './../../styles/header.css';
import Radium from 'radium';

import Dropdown  from './../layout/dropdown';

class Header extends React.Component {

    render() {

        var linkStyle = {
            textDecoration: 'none',
            color: '#f3f3f3',
            fontWeight: '500',
            ":hover": {
                color: 'green',
            },
            marginLeft: '5vw',
            
        }

        return(
            <React.Fragment>
                <ul id="header_list">
                    <li>
                        <NavLink
                        to="/home">
                            <img style={this.props.isLogged() === true ? lHStyle : logoStyle} src="https://i.imgur.com/dkx6Han.png" alt="logo"/>
                        </NavLink>
                        
                    </li>
        
                    <li className="menuBtn">
                        <NavLink 
                        activeStyle={{
                            color: '#8fdd3c',
                        }}
                        className="menuLink"
                        style={linkStyle}
                        to="/home">
                            Home
                        </NavLink>
                    </li>
        

                    {
                        this.props.isLogged() === false &&
                        <li className="menuBtn">
                            <NavLink 
                            activeStyle={{
                                color: '#8fdd3c',
                            }}
                            className="menuLink"
                            style={linkStyle}
                            to="/login">
                                Account
                            </NavLink>
                        </li>
                        
                    }
        
                    {
                        this.props.isLogged() === true &&
                        <li className="menuBtn">
                            <NavLink
                            activeStyle={{
                                color: '#8fdd3c',
                            }}
                            className="menuLink"
                            style={linkStyle}
                            to="/chat">
                                Messenger
                            </NavLink>
                        </li>
                        
                    }

                    <li>
                        <NavLink
                        style={linkStyle}
                        activeStyle={{
                            color: '#8fdd3c',
                        }}
                        to="/about">
                            About
                        </NavLink>
                    </li>
                    
                
                    {this.props.isLogged() === true &&
                        <Dropdown doLogout={this.props.logoutHandler} isLogged={this.props.isLogged} getUser={this.props.getUser}></Dropdown>
                    }

                </ul>

                
                
            </React.Fragment>
            
        );
    }
    
}

Header = Radium(Header);
export default Header;

const logoStyle = {
    maxHeight: '80px',
    padding: '10px',
    marginRight: '15vw',
    width: 'auto'
}



const lHStyle = {
    maxHeight: '80px',
    padding: '10px',
    marginRight: '5vw',
    width: 'auto'
}


