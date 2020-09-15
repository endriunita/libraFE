import React, { Component } from 'react'
import './../../App.css';
import './../../styles/spinkit.css';
import SockJs from 'sockjs-client';

const url = 'http://localhost:8080';
const Stomp = require('stompjs');
let stompClient;

class Chat extends Component {
  constructor(props){
      super(props);
      this.state={
        errorAtMatch: false,
        beforeQueue: this.props.getMatch() === '',
        inQueue: false,
        matchFound: this.props.getMatch() !== '',
        matchedUser: this.props.getMatch(),
        currentTopic: this.props.getTopic(),
        groupid: this.props.getGroup(),
        messages: [],
        topicError: false,
      }
  }

  componentDidMount(){
    if (this.state.matchFound === true){
      this.setState({
        groupid: this.props.getGroup(),
        messages: [...this.props.messages]
      })
      this.connect(this.state.groupid, this.state.matchedUser)
    }
  }

  componentWillUnmount(){
    if (this.state.matchFound === true){
      stompClient.disconnect();
    }
  }

  async sendTopic(event){
    event.preventDefault()  
    const aux = event.target.topic.value

    const gbooksurl = "https://www.googleapis.com/books/v1/volumes?q=" + aux + "&maxResults=1"
    var data = await fetch(gbooksurl)
    let json = await data.json()
    if (json.totalItems === 0){
      this.setState({
        topicError: true
      })
      return;
    }
    this.setState({
      topicError: false
    })
    const book = json.items[0].volumeInfo.title.substring(0, 34)


    this.setState({
      beforeQueue: false,
      inQueue: true
    })

    const requestOptions = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('librajwt'),
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username: this.props.getUser(),
        topic: book
      })
    }

    fetch(url + '/match', requestOptions)
      .then(response => {
        if (!response.ok){
          this.setState({ errorAtMatch: true,
                          inQueue: false,
                          beforeQueue: true
                        })
          this.props.matchHandler('', '', '')
          return false;
        }
        else {
          return response.json()
        }
      })
      .then( json => {
        if (typeof json.pairname !== "undefined"){
          this.setState({
            matchedUser: json.pairname,
            inQueue: false,
            matchFound: true,
            currentTopic: json.topicname,
            groupid: json.groupid
          })
          this.props.matchHandler(json.pairname, json.topicname, json.groupid)
          this.connect(json.groupid, json.pairname)
        }
      })
      .catch(err => {
        this.setState({
          inQueue: false,
          beforeQueue: true
          
        })
        this.props.matchHandler('', '', '')
        return false;
      })
    
  }

  saveMessage(sender, text){
    const message = {
      sender: sender,
      message: text
    }

    this.props.messageSaver(sender, text)

    this.setState({
      messages: [...this.state.messages, message]
    })
    
  }

  connect(id, match){
    if (this.state.matchFound === true){
      console.log("connecting to chat...")
      let socket = new SockJs('http://localhost:8080/chat')
      stompClient = Stomp.over(socket);
      stompClient.connect( {} , (frame) => {
        console.log('connected to ' + frame)
        stompClient.subscribe("/topic/messages/" + id,(response) => {
          let data = JSON.parse(response.body)
          this.saveMessage(data.sender, data.message)
        })
      })
    }
  }

  sendMessage(sender, text){
    console.log("message was sent from " + sender + " to " + this.state.matchedUser)
    stompClient.send("/app/chat/" + this.state.groupid, {}, JSON.stringify({
      sender: sender,
      message: text
    }));
  }

  handleMessage(event){
    event.preventDefault();

    let aux = event.target.message.value;
    this.myFormRef.reset();
    this.sendMessage(this.props.getUser(), aux)

  }

  handleUnmatch(event){
    this.sendMessage(this.props.getUser(), this.props.getUser() + " has left the chat")
    stompClient.disconnect()
    this.props.resetMessages()
    this.setState({
      messages: []
    })
    this.props.matchHandler('', '', '')
    this.setState({
      beforeQueue: true,
      inQueue: false,
      matchFound: false,
      matchedUser: '',
      currentTopic: '',
      groupid: ''
    })
  }

  render() {

    if (this.state.errorAtMatch === true){
      return (
        <div style={{color: 'red',fontSize: '20px', textAlign: 'center',marginTop: '20vh', marginBottom: '30vh'}}>
          <p>
            Matching has timed out, please try again.
          </p>
        </div>
      );
    }

    if (this.state.beforeQueue === true){
      return (
        this.state.beforeQueue === true && 
          <div style={searchContainerStyle}>
            
            <form className="topicForm" autoComplete="off"  onSubmit={(event) => this.sendTopic(event)}>
              <p style={{color: '#f3f3f3', fontSize: '24px',marginTop: '20px', marginBottom: '40px', marginLeft: '15%', marginRight: '15%'}}>Give me a book title and I'll give you a friend</p>
              <div>
                <input className="inputtopic" name="topic" type="text" placeholder=" "></input>
              </div>
              <div>
                <input className="submittopic" type="submit" value="Go"></input>
              </div>

              { 
                this.state.topicError === true &&
                <div style={{color: 'red'}}>
                  *Please input an actual book name
                </div> 
              }
            </form>
          </div>
      );
    }  
  
    if (this.state.inQueue === true){
      return (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '30vh', marginBottom: '20vh'}}>
          <div className="sk-fold">
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
            <div className="sk-fold-cube"></div>
          </div>
        </div>
      );
    }

    if (this.state.matchFound === true){
      return(
        <React.Fragment>

          <div style={basicStyle}>
            <div className="topbar" style={topbarStyle}>
              <span style={infoStyle}>You're chatting with {this.state.matchedUser}</span>
              <button id="endconv" onClick={(event) => this.handleUnmatch(event)}>End conversation</button>    
            </div>

            <div className="messages_container" style={messageCStyle}>
              <div style={topicStyle}>
                  Topic of discussion: {this.state.currentTopic}
              </div>

              {this.state.messages.map((entry, index) => (
                <div key={index} className={entry.sender === this.state.matchedUser ? "msg_in" : "msg_out"}>
                  {entry.message}
                </div>
              ))}

            </div>

            <div style={inputbarStyle}>
              <form ref={(el) => this.myFormRef = el} autoComplete="off" onSubmit={(event) => this.handleMessage(event)} style={{height: '100%'}}>
                  <input name="message" type="text" style={inputStyle} placeholder="Your message here"></input>
                  <input type="submit" value="Send message" style={submitStyle}></input>
              </form>
            </div>
          </div>

        </React.Fragment>

      );
    }
  }
}

