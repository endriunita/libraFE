import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import PreferenceList from './../layout/preferencelist'

import './../../App.css';
import './../../styles/account.css'

class Account extends Component{
    constructor(props){
        super(props);
        this.state = {
            preferences: [],
            addError: false,
        }
        
    }

    componentDidMount() {
        this.props.fetchPreferences()
        
        let array = this.props.getPreferences()
        this.setState({
            preferences: [...this.state.preferences, ...array]
        })
    }

    deletePreference = (preference) => {
        this.props.delPreference(preference)
        this.setState({
            preferences: [...this.state.preferences.filter(pref => pref !== preference)]
        })
    }

    async addPreference(event){
        event.preventDefault();
        let aux = event.target.inputpref.value

        if (!aux.match('^[a-zA-Z ]{3,16}$')){
            this.setState({
                addError: true
            })
            return
        }
        this.setState({
            addError: false
        })
        event.target.inputpref.value = ''
        this.props.addPreference(aux)
        this.setState({
            preferences: [...this.state.preferences, aux]
        })
    }

    getPreferences = () => {
        let aux = this.state.preferences
        return aux
    }

    render() {
        if(this.props.isLogged() !== true){
            return (<Redirect to="/home"></Redirect>);  
        }

        return(
            <div id="container" style={containerStyle}>

                <PreferenceList delPreference={this.deletePreference} getPreferences={this.getPreferences} />

                <div style={{color: 'white', fontSize: '20px', margin: '20px', fontWeight: '500', width: '40%', position: 'relative'}}>
                    
                    <form autoComplete="off" onSubmit={(event) => this.addPreference(event)} style={{textAlign: 'start', verticalAlign: 'middle', position: 'absolute', left: '25%', bottom: '40%'}}>
                        <p style={{fontSize: '20px', fontWeight: '575'}}>Add a preference</p>
                        <div>
                            <input type="text" name="inputpref" className="inputfield" placeholder=" "></input>
                        </div>
                        
                        <div>
                            <input type="submit" className="submitButton" value="Add preference"></input>
                        </div>

                    </form>

                    { this.state.addError === true && 
                            <div style={{color: 'white', fontSize: '14px', marginTop: '50px', textAlign: 'center', position: 'absolute', bottom: '30%', left: '25%'}}>
                                <p>
                                    Please input <span style={{color: 'red'}}>valid</span> preferences
                                </p>
                            </div>
                        }

                </div>
                
                
                
            </div>
        );
    }
}




const containerStyle = {
    height: '500px',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10vh',
    marginRight: '20vw',
    marginLeft: '30vw',
    background: 'rgba(0,0,0, 0.7)',
}




export default Account;