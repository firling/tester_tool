import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';

class Home extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
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
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="columns is-vcentered" style={{width: "100%"}}>
          <div className="column">
            Aya
          </div>
          <div className="column is-one-third">
            <div className="box has-text-centered">
              <h3 className="title is-3 title-color">Chat</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
