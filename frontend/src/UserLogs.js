import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Popup from './Popup';
import config from "./conf/conf.js"

class Userlogs extends Component {

  state = {
    startUrl: config.startUrl,
    redirect: false,
    users: [],
    username: "",
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
  }

  getAllUser = () => {
    axios.get(`${this.state.startUrl}/getAllUsers`)
      .then( res => {
        this.setState({ users: res.data })
      })
      .catch( err => {
        console.log("Error while getting users.", err)
      })
  }

  getPostCom = (username) => {
    axios.get(`${this.state.startUrl}/getPostComUser?token=${localStorage.token}&username=${username}`)
      .then( res => {
        this.setState({ postCom: res.data.result })
      })
      .catch(err => {
        console.log("ERROR fetching postCom", err)
      })
  }

  changeUser = (e) => {
    this.setState({ username: e.target.value })
    this.getPostCom(e.target.value);
  }

  tooglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  closePopup = async (id) => {
    await this.getPostCom(this.state.username);
    this.tooglePopup();
  }

  clickPost = async (id) => {
    await this.setState({idPopup: id})
    this.tooglePopup()
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkTokenAdmin`, {
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
    this.getAllUser();

    axios.get(`${this.state.startUrl}/username?token=${localStorage.token}`)
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        } else {
          this.setState({ username: res.data.username.charAt(0).toUpperCase() + res.data.username.substr(1) })
          this.getPostCom(res.data.username);
        }
      })
      .catch(err => {
        this.setState({ redirect: true })
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="block container App">
          <div className="select">
            <select onChange={this.changeUser}>
              {
                this.state.users.map((elt, i) => (
                  <option selected={elt.username == this.state.username}>{elt.username}</option>
                ))
              }
            </select>
          </div>
          <div className="block container" style={{marginTop: "2rem"}}>
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
    );
  }
}

export default Userlogs;
