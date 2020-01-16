import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Login from "./Login";
import Home from "./Home";
import Header from "./Header";

class App extends Component {

  state = {
    startUrl: "http://localhost:3001",
    redirect: false,
    redirectAfterLogin: false,
  }

  async componentDidMount () {
    axios.post(`${this.state.startUrl}/checkToken`, {
      token: localStorage.token
    })
      .then( res => {
        if (res.status !== 200) {
          this.setState({ redirect: true })
        } else {
          this.setState({ redirectAfterLogin: true })
        }
      })
      .catch(err => {
        this.setState({ redirect: true })
      })
  }

  render() {
    return (
      <Router>

        <Route path='/login' exact component={() => <Login />} />
        <Route path='/home' component={() => (
          <div>
            <Header />
            <Home />
          </div>
        )} />
        <Route exact path="/">
          {this.state.redirect ? <Redirect to="/login" /> : null}
          {this.state.redirectAfterLogin ? <Redirect to="/home" /> : null}
        </Route>

      </Router>
    );
  }
}

export default App;
