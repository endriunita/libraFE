import React, { Component } from 'react'
import './../../App.css'


class Welcome extends Component{
    render(){
        return(
            <div style={hcStyle}>
              <div style={titleStyle}>
                <h1 style={{textShadow: '0px 15px 5px rgba(0,0,0,0.1),10px 20px 5px rgba(0,0,0,0.05),-10px 20px 5px rgba(0,0,0,0.05)'}}>
                  Find yourself a book-buddy, right now
                </h1>
              </div>
            </div>
        );
    }   
}

export default Welcome;

const hcStyle = {
    marginTop: '15vh',
    textAlign: 'center',
    color: '#f3f3f3',
    fontSize: '28px',
    marginBottom: '20vh',
    fontFamily: '\'Roboto\', sans-serif'
  }
  
  const titleStyle = {
    marginLeft: '30vw',
    marginRight: '30vw',
    
  }
