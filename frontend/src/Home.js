import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { animateScroll } from "react-scroll";
import axios from "axios";
import './App.css';

class Home extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    message: [
      {username: "firling", message: "lkqjsdfqjsdqcqs dq sdfqsdfqoisoi oijqodi  qdfqsd", date: "15:34"},
      {username: "hihi", message: "lkqjsdfqjsdqcqs d qdfqsd", date: "15:33"},
      {username: "firling", message: "lkqjsdfqjsdqcqs dq sdfqsdfqoisoi oijqodi  qdfqsd", date: "15:34"},
      {username: "hihi", message: "lkqjsdfqjsdqcqs d qdfqsd", date: "15:33"},
      {username: "firling", message: "lkqjsdfqjsdqcqs dq sdfqsdfqoisoi oijqodi  qdfqsd", date: "15:34"},
      {username: "hihi", message: "lkqjsdfqjsdqcqs d qdfqsd", date: "15:33"},
      {username: "firling", message: "lkqjsdfqjsdqcqs dq sdfqsdfqoisoi oijqodi  qdfqsd", date: "15:34"},
      {username: "hihi", message: "lkqjsdfqjsdqcqs d qdfqsd", date: "15:33"},
      {username: "yamette", message: "lkqjsdfqjsdqcdcqsdcqsdcqsqs dq sdfqsdcqsdcqsqsdfqoisoi oijqodi  qdfqsd", date: "15:32"},
    ],
    messageSend: "",
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkToken`, {
      token: localStorage.token
    })
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        }
      })
      .catch(err => {
        this.setState({ redirect: true })
      })
    this.scrollToBottom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chat-message"
    });
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false && this.state.messageSend != "") {
      axios.post(`${this.state.startUrl}/createChatMessage`, {
        token: localStorage.token,
        message: this.state.messageSend.replace("'", "\\'"),
      })
      .then((res) => {
        this.setState({messageSend: ""})
      })
    }
  }

  changeTextArea = (e) => {
    this.setState({messageSend: e.target.value})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="columns is-vcentered" style={{width: "100%", height: "100%"}}>
          <div className="column is-one-third">
            <div className="box has-text-centered chat background-transparent">
              <h3 className="title is-3">Chat</h3>
              <div className="container chat-text" id="chat-message">
                {
                  this.state.message.map((elem, i) => (
                    <div className="chat-message">
                      <div className="chat-header">
                        <label className="chat-username">{elem.username}</label>
                        <label className="chat-date">{elem.date}</label>
                      </div>
                      <p>{elem.message}</p>
                    </div>
                  ))
                }
              </div>
              <div className="chat-send">
                <textarea className="textarea" placeholder="Message" style={{minHeight: "1em", height: "100%"}} value={this.state.messageSend} onChange={this.changeTextArea} onKeyDown={this.onEnterPress} />
              </div>
            </div>
          </div>
          <div className="column">
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
