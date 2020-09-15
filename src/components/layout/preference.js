import React, { Component } from 'react';


export default class PreferenceItem extends Component{

    render() {
        let pref = this.props.preference

        return(
            <div style={preferenceStyle} className="preference">
                <p style={titleStyle}>{this.props.preference}</p>
                
                <button style={delStyle} onClick={this.props.delPref.bind(this, pref)}>
                    <img alt="deletepref" style={iconStyle} src="https://img.icons8.com/flat_round/64/000000/delete-sign.png"></img>
                </button>
            </div>
        );
    }
}

const preferenceStyle = {
    background: '#2f3542',
    borderRadius: '20px',
    padding: '4px 10px',
    color: '#f3f3f3', 
    margin: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'middle'
}

const titleStyle = {
    fontWeight: '400', 
    paddingRight: '20px'
}

const delStyle = {
    cursor: 'pointer', 
    border: 'none', 
    background: 'none', 
    outline: 'none'
}

const iconStyle = {
    height: '20px', 
    width: 'auto', 
    float: 'right', 
    border: 'none',
}