export default Chat;

const searchContainerStyle = {
  marginTop: '20vh',
}

const topbarStyle  = {
  minHeight: '30px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#333',
}

const infoStyle = {
  color: '#f3f3f3', 
  float: 'left', 
  margin: '5px', 
}

const inputStyle = {
  outline: 'none',
  overflow: 'auto',
  height: '100%',
  background: '#333',
  width: '80%',
  border: 'none',
  color: '#eee',
  textIndent: '10px'
}

const submitStyle = {
  height: '100%',
  background: '#333',
  fontWeight: 'bold',
  color: '#f3f3f3',
  width: '20%',
  border: 'none',
  textIndent: '10px',
  cursor: 'pointer'
}

const inputbarStyle = {
  bottom: '10px',
  height: '40px',
}

const messageCStyle = {
  textAlign: 'center',
  overflow: 'auto',
  paddingTop: '20px',
  paddingBottom: '20px',
  height: '50vh',
  elementOverflow: 'hidden',
}

const topicStyle = {
  display: 'inline', 
  color: '#f3f3f3',
  background: '#82ccdd',
  border: 'none',
  borderRadius: '10px',
  padding: '10px',
}

const basicStyle = {
  marginTop: '20vh',
  // background: 'url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F51%2Fed%2Fc0%2F51edc046eb80046ee4755ee71d0f19ca--smartphone.jpg&f=1&nofb=1)',
  background: 'rgba(0, 0, 0, 0.7)',
  marginLeft: '30vw',
  marginRight: '30vw',
}