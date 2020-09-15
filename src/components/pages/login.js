import React, { Component } from 'react'
import { NavLink, Redirect }    from 'react-router-dom'

import './../../App.css'

 export default class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            usernameerr: '',
            passworderr: '',
            error: ''
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    doLogin(event){
        this.setState({error: ''})
        event.preventDefault();


        const username = this.state.username;
        const password = this.state.password;

        if (!this.validateForm(username, password)){
            return false;
        }

        const url = "http://localhost:8080/user/authenticate";
        const requestOptions = {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok){
                    this.setState({error: 'yes'})
                    return false;
                }
                else {
                    return response.json();
                }
            
            })
            .then(json => {
                if (typeof json.jwt !== "undefined"){
                    localStorage.setItem('librajwt', json.jwt);
                    localStorage.setItem('librauser', username);
                    this.props.loginHandler(true, username);
                    this.props.fetchPreferences();
                    // window.location.reload(false);
                }
            })
            .catch(err => {
                this.setState({error: 'yes'})
            });
    }


    validateForm(username, password){
        this.setState({usernameerr: ''})
        this.setState({passworderr: ''})

        if (!username){
            this.setState({usernameerr: '*Please enter your username.'})
            return false;
        }
        if (typeof username !== "undefined") {
            if (!username.match(/^[a-zA-Z0-9]*$/)) {
                this.setState({usernameerr: '*Please enter a valid username.'})
                return false;
            }
        }
        

        if (!password) {
            this.setState({passworderr: '*Please enter your password.'})
            return false;
        }
    
        if (typeof password !== "undefined") {
            if (!password.match(/^[a-zA-Z0-9]*$/)) {
              this.setState({passworderr: "*Please enter a valid password."})
              return false;
            }
        }
        

        return true;

    }

    render(){

        if (this.props.isLogged() === true){
            return (<Redirect to="/home"></Redirect>)
        }

        return(
            <div style={boxStyle}>
                
                    
                <form className="inputForm" style={{paddingBottom: '20px'}} onSubmit={(event) => this.doLogin(event)} > 
                    <div style={{color: 'white', paddingTop: '20px', paddingBottom: '10px'}}>
                        <h1>Login</h1>
                    </div>
                    <div>
                        <input 
                        type="text" 
                        className="inputfield"
                        style={(this.state.usernameerr || this.state.error ) ? badInput : null}
                        name="username" 
                        maxLength="20" 
                        placeholder=" "
                        onChange= {this.handleChange}
                        ></input>

                        <label 
                        style={(this.state.usernameerr || this.state.error ) ? badInput : null }
                        htmlFor="username">username</label>
                    </div>
                    
                    {this.state.usernameerr && <div style={errorStyle}>{this.state.usernameerr}</div>}

                    <div>
                        <input type="password" 
                        className="inputfield"
                        style={(this.state.passworderr || this.state.error) ? badInput : null}
                        name="password" 
                        maxLength="20" 
                        placeholder=" "
                        onChange = {this.handleChange}
                        ></input>

                        <label 
                        style={(this.state.passworderr || this.state.error) ? badInput : null}
                        htmlFor="password">password</label>
                    </div>
                    
                    {this.state.passworderr && <div style={errorStyle}>{this.state.passworderr}</div>}

                    <input type="submit" 
                    className="submitButton" 
                    value="Login"
                    ></input>

                    {this.state.error && <div style={errorStyle}>*Your login information is incorrect.</div>}

                    <p style={pStyle}>
                    Don't have an account?
                    <NavLink
                    to="/register"
                    id="authtransition"
                    >
                        Register here
                    </NavLink>
                    </p>
                </form>

            </div>
        );
    }
        
}

const badInput = {
    borderColor: 'red',
    color: 'red',
}

const errorStyle = {
    color: '#d63031',
    marginBottom: '20px',
    fontSize: '14px',
}

const pStyle = {
    marginTop: '20px',
    color: 'white', 
    paddingBottom: '10px',
}

const boxStyle = {
    borderRadius: '5px',
    textAlign: 'center',
    marginTop: '20vh',
}

// const submitStyle = {
//     color: 'dimgrey',
//     display: 'block',
//     margin: '20px auto',
//     width: '7vw',
//     outline: 'none',
//     background: 'none',
//     border: '2px solid #A3CB38',
//     borderRadius: '15px',
//     padding: '6px 8px',
// }