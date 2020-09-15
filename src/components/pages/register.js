import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom'


import './../../App.css';

export default class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: '',
            rpass: '',
            usererr: '',
            passerr: '',
            rpasserr: '',
            error: '',
            toHome: ''
        }
    }

    handleChange = ({target}) => {
        this.setState({
            [target.name]: target.value
        });
    };

    doRegister(event){
        this.setState({error: ''})
        event.preventDefault();

        const user = this.state.username;
        const pass = this.state.password;
        const rpass = this.state.rpass;

        if (!this.validateForm(user, pass, rpass)){
            return false;
        }

        const url="http://localhost:8080/user/register";
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: user,
                password: pass
            })
        }

        fetch(url, requestOptions)
            .then(response =>{
                if (!response.ok){
                    this.setState({error: 'yes'});
                    return false;
                }
                else {
                    this.setState({
                        toHome: true,
                    });
                    return response.json();
                }
            })
            .then(json => {
                if (typeof json.code !== "undefined"){
                    window.location.reload(true);
                }
            })
    }

    validateForm(user, pass, rpass){
        this.setState({usererr: ''});
        this.setState({passerr: ''});
        this.setState({rpasserr: ''});

        if (!user){
            this.setState({usererr: '*Please enter your desired username.'})
            return false;
        }

        if (typeof user !== "undefined") {
            if (!user.match(/^[a-zA-Z0-9]*$/)) {
                this.setState({usererr: '*Please enter a valid username.'});
                return false;
            }
        }

        if (!pass){
            this.setState({passerr: '*Please enter your desired password.'});
            return false;
        }

        if (typeof pass !== "undefined"){
            if (!pass.match(/^[a-zA-Z0-9]*$/)) {
                this.setState({passerr: "*Please enter a valid password."})
                return false;
              }
        }

        if (!rpass) {
            this.setState({rpasserr: '*Please repeat your password.'});
            return false;
        }

        if (typeof rpass !== "undefined"){
            if (!rpass.match(/^[a-zA-Z0-9]*$/)) {
                this.setState({rpasserr: '*Please repeat your password.'});
                return false;
            }
        }

        if (rpass !== pass){
            this.setState({rpasserr: '*The passwords must match.'});
            return false;
        }

        return true;
    }
    

    render() {
        if(this.props.isLogged() !== false){
            return (<Redirect to="/home"></Redirect>);
        }

        if(this.state.toHome === true){
            return (
                <Redirect to="/"></Redirect>
            );
        }


        return(
            <React.Fragment>

                <div style={boxStyle}>
                    
    
                    <form className="inputForm" onSubmit={(event) => this.doRegister(event)}>
                        
                        <div style={{color: 'white', paddingTop: '20px', paddingBottom: '10px'}}>
                            <h1>Register</h1>
                        </div>

                        <div>
                            <input 
                            name="username"
                            type="text"
                            className="inputfield"
                            style={(this.state.usererr || this.state.error) ? badInput : null}
                            maxLength="20" 
                            placeholder=" "
                            onChange={this.handleChange}></input>

                            <label 
                            style={(this.state.usererr || this.state.error) ? badInput : null}
                            htmlFor="username">username</label>
                        </div>
                        
                        {this.state.usererr && <div style={errorStyle}>{this.state.usererr}</div>}
        
                        <div>
                            <input 
                            name="password"
                            type="password" 
                            className="inputfield" 
                            style={(this.state.passerr || this.state.error) ? badInput : null}
                            maxLength="20" 
                            placeholder=" "
                            onChange={this.handleChange}></input>

                            <label 
                            style={(this.state.passerr || this.state.error) ? badInput : null}
                            htmlFor="pass">password</label>
                        </div>
                        
                        {this.state.passerr && <div style={errorStyle}>{this.state.passerr}</div>}
        
                        <div>
                            <input 
                            name="rpass"
                            type="password" 
                            className="inputfield" 
                            style={(this.state.rpasserr || this.state.error) ? badInput : null}
                            maxLength="20" 
                            placeholder=" "
                            onChange={this.handleChange}></input>

                            <label 
                            style={(this.state.rpasserr || this.state.error) ? badInput : null}
                            htmlFor="rpass">repeat password</label>
                        </div>
                        
                        {this.state.rpasserr && <div style={errorStyle}>{this.state.rpasserr}</div>}
        
        
                        <input 
                        type="submit" 
                        className="submitButton" 
                        value="Register">
                        </input>

                        {this.state.error && <div style={errorStyle}>This username is taken.</div>}
    
                        <p style={pStyle}>
                        Already have an account?
                            <NavLink
                            to="/login"
                            id="authtransition"
                            >
                                Login here
                            </NavLink>
                        </p>

                    </form>

                    
                </div>

            </React.Fragment>
            
        );
    }
    
}

const errorStyle = {
    color: '#d63031',
    marginBottom: '20px',
    fontSize: '14px',
}

const boxStyle = {
    borderRadius: '5px',
    textAlign: 'center',
    marginTop: '20vh',
}

const pStyle = {
    color: 'white', 
    marginTop: '20px',
    paddingBottom: '10px',
}

const badInput = {
    borderColor: 'red',
    color: 'red',
}