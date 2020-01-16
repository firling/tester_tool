import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
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

  logout = (history) => {
    localStorage.setItem("token", "");
    this.setState({redirect: true})
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/login" />;
    }
    const Button = withRouter(({ history }) => (
      <button className="button is-danger" onClick={() => this.logout(history)}>Log Out</button>
    ))
    return (
      <div>
        <Button />
      </div>
    );
  }
}

export default Home;
