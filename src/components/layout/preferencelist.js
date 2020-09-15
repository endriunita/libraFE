import React, { Component } from 'react';

import PreferenceItem from './preference'

export default class PreferenceList extends Component{

    render() {
        return (

            <div style={prefListStyle}>

                <div style={titleStyle}>
                    Your preferences
                </div>

                <div style={containerList}>
                    {this.props.getPreferences().map((preference, index) => (
                        <PreferenceItem key={index} delPref={this.props.delPreference} preference={preference}/>
                    ))}
                </div>
            
            </div>

        );
    }
}

const titleStyle = {
    color: 'white', 
    fontSize: '20px', 
    margin: '30px', 
    fontWeight: '575'
}

const containerList = {
    margin: '10px',
    marginTop: '0', 
    overflow: 'auto', 
    background: 'rgba(155,155,155,0.2)', 
    height: '80%'
}

const prefListStyle = {
    width: '60%',
    borderRight: '10px solid #333',
}