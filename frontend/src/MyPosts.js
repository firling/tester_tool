import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Popup from './Popup';
import config from "./conf/conf.js"

class MyPosts extends Component {

  state = {
    startUrl: config.startUrl,
    redirect: false,
    posts: [],
    showPopup: false,
    idPopup: null,
    cats: {
      "TO BE TESTED": "test",
      "TO SCRIPTERS": "script",
      "TO MAPPERS": "map",
      "TO DEVS": "dev",
      "OTHER": "other",
      "DONE": "done"
    },

  }

  getAllPost = () => {
    axios.post(`${this.state.startUrl}/getAllPostUser`, {
      token: localStorage.token
    })
      .then(res => {
        this.setState({
          posts: res.data.result
        })
      })
      .catch(err => {
        console.log('err get post', err)
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

    this.getAllPost();
  }

  tooglePopup = () => {
    this.setState({ showPopup: !this.state.showPopup })
  }

  closePopup = async (id) => {
    await this.getAllPost();

    this.tooglePopup();
  }

  clickPost = async (id) => {
    await this.setState({idPopup: id})
    this.tooglePopup()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="container">
          <div className="column">
            {
              this.state.posts.map((elt, index) => (
                <div className="block container box background-transparent on-hover back-color-cat" onClick={() => this.clickPost(elt.id)}>
                  <div className={`cat ${this.state.cats[elt.to_x]}`}>
                    <p className="subtitle" style={{color: "rgba(0, 0, 0, 0.9)"}}>{elt.to_x}</p>
                  </div>
                  <p className="subtitle is-right">Created at {elt.created_at.replace('T', ' ').replace('.000Z', '')}</p>
                  <h2 className="title is-2">{elt.title}</h2>
                  <div className="block box background-totally-transparent">
                    {
                      elt.message.split('\n').map((elem, i) => (
                        <p className="subtitle">{elem}</p>
                      ))
                    }
                  </div>
                  <div className="container">
                    <img src={elt.image}/>
                  </div>
                  <div style={elt.image ? {marginTop: "1rem"} : null}>
                    <p className="subtitle">Created by {elt.username}</p>
                  </div>
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

export default MyPosts;
