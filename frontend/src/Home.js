import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { animateScroll } from "react-scroll";
import io from 'socket.io-client';
import axios from "axios";
import './App.css';
import Popup from './Popup';
import config from "./conf/conf.js"

const socket = io(config.socket, { path: "/ws" });

class Home extends Component {

  state = {
    startUrl: config.startUrl,
    redirect: false,
    message: [],
    messageSend: "",
    postCom: [],
    cats: {
      "TO BE TESTED": "test",
      "TO SCRIPTERS": "script",
      "TO MAPPERS": "map",
      "TO DEVS": "dev",
      "OTHER": "other",
      "DONE": "done"
    },
    showPopup: false,
    idPopup: null,
  }

  getChat = () => {
    axios.get(`${this.state.startUrl}/getMessage?token=${localStorage.token}`)
      .then( res => {
        this.setState({ message: res.data.result })
      })
      .catch(err => {
        console.log("ERROR fetching chat", err)
      })
  }

  getPostCom = () => {
    axios.get(`${this.state.startUrl}/getPostCom?token=${localStorage.token}`)
      .then( res => {
        this.setState({ postCom: res.data.result })
        console.log(res.data.result)
      })
      .catch(err => {
        console.log("ERROR fetching postCom", err)
      })
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
    await this.getChat();
    this.scrollToBottom();
    this.getPostCom();
  }

  componentDidUpdate () {
    this.scrollToBottom();
  }

  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: "chat-message"
    });
  }

  tooglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  closePopup = async (id) => {
    await this.getPostCom();
    this.tooglePopup();
  }

  clickPost = async (id) => {
    await this.setState({idPopup: id})
    this.tooglePopup()
  }

  onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false && this.state.messageSend != "") {
      e.preventDefault();
      axios.post(`${this.state.startUrl}/createChatMessage`, {
        token: localStorage.token,
        message: this.state.messageSend.replace("'", "\\'"),
      })
      .then((res) => {
        this.setState({messageSend: ""})
      })
    } else if(e.keyCode == 13 && this.state.messageSend == "") {
      e.preventDefault();
    }
  }

  changeTextArea = (e) => {
    this.setState({messageSend: e.target.value})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }

    socket.on(`chatMessage`, () => {
      this.getChat();
    });

    socket.on(`NewCom`, () => {
      this.getPostCom();
    });

    socket.on(`changePost`, () => {
      this.getPostCom();
    });

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
                      {
                        elem.message.split('\n').map((elt, i) => (
                          <p>{elt}</p>
                        ))
                      }
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
            {
              this.state.postCom.map((elem, i) => (
                <div className="post-com-box">
                  {
                    elem.to_x ? (
                      <div className="block container box background-transparent on-hover back-color-cat" onClick={() => this.clickPost(elem.id)}>
                        <div className={`cat ${this.state.cats[elem.to_x]}`}>
                          <p className="subtitle" style={{color: "rgba(0, 0, 0, 0.9)"}}>{elem.to_x}</p>
                        </div>
                        <p className="subtitle is-right">Created at {elem.created_at.replace('T', ' ').replace('.000Z', '')}</p>
                        <h2 className="title is-2">{elem.title}</h2>
                        <div className="block box background-totally-transparent">
                          {
                            elem.message.split('\n').map((elt, i) => (
                              <p className="subtitle">{elt}</p>
                            ))
                          }
                        </div>
                        <div className="container">
                          <img src={elem.image}/>
                        </div>
                        <div style={elem.image ? {marginTop: "1rem"} : null}>
                          <p className="subtitle">Created by {elem.username}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="block container box background-transparent on-hover back-color-cat"  onClick={() => this.clickPost(elem.post_id)}>
                        <p className="subtitle is-right">Created at {elem.created_at.replace('T', ' ').replace('.000Z', '')}</p>
                        <h3 className="title is-3">Sub com of the {elem.title} post</h3>
                        <div className="block box background-totally-transparent">
                          {
                            elem.com.split('\n').map((elt, i) => (
                              <p className="subtitle">{elt}</p>
                            ))
                          }
                        </div>
                        <div className="container">
                          <img src={elem.image}/>
                        </div>
                        <div style={elem.image ? {marginTop: "1rem"} : null}>
                          <p className="subtitle">Created by {elem.username}</p>
                        </div>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
          {
            this.state.showPopup ?
            <Popup
              closePopup={() => this.closePopup(this.state.idPopup)}
              id={this.state.idPopup}
            />
            : null
          }
        </div>
      </div>
    );
  }
}

export default Home;
