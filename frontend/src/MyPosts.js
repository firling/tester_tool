import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from "axios";
import './App.css';

class MyPosts extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    posts: [],
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

    axios.post(`${this.state.startUrl}/getAllPost`, {
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="hero-body">
        <div className="container">
          <div className="column ">
            {
              this.state.posts.map((elt, index) => (
                <div className="block container box background-transparent">
                  <h2 className="title is-2">{elt.title}</h2>
                  <p className="subtitle">{elt.message}</p>
                  <div className="container">
                    <img src={elt.image}/>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default MyPosts;
