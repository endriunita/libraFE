import React, { Component } from 'react';
import './App.css';
import Radium from 'radium'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';


import Welcome from './components/pages/welcome'
import Chat from './components/pages/chat'
import Account from './components/pages/account'
import Login from './components/pages/login'
import Register from './components/pages/register'
import Privacy from './components/pages/privacy'
import About from './components/pages/about'
import PodcastContainer from './components/layout/podcast'
import Header from './components/layout/header'
import Footer from './components/layout/footer'


class App extends Component{
  state = {
    isAuth: localStorage.getItem('librajwt') !== null,
    currentUser: localStorage.getItem('librauser'),
    matchedUser: '',
    matchedTopic: '',
    matchGroupId: '',
    messages: [],
    preferences: [],
    validJwt: true
  }

  componentDidMount() {
    if (this.state.isAuth === true){
      this.fetchPreferences()
    }
  }

  addPreference = (pref) => {
    let url = "http://localhost:8080/preferences/addpref"
    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('librajwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        preference: pref
       })
    }

    fetch(url, requestOptions)
      .then(response => {
        if (response.ok){
          return response.json()
        }
        else if (response.status === 403){
          throw new Error('Jwt is expired')
        }
      })
      .then( json => {
        return true
      })
      .catch (err => {
        if (err.message === 'Jwt is expired'){
          this.handleExpiredJwt()
        }
      })
  }

  fetchPreferences = () => {
    if (this.state.isAuth){
      let prefsurl = "http://localhost:8080/preferences/getall"
      
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('librajwt'),
          'Content-Type': 'application/json',
        }
      }
      
      fetch(prefsurl, requestOptions)
        .then(response => {
          if (response.ok){
            return response.json()
          }
          else if (response.status === 403) {
            throw new Error('Jwt is expired')
          }
        })
        .then( json => {
          this.setState({
            preferences: []
          })
          for (var i=0; i<json.length; i++){
            this.setState({
              preferences: [...this.state.preferences, json[i].preference]
            })
          }
          return json
        })
        .catch (err => {
          if (err.message === "Jwt is expired"){
            this.handleExpiredJwt()
          }
        })
    }
  }

  handleExpiredJwt = () => {
    this.setState({
      validJwt: false
    })
    setTimeout(() => {
      this.doLogout()
    }, 5000)
  }

  deletePreference = (pref) => {
    this.setState({
      preferences: [...this.state.preferences.filter(preference => preference !== pref)]
    })
    let url = "http://localhost:8080/preferences/delete"

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('librajwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        preference: pref
       })
    }
    fetch(url, requestOptions)
      .then(response => {
        if (response.status === 403){
          throw new Error('Jwt is expired')
        }
      })
      .catch(err => {
        if (err.message === 'Jwt is expired'){
          this.handleExpiredJwt()
        }
      })
  }

  getPreferences = () => {
    let prefs = this.state.preferences
    return prefs
  }

  handleLogin = (val, user) => {

    this.setState({
      isAuth: val,
      currentUser: user
    })
  }

  handleMatch = (user, topic, groupid) => {
    this.setState({
      matchedUser: user,
      matchedTopic: topic,
      matchGroupId: groupid
    })
  }

  setMessages = (sender, content) => {
    const message = {
      sender: sender,
      message: content
    }
    
    this.setState({
      messages: [...this.state.messages, message]
    })
  }

  getMessages = () => {
    return this.state.messages
  }

  getMatchedUser = () => {
    return this.state.matchedUser
  }

  getMatchedTopic = () => {
    return this.state.matchedTopic
  }

  getMatchedGroupId = () => {
    return this.state.matchGroupId
  }

  doLogout = () => {
    localStorage.removeItem('librajwt')
    localStorage.removeItem('librauser')
    this.setState({
      isAuth: false,
      currentUser: '',
    })
    window.location.reload(false);
  }

  checkAuth = () => {
    const aux = this.state.isAuth
    return aux
  }

  getJwt = () => {
    let jwt = localStorage.getItem('librajwt')
    return jwt
  }

  resetMessages = () => {
    this.setState({
      messages: []
    })
  }

  getCurrentUser = () => {
    const aux = this.state.currentUser
    return aux
  }

  async getRandPref(){
    const url = "http://localhost:8080/preferences/getrand"

    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('librajwt'),
        'Content-Type': 'application/json',
      },
    }

    var data = await fetch(url, requestOptions)
    let json = await data.json()


    var spreakerapi = 'https://api.spreaker.com/v2/search?type=shows&q=' + json.content + '&limit=40'

    data = await fetch(spreakerapi)
    json = await data.json()

    return json

  }

  render(){
    return (
      <Router>
        <div className="App">

            <div className="main__content">

              <Header getUser={this.getCurrentUser} isLogged={this.checkAuth} logoutHandler={this.doLogout} loginHandler={this.handleLogin} />

              {<div style={[expiredContainerStyle, {opacity: this.state.validJwt === false ? '1' : '0' }]} >Your session has expired, you will be logged out shortly</div>}

              {this.state.isAuth === true && this.state.preferences.length > 0 && <PodcastContainer getPref={this.getRandPref}></PodcastContainer>}

              <Route exact path="/home">
                <Welcome></Welcome>
              </Route>

              <Route exact path="/privacy">
                <Privacy></Privacy>
              </Route>
              
              <Route exact path="/login">
                <Login fetchPreferences={this.fetchPreferences} isLogged={this.checkAuth} loginHandler={this.handleLogin}/>
              </Route>

              <Route exact path="/register">
                <Register isLogged={this.checkAuth}/>
              </Route>

              <Route exact path="/about">
                <About></About>
              </Route>

              <Route exact path="/chat">
                <Chat messages={this.state.messages} messageSaver={this.setMessages} resetMessages={this.resetMessages} getMessages={this.getMessages} getMatch={this.getMatchedUser} getTopic={this.getMatchedTopic} getGroup={this.getMatchedGroupId} matchHandler={this.handleMatch} getUser={this.getCurrentUser}/>
              </Route>

              <Route exact path="/account">
                <Account delPreference={this.deletePreference} addPreference={this.addPreference} fetchPreferences={this.fetchPreferences} getPreferences={this.getPreferences} getJwt={this.getJwt} isLogged={this.checkAuth} getUser={this.getCurrentUser}></Account>
              </Route>

              <Redirect from="*" to="/home"></Redirect>
            </div>
            
            <Footer></Footer>
          </div>
      </Router>
    );
  }
}

export default Radium(App);

const expiredContainerStyle = {
  backgroundColor: 'rgba(15, 15, 15, 0.2)',
  borderBottomRightRadius: '15px',
  borderTopLeftRadius: '15px',
  borderBottomLeftRadius: '15px',
  color: 'red',
  textAlign: 'center',
  position: 'absolute',
  fontSize: '18px',
  fontWeight: 'bold',
  left: '10%',
  padding: '10px 5px',
  transition: 'opacity 0.25s ease-in',
}